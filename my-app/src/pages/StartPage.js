import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Form, FormRow, Col, FormLabel, FormGrid, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import history from './../history';
import logo from './../images/logo.svg';
import swimmer from './../images/swimmer.jpg';
import bin from './../images/bin.png';


const StartPage = () => (

  <div class="CardDeckComponent">
    <Form.Row>
      <Form.Group as={Col} controlId="lögö" id="lögö">
        <img src="./../H20_Logo3.jpg" id= "logo" width="100" height="80"/>
      </Form.Group>
      <Form.Group as={Col} controlId="streks" id="streks">
        <h1 id="StartHeader">Willkommen!</h1>
    </Form.Group>
    </Form.Row>
    <div class="SubHeader">
      Bitte wählen Sie eine Option, mit der Sie fortfahren möchten
    </div>
    <hr class="solid"></hr>

      <CardDeck>
        <Card>
          <Card.Img variant="top" src={swimmer} />
          <Card.Body>
            <Card.Title>Neue Buchung</Card.Title>
            <Card.Text>

              Wenn Sie eine neue Buchung für das Schwimmbad tätigen möchten, klicken Sie auf den unten stehenden Button. 
              
            </Card.Text>

            <Button variant="primary" onClick={() => history.push('/findSlot')}>Jetzt Platz buchen!</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={bin} />
          <Card.Body>
            <Card.Title>Bestehende Buchung löschen</Card.Title>
            <Card.Text>
              Sie haben ihre Pläne verworfen und möchten eine bereits getätigte Buchung löschen? Dann folgen Sie diesem Button.
        </Card.Text>
            <Button variant="primary" onClick={() => history.push('/cancle')}>Buchung löschen</Button>
          </Card.Body>
        </Card>
      </CardDeck>

    <hr2 id="impressum">
      Impressum: <br/>
       Tel: +49931/652781 <br/>
       E-Mail: bade.meister@swimmingmail.com <br/>
       Adresse: Wasserstraße 12

    </hr2>

  </div>
)

export default StartPage;