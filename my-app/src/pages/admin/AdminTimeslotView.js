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
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import history from '../../history';

const currentDate = '2020-11-15';
const appointments = [

    {
        startDate: new Date(2020, 10, 15, 9, 35),
        endDate: new Date(2020, 10, 15, 11, 30),
        id: 0,
        capacity: 10,
        bookings: 30,

    }
];


/* Customize AppointmentForm Beginn*/

//Hide Text Editor Field Label
const messages = {
    moreInformationLabel: '',
};

//Hide Text Editor Field
const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    return null;
};

//Hide Reoccurence & All Day Button
const BooleanEditor = ({ props }) => {
    return (null);
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
                text={appointmentData.bookings + "%"}
                type="ordinary"
            />
        </AppointmentForm.BasicLayout>
    );
};

/* Customize AppointmentForm End*/

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            timeslots: [],
            data: appointments,
            currentDate: currentDate,
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
        }
        this.fetchTimeslots();
        console.log("state data", this.state.data)
    }

    async fetchTimeslots() {
        console.log("start fetch timeslot");
        var url = `/timeslots/`;
        const result = await fetch(url);
        if (result.ok) {
            const body = await result.json();
            console.log("body", body)
            this.fetchTimeslotBookings(body);
        } else {
            this.setState({ timeslots: [] });
            console.log("Error during fetchTimeslots: ", result.status);
        }

    }

    async fetchTimeslotBookings(timeslotsdata) {
        console.log("timeslots", timeslotsdata)
        var checkedTimeslots = [];
        this.setState({ timeslots: [] });
        var that = this;
        await timeslotsdata.forEach(await async function (timeslot, index) {
            var url = `/timeslots/?id=` + timeslot.id + `&count=true`;
            const result = await fetch(url);
            if (result.ok) {
                const body = await result.json();
                if (timeslot.capacity) {
                    timeslot.bookings = Math.round(body.count / timeslot.capacity);
                } else {
                    timeslot.bookings = 100;
                }
                timeslot.startDate = new Date(timeslot.start);
                timeslot.endDate = new Date(timeslot.end);
                //timeslot.title = 'test';
                checkedTimeslots.push(timeslot);
            } else {
                console.log("Error during fetchTimeslotBookings: ", result.status);
            }
            that.setState({ timeslots: checkedTimeslots });
            console.log("checkedTimeslots", checkedTimeslots);
        })
    }

    async addTimeslot(start, end, capacity) {
        var url = `/timeslots/`;
        var data = {
            start: start,
            end: end,
            capacity: capacity
        }
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            console.log("Added Timeslot :", start, end, capacity)

        } else {
            console.log("Error during addTimeslot: ", result.status);

        }
    }

    async updateTimeslot(id, start, end, capacity) {
        var url = `/timeslots/`;
        var data = {
            id: id,
            start: start,
            end: end,
            capacity: capacity
        }
        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            console.log("Updated Timeslot :", id, start, end, capacity)
        } else {
            console.log("Error during updateTimeslot: ", result.status);
        }
    }

    async deleteTimeslot(id) {
        var url = `/timeslots/`;
        var data = {
            id: id,
        }
        const result = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.ok) {
            console.log("Deleted Timeslot :", id)
        } else {
            console.log("Error during deleteTimeslot: ", result.status);
        }
    }

    commitChanges({ added, changed, deleted }) {
        console.log(this.state.timeslots)
        /*
        if (added) {
            this.addTimeslot(added.startDate, added.endDate, added.capacity)
        }
        if (changed) {
            this.updateTimeslot(changed.id, changed.startDate, changed.endDate, changed.capacity)
        }
        if (deleted !== undefined) {
            this.deleteTimeslot(deleted.id);
        }

        this.fetchTimeslots();
        */

        this.setState((state)=>{
        let { data } = state;
        console.log(data)
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
            data = data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
        }
        return { data };
    });

    }

    render() {
        const { currentDate, data, resources, timeslots } = this.state;

        return (
            <React.Fragment>
                <AdminNavigation></AdminNavigation>
                <Paper className="timeslotscheduler">
                    <Scheduler
                        data={data}
                    >
                        <EditingState
                            onCommitChanges={this.commitChanges}
                        />
                        <IntegratedEditing />
                        <ViewState
                        currentDate={currentDate} //if removed current date wil automatically be used
                        />
                        <WeekView
                            startDayHour={6}
                            endDayHour={22}
                        />
                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ConfirmationDialog />
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
