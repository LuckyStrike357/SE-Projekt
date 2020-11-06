import React, { useState, useEffect, Component } from 'react';

import Button from 'react-bootstrap/Button';
import history from './../history';
import { Form, FormRow, Col, FormLabel, FormGrid, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class DataFormPage extends Component {
    state = {
        bookingCode: new String(),
        dataPrivacyChecked: new Boolean(false),
    }

    onClickNext = () => {
         //validate form    (todo)
         if (!this.check()){
            return;
         }
         
         //test if capacity is available (todo)
         this.bookSlot();
       
         // Route to next page
        history.push({ pathname: '/bookingCode', data: this.state.bookingCode });

    }

    check () {
        if(!document.getElementById("Vorname").value) {
            alert("Bitte geben Sie einen Vornamen ein.");
            return false; 
        }

        var checkbox = document.getElementById("chkddl"); 
        if(!checkbox.checked){
            alert("Bitte willigen Sie der Datenverarbeitung ein.");
            return false;
        }

        return true; 

    }

    bookSlot() {
        //book slot with Form data
    }

    render() {
        return (
            <div className="background">
                    <div className="Header">
                        Bitte helfen Sie mit, und geben Sie ihre Kontaktdaten an.
                    </div>
                   
                    <div className="textboxes">

                        <Form>
                            <Form.Row>
                                <Form.Group  as={Col} controlId="Vorname">
                                        <Form.Control type="Vorname" placeholder="Vorname" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="Nachname">
                                        <Form.Control type="Nachname" placeholder="Nachname" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}  controlId="Straße">
                                    <Form.Control type="Straße" placeholder="Straße" />
                                </Form.Group>
                                <Form.Group  as={Col}  controlId="Hausnummer">
                                    <Form.Control type="Hausnummer" placeholder="Hausnummer" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="PLZ">
                                <Form.Control type="postal-code" placeholder="PLZ" />
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
                                <Form.Check type="checkbox" label="Hiermit willige ich in die Datenverarbeitung ein" id = "chkddl" />
                                <Form.Label visible="false" >sth</Form.Label>
                            </Form.Group>
                                                  
                        </Form>
                        </div>

                <Button type="submit" variant="success" size="lg" id="DDL" onClick={() => this.onClickNext()}>
                    Buchen
                </Button>

            </div>
        );
    }
}


