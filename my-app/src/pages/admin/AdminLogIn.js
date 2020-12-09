import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import history from '../../history';
import logo from '../../images/H20_Logo1.JPG';



export default class AdminLogInPage extends Component {

  state = {
    validated: false,
    auth: {}
  }

  createNotification = (type) => {

    console.log('createNotification');
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Buchung erfolgreich gelöscht!', 'Vorgang abgeschlossen');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Fehler bei der Anmeldung', 'Erneut versuchen!', 5000);
        break;
    }
  }

  loginUser = async (data) => {
    console.log("start login");

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
      if (form.checkValidity() === false) {

        event.preventDefault();
        event.stopPropagation();

      } else {

        event.preventDefault();
        event.stopPropagation();

        const data = {
          username: document.getElementById("formGroupId").value,
          password: document.getElementById("formGroupPassword").value
        }

        this.loginUser(data);
      }

      this.setState({ validated: true });

    }

    return (

      <div className="AdminLogin">
        Bitte melden Sie sich mit Ihren Anmeldedaten an.
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





