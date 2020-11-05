import React, { useState,useEffect, Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import history from './../history';

export default class FindSlortPage extends Component{
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
          this.fetchBookings();
          this.fetchTimeslots();

      }
      fetchBookings = async () => {
          console.log("start fetch data");
        const result = await fetch (`/bookings`);
        const body = await result.json();
        this.setState({bookings: body});
        console.log(result);
        console.log(body);
    }
    fetchTimeslots = async () => {
        console.log("start fetch data");
      const result = await fetch (`/timeslots`); //timeslots is not existant jet
      const body = await result.json();
      this.setState({timeslots: body});
      console.log(result);
      console.log(body);
    }

    onClickNext = () =>{
        //test if booking has capacity
        console.log(this)
        history.push({ pathname:'/dataForm', data: this.state.booking});
        
    }

    renderTableData=() =>{
        return this.state.timeslots.map((timeslot, index) => {
           const { id, start, end, capacity, bookings } = timeslot //destructuring
           console.log(timeslot)
           if (bookings != undefined){
           console.log(bookings);
           const free = 10;//capacity - bookings.length;
           return (
              <tr key={id}>
                 <td>{start}</td>
                 <td>{end}</td>
                 <td>{capacity}</td>
                 <td>{free}</td>
              </tr>
           )
           }else{

           }
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
            <Table striped bordered hover>
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