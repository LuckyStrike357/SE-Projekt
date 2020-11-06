import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


import history from './../history';
import logo from './../images/logo.svg';
import swimmer from './../images/swimmer.jpg';
import paper from './../images/papers.jpg';


const StartPage = () => (

  <div class="CardDeckComponent">
    <div class="Header">
      Willkommen!
    </div>
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

              Some quick example text to build on the card title and make up the bulk of
              the card's content. Test.
            </Card.Text>

            <Button variant="primary" onClick={() => history.push('/findSlot')}>Find a Slot!</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={paper} />
          <Card.Body>
            <Card.Title>Bestehende Buchung löschen</Card.Title>
            <Card.Text>
              Sie haben ihre Pläne verworfen und möchten eine bereits getätigte Buchung löschen? Dann folgen Sie diesem Button.
        </Card.Text>
            <Button variant="primary" onClick={() => history.push('/cancle')}>Go To Cancle Booking</Button>
          </Card.Body>
        </Card>
      </CardDeck>

    <hr2>

       Tel: +49931/652781 <br/>
       E-Mail: bade.meister@swimmingmail.com <br/>
       Adresse: Wasserstraße 12

    </hr2>

  </div>
)

export default StartPage;