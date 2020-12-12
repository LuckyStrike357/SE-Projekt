import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Col, } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

/*
* This page is for canceling a booking. Knowledge is used for authentification
*/

export default class CanclePageClass extends Component {
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
        console.log("start delete booking");

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

                let day = document.getElementById("Tag").value;
                let month = document.getElementById("Monat").value
                let year = document.getElementById("Jahr").value

                const data = {
                    bookingId: document.getElementById("Buchungscode").value,
                    email: document.getElementById("Email").value,
                    bookingDate: year + "-" + month + "-" + day
                }

                console.log("Booking data: ", data)

                //delete booking
                this.deleteBooking(data);
            }

            this.setState({ validated: true });

        }

        //HTML Part
        return (
            <div className="CanclePage">
                <h1 className="DeleteHeader">Buchung stornieren</h1>

                <p id="Infotext">
                    Bitte geben Sie ihren Buchungsdaten ein, um ihre Buchung zu stornieren. <br />
                    Wir löschen nur die den Buchungscode betreffende Reservierung.
                </p>

                <div className="CancleBookingCode">
                    <Form className="CancleBookingForm" id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="Buchungscode" className="CancleGroup">
                            <Form.Control required type="text" placeholder="Buchungscode" />
                        </Form.Group>

                        <Form.Group controlId="Email" className="CancleGroup">
                            <Form.Control required type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} xs={3} controlId="Tag">
                                <Form.Control required as="select" custom>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} xs={3} controlId="Monat">
                                <Form.Control required as="select" custom>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control required id="Jahr" type="text" placeholder="Jahr" />
                            </Form.Group>
                        </Form.Row>

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