import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import history from './../history';
import { Form, Col, } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';

/*
* This page is for entering user data. Here the booking takes place
* get: selected Timeslot ID from FindSlotPage,
* send: Booking Id and Date/Time to BookingCodePage,
*/

export default class DataFormPage extends Component {
    /* Component for rendering page */

    state = {
        bookingCode: "",
        dataPrivacyChecked: false,
        validated: false,
        timeslot: {},
        visitor: {},
        booking: {},
        timeslotID: undefined,
    }

    componentDidMount() {
        //fetch timeslot data for given id

        //read id from FindSlotPage and trigger fetch
        this.setState({ timeslotID: history.location.state.timeslot_id });
        this.fetchTimeslotData(history.location.state.timeslot_id);
    }

    createVisitor = async (data) => {
        //DB communication to create visitor
        var url = `/visitors`;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (result.ok) {
            const body = await result.json();
            this.setState({ visitor: body });
            return true;
        } else {
            return false;
        }
    }

    fetchTimeslotBookings = async (id) => {
        //check free capacity 
        var url = `/timeslots/?id=` + id + `&count=true`;
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            if (this.state.timeslot.capacity - body.count <= 0) {
                //full
                return false;
            } else {
                //still capacity available
                return true;
            }
        } else {
            return false;
        }
    }

    fetchTimeslotData = async (id) => {
        //fetch data for given timeslotID

        if (id) {
            var url = `/timeslots/?id=` + id;
            const result = await fetch(url);
            if (result.ok) {
                const body = await result.json();
                this.setState({ timeslot: body });
            } else {
                this.setState({ timeslot: {} });
            }
        }
    }

    createBooking = async () => {
        //create booking 
        var url = `/bookings`;

        var data = {
            visitorId: this.state.visitor.id,
            timeslotId: this.state.timeslot.id,
        }


        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            const body = await result.json();
            this.setState({ booking: body });
            return true;
        } else {
            return false;
        }
    }

    bookSlot = async (data) => {

        //1. Check Capacity
        var capacity = await this.fetchTimeslotBookings(this.state.timeslot.id);

        if (capacity) {
            //2. Create Visitor
            var successfullVisitor = await this.createVisitor(data);
            if (!successfullVisitor) {
                this.createNotification('error');
            } else {
                //3. Create Booking
                var successfulBooking = await this.createBooking();
                //4. Route to next Page
                if (successfulBooking)
                    history.push({ pathname: '/bookingCode', state: { booking_id: this.state.booking.id, booking_startDate: this.state.timeslot.start, booking_endDate: this.state.timeslot.end } });
            }
        } else {
            //no capacity available
            this.createNotification('capacity');
        }
    }

    createNotification = (type) => {
        //define notfications
        switch (type) {
            case 'success':
                NotificationManager.success('Buchung erfolgreich!', 'Vorgang abgeschlossen');
                break;
            case 'error':
                NotificationManager.error('Fehler bei der Buchung', 'Erneut versuchen!', 5000);
                break;
            case 'capacity':
                NotificationManager.error('Fehler bei der Buchung', 'Keine freie Kapazität wählen sie einen anderen Slot!', 5000);
                break;
            default:
            // do nothing
        }
    }

    //HTML Part 
    render() {

        const handleSubmit = (event) => {
            const form = event.currentTarget;

            //submit event needs to be stoped because submit is handled manually
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity() === true) {
                //if all fields are filled get data
                const data = {
                    email: document.getElementById("Email").value,
                    first_name: document.getElementById("Vorname").value,
                    last_name: document.getElementById("Nachname").value,
                    street: document.getElementById("Strasse").value,
                    number: document.getElementById("Hausnummer").value,
                    city: document.getElementById("Ort").value,
                    postal_code: document.getElementById("PLZ").value,
                    telephone: document.getElementById("Telefon").value + document.getElementById("Telefonnummer").value,
                }

                //book slot
                this.bookSlot(data);
            }
            this.setState({ validated: true });

        }

        //HTML Part 
        return (
            <div className="background">
                <div className="Header_DataForm">
                    Bitte helfen Sie mit, und geben Sie ihre Kontaktdaten an.
                    </div>

                <div className="textboxes">

                    <Form id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Vorname">
                                <Form.Control required type="Vorname" placeholder="Vorname" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Nachname">
                                <Form.Control required type="Nachname" placeholder="Nachname" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} xs={8} controlId="Strasse" >
                                <Form.Control required type="Strasse" placeholder="Straße" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Hausnummer">
                                <Form.Control required type="text" placeholder="Hausnummer" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="PLZ">
                            <Form.Control required type="number" placeholder="PLZ" min="5" />
                        </Form.Group>

                        <Form.Group controlId="Ort">
                            <Form.Control required type="Ort" placeholder="Ort" />
                        </Form.Group>

                        <Form.Group controlId="Email">
                            <Form.Control required type="email" placeholder="E-mail" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="Telefon">
                                <Form.Control required as="select" custom>
                                    <option>+49</option>
                                    <option>+43</option>
                                    <option>+41</option>
                                    <option>+31</option>
                                    <option>+32</option>
                                    <option>+39</option>
                                    <option>+1</option>
                                    <option>+44</option>
                                    <option>+48</option>
                                    <option>+420</option>
                                    <option>+45</option>
                                    <option>+46</option>
                                    <option>+47</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group xs={9} as={Col}>
                                <Form.Control required id="Telefonnummer" type="Telefonnummer" placeholder="Telefonnummer" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="BasicCheckbox" id="Checkbox">
                            <Form.Check required type="checkbox" label="Hiermit willige ich in die Datenverarbeitung ein" id="chkddl" />
                        </Form.Group>
                        <Button type="submit" size="lg" >Buchen</Button>
                    </Form>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}


