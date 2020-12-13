import React from 'react';
import AdminNavigation from './AdminNavigation';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Resources,
    WeekView,
    Appointments,
    Toolbar,
    DateNavigator,
    TodayButton,
    AppointmentForm,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import history from '../../history';
import { NotificationContainer, NotificationManager } from 'react-notifications';

/*Page for creating, updating and deleting timeslots
*get: token from AdminNavigation
*send: nothing
*/

/* Customize AppointmentForm Beginn*/

//Hide Text Editor Field Label
const messages = {
    moreInformationLabel: '',
};

//Hide Text Editor Field
const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    return (<></>);
};

//Hide Reoccurence & All Day Button
const BooleanEditor = ({ props }) => {
    return (<></>);
};

const BasicLayout = ({ appointmentData, ...restProps }) => {
    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Buchungen"
                type="title"
            />
            <AppointmentForm.Label
                text={appointmentData.bookings ? appointmentData.bookings + "%" : `0%`}
                type="ordinary"
            />
        </AppointmentForm.BasicLayout>
    );
};

/* Customize AppointmentForm End*/

export default class AdminTimeslotView extends React.PureComponent {
    /* Component for Schedule for timeslots*/

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            timeslots: [],
            resources: [
                {
                    fieldName: 'capacity',
                    title: 'Kapazität',
                    instances: [
                        { id: 10, text: 'max. 10 Besucher' },
                        { id: 25, text: 'max. 25 Besucher' },
                        { id: 50, text: 'max. 50 Besucher' },
                        { id: 100, text: 'max. 100 Besucher' },
                        { id: 150, text: 'max. 150 Besucher' },
                    ],
                }
            ],
        };

        this.commitChanges = this.commitChanges.bind(this);

    }

    componentDidMount() {
        if (history.location.state) {
            this.setState({ token: history.location.state.token });
            this.fetchTimeslots();
        }
    }

    createNotification = (type) => {
        //define notification

        switch (type) {
            case 'error':
                NotificationManager.error('Fehler!', 'Fehler beim Vorgang!', 5000);
                break;
            default:
            // do nothing
        }
    }

    async fetchTimeslots() {
        //db connection to fetch timeslot data
        var url = `/timeslots/`;
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            this.fetchTimeslotBookings(body);
        } else {
            this.setState({ timeslots: [] });
        }

    }

    async fetchTimeslotBookings(timeslotsdata) {
        //fetch booking information for timeslots 

        var checkedTimeslots = [];
        for (const timeslot of timeslotsdata) {
            var url = `/timeslots/?id=` + timeslot.id + `&count=true`;
            const result = await fetch(url);
            if (result.ok) {
                const body = await result.json();
                //calc capacity

                if (timeslot.capacity) {
                    timeslot.bookings = Math.round(body.count / timeslot.capacity * 100);
                } else {
                    timeslot.bookings = 100;
                }
                timeslot.startDate = new Date(timeslot.start);
                timeslot.endDate = new Date(timeslot.end);

                checkedTimeslots.push(timeslot);
            } else {
                this.createNotification('error');
            }
        }
        this.setState({ timeslots: checkedTimeslots });
    }

    async addTimeslot(start, end, capacity) {
        //db connection to add timeslot
        var url = `/timeslots/`;
        var data = {
            start: start,
            end: end,
            capacity: capacity
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': this.state.token
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            //do nothing

        } else {
            this.createNotification('error');
        }
    }

    async updateTimeslot(changed) {
        //db connection to update timeslot

        var id = Object.keys(changed)[0]; //get id
        var data = Object.values(changed)[0]; //get changed values

        var url = `/timeslots/` + id;

        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': this.state.token
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            // do nothing
        } else {
            this.createNotification('error');
        }
    }

    async deleteTimeslot(id) {
        //db connection to delete timeslot

        var url = `/timeslots/` + id;

        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': this.state.token
            },

        });
        if (result.ok) {
            // do nothing
        } else {
            this.createNotification('error');
        }
    }

    commitChanges({ added, changed, deleted }) {
        //handle changes

        if (added) {
            this.addTimeslot(added.startDate, added.endDate, added.capacity)
        }
        if (changed) {
            this.updateTimeslot(changed)
        }
        if (deleted !== undefined) {
            this.deleteTimeslot(deleted);
        }

        this.fetchTimeslots();

    }

    //HTML Part
    render() {
        const { resources } = this.state;


        return (
            <React.Fragment>
                <AdminNavigation></AdminNavigation>
                <Paper className="timeslotscheduler">
                    <Scheduler
                        data={this.state.timeslots} //don't change this to timeslot
                    >
                        <EditingState
                            onCommitChanges={this.commitChanges}

                        />
                        <IntegratedEditing />
                        <ViewState
                        // currentDate={currentDate} //if removed current date wil automatically be used
                        />
                        <WeekView
                            startDayHour={6}
                            endDayHour={22}
                        />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <Appointments />
                        <AppointmentTooltip
                            showOpenButton
                            showDeleteButton
                        />
                        <AppointmentForm
                            basicLayoutComponent={BasicLayout}
                            textEditorComponent={TextEditor}
                            messages={messages}
                            booleanEditorComponent={BooleanEditor}
                        />
                        <Resources
                            data={resources}
                        />
                    </Scheduler>
                </Paper>
            </React.Fragment>
        );
    }
}
