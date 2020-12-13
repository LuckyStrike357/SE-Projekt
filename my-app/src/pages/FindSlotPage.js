import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import history from './../history';
import { NotificationContainer, NotificationManager } from 'react-notifications';

var errorTimeslot = "An diesem Tag stehen keine Zeiträume zur Buchung zur Verfügung";
/*
* This is a page for selecting the timeslot for the enduser 
* get: nothing from StartPage,
* send: selected Timeslot ID to DataFormPage,
*/

class RenderTable extends Component {
    /* Component for Table on this page */

    onClickTableRow = (event) => {
        //Called on Click of the booking button on each table row (timeslot)
        const timeslotID = event.target.id;
        //route to next page and send timeslotID
        history.push({ pathname: '/dataForm', state: { timeslot_id: timeslotID } });
    }

    render() {
        //render TableData
        if (this.props.timeslots.length) {
            return this.props.timeslots.map((timeslot) => {
                const { id, start, end, free } = timeslot //destructuring

                //convert dates
                var startDate = new Date(start);
                var startTime = startDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                var endDate = new Date(end);
                var endTime = endDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

                return (
                    <tr key={id}>
                        <td>{startTime}</td>
                        <td>{endTime}</td>
                        <td>{free}</td>
                        <td><Button id={id} onClick={(Event) => this.onClickTableRow(Event)}>Buchen</Button></td>
                    </tr>
                )
            })
        } else { //show if no data is available

            return (
                <tr >
                    <td colSpan="5">{errorTimeslot}</td>
                </tr>
            )
        }


    }
}

export default class FindSlotPage extends Component {
    /* Component for rendering page */

    state = {
        date: new Date(),
        timeslots: [],
    }

    componentDidMount() {
        //fetch timeslot data for today
        const today = new Date();
        this.fetchTimeslotsPerDay(today);
    }

    createNotification = (type) => {
        //define notification

        switch (type) {
            case 'error':
                NotificationManager.error('Fehler!', 'Fehler beim Vorgang!', 5000);
                break;
            default:
            // do nothing
        }
    }

    onChange = (date) => {
        //fetch timeslot data for selected date
        this.setState({ date });
        this.fetchTimeslotsPerDay(date);
    }

    fetchTimeslotsPerDay = async (date) => {

        //convert dates
        var startDate = new Date(date);
        var endDate = new Date(date);
        endDate.setDate(date.getDate() + 1);
        var startYear = startDate.getFullYear();
        var endYear = endDate.getFullYear();
        var startMonth = startDate.getMonth() + 1;
        var endMonth = endDate.getMonth() + 1;
        var startDay = startDate.getDate();
        var endDay = endDate.getDate();
        const start = "" + startYear + "-" + startMonth + "-" + startDay;
        const end = "" + endYear + "-" + endMonth + "-" + endDay;

        //create url
        var url = `/timeslots/?start=` + start + `&end=` + end;

        //fetch and result
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            //loop over all timeslots and check capacity
            this.fetchTimeslotBookings(body);

        } else {
            this.setState({ timeslots: [] });
        }
    }

    fetchTimeslotBookings = async (timeslotsdata) => {
        var checkedTimeslots = [];

        //loop over each timeslot and preprocess
        //don't use array.prototype.forEach() functions with async and await!
        for (const timeslot of timeslotsdata) {

            var url = `/timeslots/?id=` + timeslot.id + `&count=true`;
            const result = await fetch(url);

            if (result.ok) {
                const body = await result.json();

                //calc free bookings
                timeslot.free = timeslot.capacity - body.count;

                //check if timeslot is in future or past
                var startDate = new Date(timeslot.start);
                var todayDate = new Date();
                if (startDate > todayDate && timeslot.free > 0) {
                    //add to final array
                    checkedTimeslots.push(timeslot);
                }

            } else {
                this.createNotification('error')
            }
        }
        this.setState({ timeslots: checkedTimeslots });
    }

    //HTMl Part of Page
    render() {
        return (
            <React.Fragment>
                <h1 className="Header">Wählen Sie einen Zeitraum!</h1>
                <div className="wrapFind">
                    <div className="findDay">
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date}
                            minDate={new Date()} />
                    </div>
                    <div className="findTime">
                        <h1>Finden Sie einen Zeitraum am {this.state.date.toLocaleDateString('de-DE')}</h1>
                        <Table responsive hover variant="dark" id="timeslotTable">
                            <thead>
                                <tr>
                                    <th>Start</th>
                                    <th>Ende</th>
                                    <th>Freie Plätze</th>
                                    <th>Buchen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <RenderTable timeslots={this.state.timeslots}></RenderTable>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <NotificationContainer />
            </React.Fragment>
        );
    }
}

