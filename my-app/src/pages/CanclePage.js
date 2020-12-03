import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Col, } from "react-bootstrap";
import history from './../history';

const CanclePage = () => (
    <React.Fragment>
        <h1>Cancle Page!</h1>
    </React.Fragment>
)

export default class CanclePageClass extends Component {


    render() {
        return (
            <div className="CanclePage">
                <h1 className="DeleteHeader">Buchung stornieren</h1>

                    <p id="Infotext">
                    Bitte geben Sie ihren Buchungsdaten ein, um ihre Buchung zu stornieren. <br />
                    Wir löschen nur die den Buchungscode betreffende Reservierung.
                    </p>

                    <Form className="CancleBookingCode">
                        <Form.Group controlId="formBasicPassword" className="CancleGroup">
                            <Form.Control type="password" placeholder="Buchungscode" />
                            <Form.Text className="Cancle-text-muted">
                                Buchungscode vergessen?
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="CancleGroup">
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} xs={3} controlId="Tag">
                                <Form.Control required as="select" custom>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                    <option>21</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                    <option>29</option>
                                    <option>30</option>
                                    <option>31</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} xs={3} controlId="Monat">
                                <Form.Control required as="select" custom>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control required id="Jahr" type="Jahr" placeholder="Jahr" />
                            </Form.Group>
                        </Form.Row>
                        
                        <Button variant="primary" type="submit">
                            Buchung stornieren
                    </Button>
                    </Form>

            </div>


        );
    }
}