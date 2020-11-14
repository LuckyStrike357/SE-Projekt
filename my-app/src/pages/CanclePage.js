import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                <div className="DeleteSubHeader">Bitte geben Sie ihren Buchungscode ein, den Sie bei der Buchung erhalten haben um ihre Buchungen einsehen zu können.</div>

                <Form className= "CancleBookingCode">
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Buchungscode" />
                        <Form.Text className="Cancle-text-muted">
                            Buchungscode vergessen?
                    </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Weiter
                    </Button>
                </Form>

            </div>


        );
    }
}