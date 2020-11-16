import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import history from './../history';
import { Form, Col, } from "react-bootstrap";

export default class DataFormPage extends Component {

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
        var timeslotID;
        console.log("history.location.state.timeslot_id;", history.location.state.timeslot_id)
        
        this.setState({ timeslotID: history.location.state.timeslot_id });
        this.fetchTimeslotData(history.location.state.timeslot_id);
    }

    createVisitor = async (data) => {
        var url = `/visitors`;
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (result.ok) {
            const body = await result.json();
            console.log("Successfully created visitor: ", body);
            this.setState({ visitor: body });
            return true;
        } else {
            console.log("Error during createVisitor: ", result.status);
            return false;
        }
    }

    fetchTimeslotBookings = async (id) => {
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
            console.log("Error during fetchTimeslotBookings: ", result.status);
            return false;
        }
    }

    fetchTimeslotData = async (id) => {

        console.log("start fetch timeslot data");
        if (id) {
            var url = `/timeslots/?id=` + id;
            const result = await fetch(url);
            if (result.ok) {
                const body = await result.json();
                this.setState({ timeslot: body });
                console.log("Succesfully fetched timeslot: ", body);
            } else {
                this.setState({ timeslot: {} });
                console.log("Error during fetchTimeslotsPerDay: ", result.status);
            }
        }
    }

    createBooking = async () => {
        console.log("start create booking");
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
            console.log("Succesffully created booking: ", body);
            this.setState({ booking: body });
            return true;
        } else {
            console.log("Error during createBooking: ", result.status);
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
                alert("Please send form again");
            } else {
                //3. Create Booking
                var successfulBooking = await this.createBooking();
                //4. Route to next Page
                if (successfulBooking)
                    history.push({ pathname: '/bookingCode',  state : {booking_id: this.state.booking.id} });
            }
        } else {
            //no capacity available
            alert("No capacity available");
        }
    }

    render() {

        const handleSubmit = (event) => {
            console.log("handleSubmit");
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                
                event.preventDefault();
                event.stopPropagation();
            } else {
               
                event.preventDefault();
                event.stopPropagation();
                const data = {
                    email: document.getElementById("Email").value,
                    first_name: document.getElementById("Vorname").value,
                    last_name: document.getElementById("Nachname").value,
                    street: document.getElementById("Strasse").value,
                    number: document.getElementById("Hausnummer").value,
                    place: document.getElementById("Ort").value,
                    postal_code: document.getElementById("PLZ").value,
                    telephone: document.getElementById("Telefon").value + document.getElementById("Telefonnummer").value,
                }
                console.log("Vistor data: ",data)
                this.bookSlot(data);
            }
            this.setState({ validated: true });

        }

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
            </div>
        );
    }
}


