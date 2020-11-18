import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import history from './../history';

const CanclePage = () => (
    <React.Fragment>
        <h1>Cancle Page!</h1>
    </React.Fragment>
)

export default class CanclePageClass extends Component {


    render() {
        return (
            <div className="CanclePage">
                <h1 className="DeleteHeader">Buchung stornieren</h1>

                    <p id="Infotext">
                    Bitte geben Sie ihren Buchungsdaten ein, um ihre Buchung zu stornieren. <br />
                    Wir löschen nur die den Buchungscode betreffende Reservierung.
                    </p>

                    <Form className="CancleBookingCode">
                        <Form.Group controlId="formBasicPassword" className="CancleGroup">
                            <Form.Control type="password" placeholder="Buchungscode" />
                            <Form.Text className="Cancle-text-muted">
                                Buchungscode vergessen?
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="CancleGroup">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="CancleGroup">
                            <Form.Control type="gebdatum" placeholder="Geburtsdatum" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Buchung stornieren
                    </Button>
                    </Form>

            </div>


        );
    }
}