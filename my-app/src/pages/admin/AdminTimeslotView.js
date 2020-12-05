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

const currentDate = '2018-06-27';
const appointments = [

    {
        title: 'Website Re-Design Plan',
        startDate: new Date(2018, 5, 25, 9, 35),
        endDate: new Date(2018, 5, 25, 11, 30),
        id: 0,
        capacity: 'c10',
        bookings: 30,

    }, {
        title: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2018, 5, 25, 12, 11),
        endDate: new Date(2018, 5, 25, 13, 0),
        capacity: 'c25',
        bookings: 50,
        id: 1,

    }, {
        title: 'Install New Router in Dev Room',
        startDate: new Date(2018, 5, 25, 14, 30),
        endDate: new Date(2018, 5, 25, 15, 35),
        capacity: 'c10',
        bookings: 70,
        id: 2,

    }, {
        title: 'Approve Personal Computer Upgrade Plan',
        startDate: new Date(2018, 5, 26, 10, 0),
        endDate: new Date(2018, 5, 26, 11, 0),
        capacity: 'c10',
        bookings: 90,
        id: 3,
    },
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
  const BooleanEditor = ({props})=>{
    return ( null );
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
                text={appointmentData.bookings+"%"}
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
            data: appointments,
            currentDate: currentDate,
            resources: [
                {
                    fieldName: 'capacity',
                    title: 'Kapazität',
                    instances: [
                        { id: 'c10', text: 'max. 10 Besucher' },
                        { id: 'c25', text: 'max. 25 Besucher' },
                        { id: 'c50', text: 'max. 50 Besucher' },
                    ],
                }
            ],
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
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
        const { currentDate, data, resources } = this.state;

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
                            startDayHour={9}
                            endDayHour={20}
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
