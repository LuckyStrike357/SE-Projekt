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

    componentDidMount() {
        //get data from previous page
        var startDate = new Date(history.location.state.booking_startDate).toLocaleString("de-DE");
        var endDate = new Date(history.location.state.booking_endDate).toLocaleString("de-DE");

        this.setState({
            bookingCode: history.location.state.booking_id,
            bookingStartDate: startDate,
            bookingEndDate: endDate,
        });

    }


    state = {
        bookingCode: 0,
        bookingDate: new Date(),
    }

    //HTML Part
    render() {
        return (
            <React.Fragment>

                <h1 className="BookingCodePage">Ihre Buchung war erfolgreich!</h1>
                <h2>Hier ist ihr QRCode!</h2>

                <div className="QRCode">
            
                    <QRCode
                        value={"ec2-3-127-149-47.eu-central-1.compute.amazonaws.com/admin/checkQR?id=" + this.state.bookingCode.toString()}
                    />

                </div>
                <h4>Buchungscode:</h4>
                <p>{this.state.bookingCode}</p>
                <h4>Zeitraum:</h4>
                <p>{this.state.bookingStartDate} - {this.state.bookingEndDate}</p>
                <div className="commandButtons">
                    <Button variant="primary" onClick={() => window.print()}>Drucken</Button>
                    <Button variant="primary" size="sm" onClick={() => history.push({ pathname: '/' })}>Home</Button>
                </div>

            </React.Fragment >
        );
    }
}