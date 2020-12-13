import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import history from '../../history';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import DatePicker from '../DatePicker';

/*Export Page
*get: token from AdminNavigation
*send: nothing
*/

export default class AdminLogInPage extends Component {

    componentDidMount() {

        //check if token is supplied
        if (history.location.state !== undefined) {
            this.setState({ token: history.location.state.token });
        }

    }

    state = {
        token: '',
        validated: false,
    }

    createNotification = (type) => {
        //define notifications

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
        //format data from db (deep to flat object)
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
        return formattedData;
    }

    async export(start, end) {
        //download data
        var exportData = await this.fetchExportData(start, end);
        var formattedData = await this.format(exportData);

        const { Parser } = require('json2csv');

        if (formattedData.length > 0) {
            try {
                //create csv
                const parser = new Parser();
                const csv = parser.parse(formattedData);
                var uri = 'data:text/csv;charset=utf-8,' + csv;

                //download csv
                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = "data.csv";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                this.createNotification('success');
            } catch (err) {
                this.createNotification('error');
            }
        }
    }

    async fetchExportData(start, end) {
        //db connection for fetching export data
        var url = `/export?start=` + start + `&end=` + end;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': this.state.token
            }
        });
        if (result.ok) {
            const body = await result.json();
            Promise.resolve(body);
            return body;

        } else {
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
        //get data from form
        const handleSubmit = (event) => {
            const form = event.currentTarget;

            //stop propagation of event because it is handled manually
            event.preventDefault();
            event.stopPropagation();

            if (form.checkValidity() === true) {
                const startDateForm = document.getElementById("DatumVon");
                const endDateForm = document.getElementById("DatumBis")

                const startDay = startDateForm.children[1].children[0].children[0].value;
                const startMonth = startDateForm.children[1].children[1].children[0].value;
                const startYear = startDateForm.children[1].children[2].children[0].value;

                const endDay = endDateForm.children[1].children[0].children[0].value;
                const endMonth = endDateForm.children[1].children[1].children[0].value;
                const endYear = endDateForm.children[1].children[2].children[0].value;

                const start = "" + startYear + "-" + startMonth + "-" + startDay;
                const end = "" + endYear + "-" + endMonth + "-" + endDay;
                this.export(start, end);
            }
            this.setState({ validated: true });
        }

        //HTML Part
        return (
            <React.Fragment>
                <AdminNavigation></AdminNavigation>
                <h1>Datenexport</h1>

                <div className="AdminLoginTextboxes">
                    <p>Bitte geben Sie den Zeitraum an in diesem Sie den Datenexport vornehmen möchten.</p><br />
                    <Form id="dataForm" noValidate validated={this.state.validated} onSubmit={handleSubmit}>
                        <div id="DatumVon">
                            <p>Von:</p>
                            <DatePicker></DatePicker>
                        </div>

                        <div id="DatumBis">
                            <p>Bis:</p>
                            <DatePicker></DatePicker>
                        </div>

                        <Button type="submit" size="lg" >Export</Button>

                    </Form>
                </div>
                <NotificationContainer />

            </React.Fragment>
        );
    }
}