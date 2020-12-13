import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DatePicker from './DatePicker';

/*
* This page is for canceling a booking. Knowledge is used for authentification
*/

export default class CancelPageClass extends Component {
    /* Component for rendering page*/

    state = {
        validated: false
    }

    createNotification = (type) => {
        //define notifications

        switch (type) {
            case 'success':
                NotificationManager.success('Buchung erfolgreich gelöscht!', 'Vorgang abgeschlossen');
                break;
            case 'error':
                NotificationManager.error('Fehler beim Löschen', 'Vorgang abgebrochen!', 5000);
                break;
            default:
            // do nothing
        }
    }

    deleteBooking = async (data) => {
        //delete booking db connection

        var body = {
            email: data.email,
            date: data.bookingDate
        }

        var url = `/bookings/` + data.bookingId;

        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(body),
        });

        if (result.ok) {
            //Success
            this.createNotification('success')
        } else {
            //Error
            this.createNotification('error')
        }

        //Clear form
        const form = document.getElementById('dataForm');
        form.reset();
        this.setState({ validated: false });
    }


    render() {

        const handleSubmit = (event) => {
            const form = event.currentTarget;

            //stop propagation of event because it is handled manually
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) { //check if all fields are filled

                const dataForm = document.getElementById("dataForm");

                let day = dataForm.children[2].children[0].children[0].value;
                let month = dataForm.children[2].children[1].children[0].value;
                let year = dataForm.children[2].children[2].children[0].value;

                const data = {
                    bookingId: document.getElementById("Buchungscode").value,
                    email: document.getElementById("Email").value,
                    bookingDate: year + "-" + month + "-" + day
                }

                //delete booking
                this.deleteBooking(data);
            }

            this.setState({ validated: true });

        }

        //HTML Part
        return (
            <div className="CancelPage">
                <h1 className="DeleteHeader">Buchung stornieren</h1>

                <p id="Infotext">
                    Bitte geben Sie ihren Buchungsdaten ein, um ihre Buchung zu stornieren. <br />
                    Wir löschen nur die den Buchungscode betreffende Reservierung.
                </p>

                <div className="CancelBookingCode">
                    <Form className="CancelBookingForm" id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="Buchungscode" className="CancelGroup">
                            <Form.Control required type="text" placeholder="Buchungscode" />
                        </Form.Group>

                        <Form.Group controlId="Email" className="CancelGroup">
                            <Form.Control required type="email" placeholder="Email" />
                        </Form.Group>

                        <p>Buchungsdatum:</p>
                        <DatePicker></DatePicker>

                        <Button variant="primary" type="submit">
                            Buchung stornieren
                        </Button>

                    </Form>

                </div>
                <NotificationContainer />
            </div>
        );
    }
}