import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import history from '../../history';


export default class AdminCheckQRClass extends Component {

    state = {
        token: '',
        bookingId: null,
        validated: false
    }

    componentDidMount() {

        const id = new URLSearchParams(this.props.location.search).get("id")

        if (id !== null) {
            this.setState({ bookingId: id })
            document.getElementById("formBookingId").value = id;
        }

        if (history.location.state) {
            this.setState({ token: history.location.state.token });
        }

    }

    createNotification = (type) => {

        switch (type) {
            case 'success':
                NotificationManager.success('Buchung gültig!', 'Validierung erfolgreich');
                break;
            case 'error':
                NotificationManager.error('Fehler!', 'Fehler beim Zugriff!', 5000);
                break;
            case 'warning':
                NotificationManager.warning('Buchung ungültig!', 'Fehler bei der Validierung!', 5000);
                break;
            default:
            // do nothing
        }
    }

    validateBooking = async (data) => {

        var url = `/bookings/` + data.bookingId;
        //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjIwOTQzLTNhOWMtNDNmYi1hZjEwLTE3OTk5OTFkM2JiMCIsImlhdCI6MTYwNzUyMDYwNiwiZXhwIjoxNjA3NjA3MDA2fQ.fzwSMl68LxiOcgyvs-zKZhF5of1HBpranLfkyvqopvY'
        var token = this.state.token;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            }
        });

        if (result.ok) {

            const booking = await result.json();

            if (booking.scanned) {
                // already scanned
                this.createNotification('warning');
            } else {

                await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ scanned: true })
                });

                this.createNotification('success')
            }

        } else if (result.status === 404) {
            // not found
            this.createNotification('warning')
        } else {
            // error occured
            this.createNotification('error')
        }

        //Clear form
        const form = document.getElementById('dataForm');
        form.reset();
        this.setState({ validated: false });
    }

    render() {

        const handleSubmit = (event) => {

            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity()) {

                const data = {
                    bookingId: document.getElementById("formBookingId").value
                }

                this.validateBooking(data);
            }

            this.setState({ validated: true });
        }

        return (
            <div className="CheckQR">
                <AdminNavigation></AdminNavigation>
                <div className="Header_QRCheck">
                    QR Code Prüfung
                </div>
                <h6>Bitte geben Sie in das Feld den Buchungscode ein, um den QR-Code auf Gültigkeit zu prüfen.</h6>
                <Form id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBookingId" className="QRCheckPassword">
                        <Form.Control required type="text" placeholder="Buchungscode" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Check
                    </Button>
                </Form>
                <NotificationContainer />
            </div>

        );
    }
};