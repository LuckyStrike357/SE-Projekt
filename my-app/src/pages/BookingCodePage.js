import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Button from 'react-bootstrap/Button';
import history from './../history';

/*
* This page is displaying the booking code in form of a qr code
* get: booking id and date/time from DataFormPage,
* send: nothing,
*/

export default class BookingCodePage extends Component {

    componentDidMount(){
       //get data from previous page
        var startDate = new Date(history.location.state.booking_startDate).toLocaleString("de-DE");
        var endDate = new Date(history.location.state.booking_endDate).toLocaleString("de-DE");
       
        this.setState({
            bookingCode:history.location.state.booking_id,
            bookingStartDate:startDate,
            bookingEndDate:endDate,
        });
        console.log("booking id", history.location.state.booking_id);
      
    }
    

    state = {
        bookingCode: 0,
        bookingDate: new Date(),
    }

    //HTML Part
    render() {
        return (
            <React.Fragment>
                
                <h1 className="BookingCodePage">Ihr Buchung war erfolgreich!</h1>
                <h2>Hier ist ihr QRCode!</h2>
                <h4>{this.state.bookingStartDate}</h4>
                <h4>- {this.state.bookingEndDate}</h4>
                <div className="QRCode">

                    <QRCode
                        value={"http://ec2-54-93-73-128.eu-central-1.compute.amazonaws.com:3000/bookings/id="+this.state.bookingCode.toString()}
                        size={128}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        imageSettings={{
                            src: "https://static.zpao.com/favicon.png",
                            x: null,
                            y: null,
                            height: 24,
                            width: 24,
                            excavate: true,
                        }}
                    />
                    <p>{this.state.bookingCode}</p>
                </div>
                <div className="commandButtons">
                <Button variant="primary" onClick={() => window.print()}>Drucken</Button>
                <Button variant="primary" size="sm" onClick={() => history.push({ pathname: '/' })}>Home</Button>
                </div>
               
            </React.Fragment >
        );
    }
}