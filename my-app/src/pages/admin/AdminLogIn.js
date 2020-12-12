import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import history from '../../history';
import logo from '../../images/H20_Logo1.JPG';

/* This is the Login page for the administration users
* get: nothing,
* send: security token to AdminNavigation
*/

export default class AdminLogInPage extends Component {
  /*Component for rendering page*/

  state = {
    validated: false,
    auth: {}
  }

  createNotification = (type) => {
    //define notifications

    console.log('createNotification');
    switch (type) {
      case 'success':
        NotificationManager.success('Buchung erfolgreich gelöscht!', 'Vorgang abgeschlossen');
        break;
      case 'error':
        NotificationManager.error('Fehler bei der Anmeldung', 'Erneut versuchen!', 5000);
        break;
      default:
      // do nothing
    }
  }

  loginUser = async (data) => {
    //db connection for login

    var url = `/api/auth/login`;

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (result.ok) {
      //Success
      const body = await result.json();
      this.setState({ auth: body })
      history.push({ pathname: '/admin/start', state: { token: this.state.auth.token } });

    } else {
      //Error
      const body = await result.json();
      this.setState({ auth: body });
      this.createNotification('error');

      //Clear form
      const form = document.getElementById('dataForm');
      form.reset();
      this.setState({ validated: false });
    }

  }


  render() {

    const handleSubmit = (event) => {

      const form = event.currentTarget;
      //prevent propagation of event because it is handled manually
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {

        const data = {
          username: document.getElementById("formGroupId").value,
          password: document.getElementById("formGroupPassword").value
        }

        this.loginUser(data);
      }

      this.setState({ validated: true });

    }

    //HTML Part
    return (
      <div className="AdminLogin">
        <img src={logo} className="adminLoginLogo" alt="adminLoginLogo" />
        <div className="AdminLoginHeader">
          Bitte melden Sie sich mit Ihren Anmeldedaten an.
        </div>
        <div>
          <Form id="dataForm" className="Admindaten" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupId">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control required type="id" placeholder="ID eingeben" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control required type="password" placeholder="Passwort" />
            </Form.Group>
            <Button variant="primary" type="submit">Anmelden</Button>
          </Form>
        </div>
        <NotificationContainer />
      </div>


    );
  }

};





