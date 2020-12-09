import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import StartPage from './pages/StartPage';
import CanclePage from './pages/CanclePage';
import FindSlotPage from './pages/FindSlotPage';
import DataFormPage from './pages/DataFormPage';
import BookingCodePage from './pages/BookingCodePage';
import AdminLogIn from './pages/admin/AdminLogIn';
import AdminStart from './pages/admin/AdminStart';
import AdminTimeslotView from './pages/admin/AdminTimeslotView';
import AdminCheckQR from './pages/admin/AdminCheckQR';
import AdminNavigation from './pages/admin/AdminNavigation';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={StartPage} />
                    <Route path="/cancle" component={CanclePage} />
                    <Route path="/findSlot" component={FindSlotPage} />
                    <Route path="/dataForm" component={DataFormPage} />
                    <Route path="/bookingCode" component={BookingCodePage} />
                    <Route path="/admin" exact component={AdminLogIn} />
                    
                    <Route path="/admin/start" component={AdminStart} />
                    <Route path="/admin/timeslots" component={AdminTimeslotView} />
                    <Route path="/admin/checkQR" component={AdminCheckQR} />
                </Switch>
            </Router>
        )
    }
}