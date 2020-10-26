import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import StartPage from './pages/StartPage';
import CanclePage from './pages/CanclePage';
import FindSlotPage from './pages/FindSlotPage';
import DataFormPage from './pages/DataFormPage';
import BookingCodePage from './pages/BookingCodePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import AdminLogIn from './pages/admin/AdminLogIn';
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
                    <Route path="/home" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/admin" component={AdminLogIn} />
                </Switch>
            </Router>
        )
    }
}