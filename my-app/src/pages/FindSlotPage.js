import React, { useState, useEffect, Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import history from './../history';

/*
* get: nothing from StartPage,
* send: selected Timeslot ID to DataFormPage,
*/

/*
* Functionality: 
* - select date
* - show Timeslots in Table
* - Go to next page and send selected TimeslotID to next page
* - format Time in Table
* To-Do: 
* - CSS/Style -> I hate CSS 
* - FetchTimeslots for given date -> wait for Dustin
* - Only Display Timeslot if there is still capacity available -> wait for Dustin
* - Display Error Text if everything is booked -> wait for Dustin 
* - check capcity -> wait for Dustin
* - Refactor Code (last to do)
*/

export default class FindSlortPage extends Component {
    constructor(props) {
        super(props);
        //fetch data for today
        const today = new Date();
        //this.fetchBookings();
        this.fetchTimeslots();
        //this.fetchTimeslotsPerDay(today);

    }
    state = {
        date: new Date(),
        timeslots: new Array(),
        bookings: new Array(),
    }

    onChange = (date) => {
        this.setState({ date });
        console.log("state", date);
        console.log("state date", this.state.date);
        //fetch Available slots for day
        //this.fetchBookings();
        this.fetchTimeslots();
    }
    /*not necessary
    fetchBookings = async () => {
        console.log("start fetch booking data");
      const result = await fetch (`/bookings`);
      const body = await result.json();
      this.setState({bookings: body});
      console.log("bookings",body);
}*/
    fetchTimeslots = async () => {
        console.log("start fetch timeslot data");
        const result = await fetch(`/timeslots`); //timeslots is not existant jet
        const body = await result.json();
        this.setState({ timeslots: body });
        console.log("state", this.state.timeslots)
        //$filter=StartDate ge datetime'2014-01-01T00%3a00%3a00'
    }

    fetchTimeslotsPerDay = async (date) => {
        console.log("start fetch timeslot data per day");
        const result = await fetch(`/timeslots$filter=start ge datetime'2020-11-06'`); //timeslots is not existant jet
        const body = await result.json();
        this.setState({ timeslots: body });
        console.log("state", this.state.timeslots)
        //$filter=StartDate ge datetime'2014-01-01T00%3a00%3a00'
    }

    onClickTableRow = (event) => {
        const timeslotID = event.target.id;
        console.log("Timeslot ID", timeslotID);
        history.push({ pathname: '/dataForm', data: timeslotID });
    }
    /*
    onClickNext = () => {
        //test if booking has capacity
        console.log(this)
        history.push({ pathname: '/dataForm', data: this.state.booking });

    }*/

    renderTableData = () => {
        console.log("renderTableData");
        return this.state.timeslots.map((timeslot, index) => {
            const { id, start, end, capacity, booking } = timeslot //destructuring
            var startDate = new Date(start);
            var startTime = startDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'});
            var endDate = new Date(end);
            var endTime = endDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'});
            //return only if booking is possible. 
            //else return "An diesem Tag ist alles ausgebucht" oder sowas in der Art 
            const free = capacity;// - booking.length;
            return (
                <tr key={id}>
                    <td>{startTime}</td>
                    <td>{endTime}</td>
                    <td>{capacity}</td>
                    <td>{free}</td>
                    <td><Button id={id} onClick={(Event) => this.onClickTableRow(Event)}>Buchen</Button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="Header">Wählen Sie einen Timeslot!</h1>
                <div className="wrapFind">
                    <div className="findDay">
                        <Calendar
                            onChange={this.onChange}
                            value={this.state.date} />
                    </div>
                    <div className="findTime">
                        <h1>Finden Sie einen Timeslot am {this.state.date.toLocaleDateString('de-DE')}</h1>
                        <Table responsive hover variant="dark" id="timeslotTable">
                            <thead>
                                <tr>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Capacity</th>
                                    <th>Bookings</th>
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

//<Button variant="primary" onClick={()=>this.onClickNext()}>Next</Button>
