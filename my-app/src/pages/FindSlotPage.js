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

export default class FindSlortPage extends Component {
    
    state = {
        date: new Date(),
        timeslots: [],
        free: 0,
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
        console.log(url)
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            this.setState({ timeslots: body });
        } else {
            this.setState({ timeslots: [] });
            console.log("Error during fetchTimeslotsPerDay: ", result.status);
        }
    }

    fetchTimeslotBookings = async (id, capacity) =>{
        var url = `/timeslotbookings/?id=`+id + `&count`;
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            this.setState({free: capacity - body.bookings})
        } else {
            console.log("Error during fetchTimeslotBookings: ", result.status);
        }
    }

    onClickTableRow = (event) => {
        const timeslotID = event.target.id;
        console.log("Timeslot ID", timeslotID);
        history.push({ pathname: '/dataForm', data: timeslotID });
    }

    renderTableData = () => {
        console.log("renderTableData");
        if(this.state.timeslots.length){
        return this.state.timeslots.map((timeslot, index) => {
            const { id, start, end, capacity } = timeslot //destructuring
            var startDate = new Date(start);
            var startTime = startDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            var endDate = new Date(end);
            var endTime = endDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

            //check capcity
            this.fetchTimeslotBookings(id, capacity);
          
            //need to find way to render conditionally to show free in table
            if(this.state.free <= 0){
                    return(
                        <tr>
                            <td colSpan="5">{errorTimeslot}</td>
                        </tr>
                    );
            }
           
            return (
                <tr key={id}>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td><Button id={id} onClick={(Event) => this.onClickTableRow(Event)}>Buchen</Button></td>
                </tr>
            )
        })
    }else{
        return (
            <tr >
                <td colSpan="5">{errorTimeslot}</td>
            </tr>
        )
    }

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
                                    <th>Buchen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

