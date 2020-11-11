import React, { useState, useEffect, Component } from 'react';

import Button from 'react-bootstrap/Button';
import history from './../history';
import { Form, FormRow, Col, FormLabel, FormGrid, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class DataFormPage extends Component {
    state = {
        bookingCode: new String(),
        dataPrivacyChecked: new Boolean(false),
    }

    onClickNext = () => {
        //validate form    (todo)
        if (this.check() == 1) {
            document.getElementsByClassName('ErrorVorname')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorVorname')[0].style.display = 'none';
        if (this.check() == 2){
            document.getElementsByClassName('ErrorNachname')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorNachname')[0].style.display = 'none';
        if (this.check() == 3){
            document.getElementsByClassName('ErrorStraße')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorStraße')[0].style.display = 'none';
        if (this.check() == 4){
            document.getElementsByClassName('ErrorHausnummer')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorHausnummer')[0].style.display = 'none';
        if (this.check() == 5){
            document.getElementsByClassName('ErrorPLZ')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorPLZ')[0].style.display = 'none';
        if (this.check() == 6){
            document.getElementsByClassName('ErrorOrt')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorOrt')[0].style.display = 'none';
        if (this.check() == 7){
            document.getElementsByClassName('ErrorEmail')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorEmail')[0].style.display = 'none';
        if (this.check() == 8){
            document.getElementsByClassName('ErrorTelefon')[0].style.display = 'block';
            return false; 
        }

        document.getElementsByClassName('ErrorTelefon')[0].style.display = 'none';
        if (this.check() == 9){
            document.getElementsByClassName('ErrorCheckbox')[0].style.display = 'block';
            return false; 

        }
        document.getElementsByClassName('ErrorCheckbox')[0].style.display = 'none';
        if(this.check() == 10) {
            history.push({ pathname: '/bookingCode', data: this.state.bookingCode });
        }



        //test if capacity is available (todo)
        this.bookSlot();

        // Route to next page
        history.push({ pathname: '/bookingCode', data: this.state.bookingCode });

    }

    check() {


        if (!document.getElementById("Vorname").value || !isNaN(document.getElementById("Vorname").value)) {
            return 1;
        }

        if (!document.getElementById("Nachname").value || !isNaN(document.getElementById("Nachname").value)) {
            return 2;
        }

        if (!document.getElementById("Straße").value || !isNaN(document.getElementById("Straße").value)) {
            return 3;
        }

        if (!document.getElementById("Hausnummer").value || isNaN(document.getElementById("Hausnummer").value)) {
            return 4;
        }

        if (!document.getElementById("PLZ").value || isNaN(document.getElementById("PLZ").value)) {
            return 5;
        }

        if (!document.getElementById("Ort").value || !isNaN(document.getElementById("Ort").value)) {
            return 6;
        }

        if (!document.getElementById("Email").value || !isNaN(document.getElementById("Email").value)) {
            return 7;
        }

        if (!document.getElementById("Telefonnummer").value || isNaN(document.getElementById("Telefonnummer").value)) {
            return 8;
        }

        var checkbox = document.getElementById("chkddl");
        if (!checkbox.checked) { 
            return 9;
        }
        return 10;
    }

    bookSlot() {
        //book slot with Form data
    }

    render() {
        return (
            <div className="background">
                <div className="Header_DataForm">
                    Bitte helfen Sie mit, und geben Sie ihre Kontaktdaten an.
                    </div>

                <div className="textboxes">

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Vorname">
                                <Form.Control type="Vorname" placeholder="Vorname" />                       
                            </Form.Group>

                            <Form.Group as={Col} controlId="Nachname">
                                <Form.Control type="Nachname" placeholder="Nachname" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="Straße" width="650">
                                <Form.Control type="Straße" placeholder="Straße" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="Hausnummer">
                                <Form.Control type="Hausnummer" placeholder="Hausnummer" width="150" />
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

                        <Form.Row>
                            <Form.Group as={Col} controlId="Telefon">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Control as="select" custom>
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
                            </Form.Group>
                            <Form.Group>
                                <Form.Control id="Telefonnummer" type="Telefonnummer" placeholder="Telefonnummer" />
                            </Form.Group>
                        </Form.Row>
                    <div class = "Errors">
                        <div className = "ErrorVorname" style = {{display: "none"}}>Bitte geben Sie einen gültigen Vornamen ein.</div>
                        <div class = "ErrorNachname" style = {{display: "none"}}>Bitte geben Sie einen gültigen Nachnamen ein.</div>
                        <div class = "ErrorStraße" style = {{display: "none"}}>Bitte geben Sie eine Straße ein.</div>
                        <div class = "ErrorHausnummer" style = {{display: "none"}}>Bitte geben Sie eine gültige Hausnummer ein.</div>
                        <div class = "ErrorPLZ" style = {{display: "none"}}>Bitte geben Sie eine gültige Postleitzahl ein.</div>
                        <div class = "ErrorOrt" style = {{display: "none"}}>Bitte geben Sie einen gültigen Ort ein.</div>
                        <div class = "ErrorTelefon" style = {{display: "none"}}>Bitte geben Sie eine gültige Telefonnummer ein.</div>
                        <div class = "ErrorEmail" style = {{display: "none"}}>Bitte geben Sie eine gültige E-mail ein.</div>
                        <div class = "ErrorCheckbox" style = {{display: "none"}}>Bitte stimmen Sie der Datenverarbeitung zu.</div>
                    </div>

                        <Form.Group controlId="BasicCheckbox" id="Checkbox">
                            <Form.Check type="checkbox" label="Hiermit willige ich in die Datenverarbeitung ein" id="chkddl" />
                            <Form.Label visible="false" ></Form.Label>
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


