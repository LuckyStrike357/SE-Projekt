import React from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

import history from './../history';
import logo from './../images/H20_Logo1.JPG';
import swimmer from './../images/swimmer.jpg';
import papers from './../images/papers.jpg';


const StartPage = () => (

  <div>
    
      <img src={logo} className= "logo" alt="Logo"/>
      <h1>Willkommen!</h1>
      <p>Bitte wählen Sie eine Option, mit der Sie fortfahren möchten</p>

      <CardDeck >
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
          <Card.Img variant="top" src={papers} />
          <Card.Body>
            <Card.Title>Bestehende Buchung löschen</Card.Title>
            <Card.Text>
              Sie haben ihre Pläne verworfen und möchten eine bereits getätigte Buchung löschen? Dann folgen Sie diesem Button.
            </Card.Text>
            <Button variant="primary" onClick={() => history.push('/cancle')}>Buchung löschen</Button>
          </Card.Body>
        </Card>
      </CardDeck>

    <p id="impressum">
      Impressum: <br/>
       Tel: +49931/652781 <br/>
       E-Mail: bade.meister@swimmingmail.com <br/>
       Adresse: Wasserstraße 12
    </p>
  </div>
)

export default StartPage;