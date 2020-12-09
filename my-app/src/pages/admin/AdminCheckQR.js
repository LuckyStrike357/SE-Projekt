import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import { Form, Col, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const AdminCheckQR = () => (
    <React.Fragment>
        <AdminNavigation></AdminNavigation>
        <h1>Admin Check QR Code Page!</h1>
    </React.Fragment>
)

export default class AdminCheckQRClass extends Component {

    render() {
        return (
            <div className="CheckQR">
                <div className="Header_QRCheck">
                    QR Code Prüfung
                </div>
                <h>Bitte geben Sie in das Feld die Kennziffer ein, um den QR-Code auf Gültigkeit zu prüfen.</h>
                <Form>
                    <Form.Group controlId="formGroupPassword" className="QRCheckPassword">
                        <Form.Label>QR Code:</Form.Label>
                        <Form.Control type="password" placeholder="Code" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Check
                    </Button>
                </Form>
            </div>

        );
    }
};