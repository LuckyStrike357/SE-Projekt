import React, { useState,useEffect, Component } from 'react';

import Button from 'react-bootstrap/Button';
import history from './../history';

export default class DataFormPage extends Component{
    state = {
        bookingCode: new String(),
      }

    onClickNext = () =>{
        //test if booking has capacity
        console.log(this)
        history.push({ pathname:'/bookingCode', data: this.state.bookingCode});
        
    }
    render() {
        return (
        <React.Fragment>
        <h1>DataFormPage Page!{console.log(this.props.location.data)}</h1>
        <Button variant="primary" onClick={()=>this.onClickNext()}>Next</Button>
        </React.Fragment>
        );
    }
}

