import React, { Component } from 'react';
import AdminNavigation from './AdminNavigation';
import history from '../../history';

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
                <h1>Admin Start Page!</h1>

            </React.Fragment>
        );
    }
}