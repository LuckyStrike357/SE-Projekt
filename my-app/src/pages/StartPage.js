import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

import history from './../history';
import logo from './../images/logo.svg';


const StartPage = () => (

    <CardDeck>
    <Card>
          <Card.Img variant="top" src={logo} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary" onClick={() => history.push('/findSlot')}>Find a Slot!</Button>
          </Card.Body>
        </Card>
        <Card>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary" onClick={() => history.push('/cancle')}>Go To Cancle Booking</Button>
        </Card.Body>
      </Card>
      </CardDeck>
)

export default StartPage;