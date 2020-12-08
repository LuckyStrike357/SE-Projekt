import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import history from './../../history';
import { Form, Col, } from 'react-bootstrap';

const AdminLogIn = () => (

    <React.Fragment>
        <h1>Admin LogIn!</h1>
        <Button variant="primary" onClick={() => history.push({ pathname: '/admin/start' })}>Next</Button>
    </React.Fragment>

)

export default class AdminLogInPage extends Component {

    render() {
        return (
            <Form>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>PW:</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
        );
    }

};



