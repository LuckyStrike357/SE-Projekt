import React, { useState, useEffect, Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import history from './../history';

export default class DataFormPage extends Component {
    state = {
        bookingCode: new String(),
    }

    onClickNext = () => {
        //test if booking has capacity
        console.log(this)
        history.push({ pathname: '/bookingCode', data: this.state.bookingCode });

    }
    render() {
        return (
            <React.Fragment>
                <h1>DataFormPage Page!{console.log(this.props.location.data)}</h1>
                <div className="FormPersonalInformation">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </div>
                <Button variant="primary" onClick={() => this.onClickNext()}>Next</Button>
            </React.Fragment>
        );
    }
}

