import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import history from './../../history';
import { Form, Col, } from "react-bootstrap";



export default class AdminLogInPage extends Component {
expo
    render() {
        return(

            <div className="AdminLogin">
                Bitte melden Sie sich mit Ihren Anmeldedaten an. 
            <div>
            <Form className="Admindaten">
            <Form.Group controlId="formGroupId">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control type="id" placeholder="ID eingeben" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Passwort</Form.Label>
              <Form.Control type="password" placeholder="Passwort" />
            </Form.Group>
            <Form.Group controlId="submit">
           
            <Button variant="primary" type="submit" className="adminLogin">
                            Anmelden
                    </Button>
            </Form.Group>
            </Form>
            </div>
          </div>

          
        );
    }
    
};
    
    
    
    
    
    