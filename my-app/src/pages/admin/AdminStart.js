import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import history from '../../history';
import Button from 'react-bootstrap/Button';
import { Form, Col, } from 'react-bootstrap';

export default class AdminLogInPage extends Component {

    componentDidMount() {

        if (history.location.state !== undefined) {
            this.setState({ token: history.location.state.token });
        }

        console.log(this.state.token)
    }

    state = {
        token: 1
    }

    render() {
        return (
            <React.Fragment>
                <AdminNavigation></AdminNavigation>
                <h1>Datenexport</h1>

                <div className="AdminLoginTextboxes">
                    <h>Bitte geben Sie den Zeitraum an in diesem Sie den Datenexport vornehmen möchten.</h><br />

                    <div className="DatumVon">
                    <h>Von:</h>
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
                            <Form.Control required id="Jahr" type="text" placeholder="Jahr" />
                        </Form.Group>
                    </Form.Row>
                    </div>

                    <div className="DatumBis">
                    <h>Bis:</h>
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
                            <Form.Control required id="Jahr" type="text" placeholder="Jahr" />
                        </Form.Group>
                    </Form.Row>
                    </div>

                    <Button type="submit" size="lg" >Export</Button>
                </div>

            </React.Fragment>
        );
    }
}