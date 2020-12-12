import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import history from '../../history';
import Button from 'react-bootstrap/Button';
import { Form, Col, } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';



export default class AdminLogInPage extends Component {

    componentDidMount() {

        if (history.location.state !== undefined) {
            this.setState({ token: history.location.state.token });
        }

        console.log(this.state.token)
    }

    state = {
        token: '',
        validated: false,
    }

    createNotification = (type) => {

        switch (type) {
            case 'success':
                NotificationManager.success('Export gestartet!');
                break;
            case 'error':
                NotificationManager.error('Fehler!', 'Export Fehlgeschlagen!', 5000);
                break;
            case 'nodata':
                NotificationManager.error('Fehler!', 'Keine Daten zum exportieren vorhanden!', 5000);
                break;
            default:
            // do nothing
        }
    }

    format(data) {
        var formattedData = [];
        if (!data) {
            return formattedData;
        }
        for (const item of data) {
            var element = {};
            element.bookingId = item.bookingId;
            element.start = new Date(item.timeslot.start).toLocaleString("de-DE");
            element.end = new Date(item.timeslot.end).toLocaleString("de-DE");
            element.first_name = item.visitor.first_name;
            element.last_name = item.visitor.last_name;
            element.telephone = item.visitor.telephone;
            element.email = item.visitor.email;
            element.postal_code = item.visitor.postal_code;
            element.city = item.visitor.city;
            element.street = item.visitor.street;
            element.number = item.visitor.number;
            formattedData.push(element);
        }
        console.log("formattedData", formattedData);
        return formattedData;
    }

    async export(start, end) {
        console.log("start export");
        var exportData = await this.fetchExportData(start, end);
        var formattedData = await this.format(exportData);

        const { Parser } = require('json2csv');

        console.log(formattedData)

        if (formattedData.length > 0) {
            try {
                const parser = new Parser();//opts);
                const csv = parser.parse(formattedData);
                var uri = 'data:text/csv;charset=utf-8,' + csv;

                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = "data.csv";

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                this.createNotification('success');
            } catch (err) {
                console.error(err);
                this.createNotification('error');
            }
        }
    }

    async fetchExportData(start, end) {
        console.log("start fetch export data");
        var url = `/export?start=` + start + `&end=` + end;
        console.log(url)
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': this.state.token
            },
            //body: JSON.stringify({ scanned: true })
        });
        if (result.ok) {
            const body = await result.json();
            console.log(body)
            Promise.resolve(body);
            return body;

        } else {
            console.log("Error during fetchExportData", result.status);
            if (result.status === 500) {
                this.createNotification('nodata');
            } else {
                this.createNotification('error');
            }
            Promise.reject();
            return undefined;

        }

    }

    render() {

        const handleSubmit = (event) => {
            console.log("handleSubmit");
            const form = event.currentTarget;
            event.preventDefault();
            event.stopPropagation();
            if (form.checkValidity() === true) {
                const startDay = document.getElementById("TagVon").value;
                const startMonth = document.getElementById("MonatVon").value;
                const startYear = document.getElementById("JahrVon").value;
                const endDay = document.getElementById("TagBis").value;
                const endMonth = document.getElementById("MonatBis").value;
                const endYear = document.getElementById("JahrBis").value;
                const start = "" + startYear + "-" + startMonth + "-" + startDay;
                const end = "" + endYear + "-" + endMonth + "-" + endDay;
                console.log(start, end)
                this.export(start, end);
            }
            this.setState({ validated: true });
        }

        return (
            <React.Fragment>
                <AdminNavigation></AdminNavigation>
                <h1>Datenexport</h1>

                <div className="AdminLoginTextboxes">
                    <p>Bitte geben Sie den Zeitraum an in diesem Sie den Datenexport vornehmen möchten.</p><br />
                    <Form id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                        <div className="DatumVon">
                            <p>Von:</p>
                            <Form.Row>
                                <Form.Group as={Col} xs={3} controlId="TagVon">
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
                                <Form.Group as={Col} xs={3} controlId="MonatVon">
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
                                    <Form.Control required id="JahrVon" type="text" placeholder="Jahr" />
                                </Form.Group>
                            </Form.Row>
                        </div>

                        <div className="DatumBis">
                            <p>Bis:</p>
                            <Form.Row>
                                <Form.Group as={Col} xs={3} controlId="TagBis">
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
                                <Form.Group as={Col} xs={3} controlId="MonatBis">
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
                                    <Form.Control required id="JahrBis" type="text" placeholder="Jahr" />
                                </Form.Group>
                            </Form.Row>
                        </div>

                        <Button type="submit" size="lg" >Export</Button>

                    </Form>
                </div>
                <NotificationContainer />

            </React.Fragment>
        );
    }
}