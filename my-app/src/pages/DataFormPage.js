import React, { useState, useEffect, Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import history from './../history';
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class DataFormPage extends Component {
    state = {
        bookingCode: new String(),
    }

    onClickNext = () => {
        //test if booking has capacity
        console.log(this)
        history.push({ pathname: '/bookingCode', data: this.state.bookingCode });

    }

    enabled (chkddl) {
        var ddl = document.getElementById("DDL"); // var initialisiert  Variable 
        ddl.disabled = chkddl.checked ? false : true;
        if(!ddl.disabled){
            ddl.focus(); 
        }
    }

    check () {
        if(!document.getElementById("Vorname").value) {
            alert("Bitte geben Sie einen Vornamen ein.");
            return false; 
        }
        return true; 

    }

    render() {
        return (
            <div class="background">
                <React.Fragment>
                    <h1>DataFormPage Page!{console.log(this.props.location.data)}</h1>
                    <Button variant="primary" onClick={() => this.onClickNext()}>Next</Button>

                    <div class="Header">
                        Bitte helfen Sie mit, und geben Sie ihre Kontaktdaten an.
                </div>
                    <div class="textboxes">
                        <Form>
                            <table>
                                <tr>
                                    <td width="400">
                                        <Form.Group controlId="Vorname">
                                            <Form.Control type="Vorname" placeholder="Vorname" />
                                        </Form.Group>
                                    </td>

                                    <td width="400">
                                        <Form.Group controlId="Nachname">
                                            <Form.Control type="Nachname" placeholder="Nachname" />
                                        </Form.Group>
                                    </td>
                                </tr>
                            </table>

                            <table>
                                <tr>
                                    <td width="650">
                                        <Form.Group controlId="Straße">
                                            <Form.Control type="Straße" placeholder="Straße" />
                                        </Form.Group>
                                    </td>

                                    <td width="150">
                                        <Form.Group controlId="Hausnummer">
                                            <Form.Control type="Hausnummer" placeholder="Hausnummer" />
                                        </Form.Group>
                                    </td>
                                </tr>
                            </table>

                            <div class="lastFourBoxes">
                                <Form.Group controlId="PLZ">
                                    <Form.Control type="PLZ" placeholder="PLZ" />
                                </Form.Group>

                                <Form.Group controlId="Ort">
                                    <Form.Control type="Ort" placeholder="Ort" />
                                </Form.Group>

                                <Form.Group controlId="Email">
                                    <Form.Control type="E-mail" placeholder="E-mail" />
                                </Form.Group>

                                <Form.Group controlId="Telefon">
                                    <Form.Control type="Telefonnummer" placeholder="Telefonnummer" />
                                </Form.Group>
                                
                                <Form.Group controlId="BasicCheckbox">
                                    <Form.Check type="checkbox" label="Hiermit willige ich in die Datenverarbeitung ein" id = "chkddl" onClick = "enabled(this)"/>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>

                </React.Fragment>

                <Button variant="success" size="lg" id="DDL" onClick={() => this.onClickNext()}>
                    Buchen
                </Button>

            </div>
        );
    }
}


