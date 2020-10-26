import React, { useState,useEffect, Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from 'react-bootstrap/Button';
import history from './../history';

export default class FindSlortPage extends Component{
    state = {
        date: new Date(),
        booking: new Date()
      }
     
      onChange = (date) => {
          this.setState({ date });
          console.log("state", date);
          console.log("state date",this.state.date);
          console.log("state boooking",this.state.booking);
          //fetch Available slots for day
          this.fetchBookings();
          this.fetchTimeslots();

      }
      fetchBookings = async () => {
          console.log("start fetch data");
        const result = await fetch (`/bookings`);
        const body = await result.json();
        console.log(result);
        console.log(body);
    }
    fetchTimeslots = async () => {
        console.log("start fetch data");
      const result = await fetch (`/bookings`); //timeslots is not existant jet
      const body = await result.json();
      console.log(result);
      console.log(body);
    }

    onClickNext = () =>{
        //test if booking has capacity
        console.log(this)
        history.push({ pathname:'/dataForm', data: this.state.booking});
        
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