import React, { useState,useEffect, Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import history from './../history';

export default class FindSlortPage extends Component{
    constructor (props){
        super(props);
        //fetch data for today
        const today = new Date();
        //this.fetchBookings();
        this.fetchTimeslotsPerDay(today);

    }
    state = {
        date: new Date(),
        booking: new Date(),
        timeslots: new Array(),
        bookings: new Array(),
      }
     
      onChange = (date) => {
          this.setState({ date });
          console.log("state", date);
          console.log("state date",this.state.date);
          console.log("state boooking",this.state.bookings);
          //fetch Available slots for day
          //this.fetchBookings();
          this.fetchTimeslots();
      }
      fetchBookings = async () => {
          console.log("start fetch booking data");
        const result = await fetch (`/bookings`);
        const body = await result.json();
        this.setState({bookings: body});
        console.log("bookings",body);
    }
    fetchTimeslots = async () => {
        console.log("start fetch timeslot data");
      const result = await fetch (`/timeslots`); //timeslots is not existant jet
      const body = await result.json();
      this.setState({ timeslots: body });
      console.log("state",this.state.timeslots)
      //$filter=StartDate ge datetime'2014-01-01T00%3a00%3a00'
    }

    fetchTimeslotsPerDay = async (date) => {
        console.log("start fetch timeslot data per day");
      const result = await fetch (`/timeslots$filter=start ge datetime'2020-11-06'`); //timeslots is not existant jet
      const body = await result.json();
      this.setState({ timeslots: body });
      console.log("state",this.state.timeslots)
      //$filter=StartDate ge datetime'2014-01-01T00%3a00%3a00'
    }

    onClickNext = () =>{
        //test if booking has capacity
        console.log(this)
        history.push({ pathname:'/dataForm', data: this.state.booking});
        
    }

    renderTableData=() =>{
        console.log("renderTableData");
        return this.state.timeslots.map((timeslot, index) => {
           const { id, start, end, capacity, booking } = timeslot //destructuring

           console.log(booking);
           const free = capacity;// - booking.length;
           return (
              <tr key={id}>
                 <td>{start}</td>
                 <td>{end}</td>
                 <td>{capacity}</td>
                 <td>{free}</td>
              </tr>
           )
        })
     }
     
      render() {
        return (
            <React.Fragment>
            <h1>Find Slot Page!</h1>
            <div className="wrapFind">
            <div className="findDay">
                <Calendar  
                    onChange={this.onChange}
                    value={this.state.date}/>
            </div>
            <div className="findTime">
            <h1>Find Slot on {this.state.date.toLocaleDateString()}</h1>
            <Table responsive>
                <thead>
                    <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Capacity</th>
                    <th>Bookings</th>
                    </tr>
                </thead>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </Table>
            </div>
            <Button variant="primary" onClick={()=>this.onClickNext()}>Next</Button>
            </div>
            </React.Fragment>
        );
      }
}

/*const FindSlotPage = () => {
    this.state = {
        date: new Date(),
      }
    
    this.onChange = date => this.setState({ date })
    return(<React.Fragment>
        <h1>Find Slot Page!</h1>
        <div class="calendar">
            <Calendar  
                onChange={this.onChange}
                value={this.state.date}/>
        </div>
        </React.Fragment>)
    
    }*/
//export default FindSlotPage;