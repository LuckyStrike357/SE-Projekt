import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import history from './../history';

var errorTimeslot = "An diesem Tag stehen keine Zeiträume zur Buchung zur Verfügung";
/*
* get: nothing from StartPage,
* send: selected Timeslot ID to DataFormPage,
*/

class RenderTable extends Component {

    onClickTableRow = (event) => {
        const timeslotID = event.target.id;
        console.log("Timeslot ID", timeslotID);
        history.push({ pathname: '/dataForm',state: {timeslot_id:timeslotID} });
    }

    render() {
        console.log("renderTableData");
        if (this.props.timeslots.length) {
            return this.props.timeslots.map((timeslot) => {
                const { id, start, end, free } = timeslot //destructuring
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
        } else {
            return (
                <tr >
                    <td colSpan="5">{errorTimeslot}</td>
                </tr>
            )
        }


    }
}

export default class FindSlotPage extends Component {

    state = {
        date: new Date(),
        timeslots: [],
    }

    componentDidMount() {
        //fetch timeslot data for today
        const today = new Date();
        this.fetchTimeslotsPerDay(today);
    }

    onChange = (date) => {
        this.setState({ date });
        //fetch timeslot data for selected date
        this.fetchTimeslotsPerDay(date);
    }

    fetchTimeslotsPerDay = async (date) => {
        var endDate = new Date();
        endDate.setDate(date.getDate() + 1);
        console.log("start fetch timeslot data per day");
        var url = `/timeslots/?start=` + date.toISOString().substring(0, 10) + `&end=` + endDate.toISOString().substring(0, 10);
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            //loop over all timeslots and check capacity
            this.fetchTimeslotBookings(body);

        } else {
            this.setState({ timeslots: [] });
            console.log("Error during fetchTimeslotsPerDay: ", result.status);
        }
    }

    fetchTimeslotBookings = async (timeslots) => {
        console.log("timeslots",timeslots)
        var checkedTimeslots = [];
        var that = this;
        await timeslots.forEach(await async function (timeslot, index) {
            var url = `/timeslots/?id=` + timeslot.id + `&count=true`;
            const result = await fetch(url);
            if (result.ok) {
                const body = await result.json();
                timeslot.free = timeslot.capacity - body.count;
                
                if (timeslot.free > 0) {
                    checkedTimeslots.push(timeslot);
                }
            } else {
                console.log("Error during fetchTimeslotBookings: ", result.status);
            }
            that.setState({ timeslots: checkedTimeslots });
            console.log("checkedTimeslots",checkedTimeslots);
        })
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
                            value={this.state.date} />
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
            </React.Fragment>
        );
    }
}

