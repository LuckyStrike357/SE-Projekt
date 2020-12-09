import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';


export default class AdminNavigation extends Component {

    state = {
        token: '',
    }

    componentDidMount() {

        if (history.location.state) {
            console.log( "histroy", history.location.state.token)
            this.setState({ token: history.location.state.token });
            window.localStorage.setItem('token', history.location.state.token);
        } else {
            this.setState({ token: window.localStorage.getItem('token') });
            console.log( "localStorage", window.localStorage.getItem('token'))
        }
    }

    render() {
        const { token } = this.state;
        return (

            <React.Fragment>
                <nav className="adminnavigation">
                    <ul>
                        <li>
                            <Link to={{pathname:"/admin/start", state:{token:token}}}>Start</Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/admin/timeslots", state:{token:token}}}>Timeslots</Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/admin/checkQR", state:{token:token}}}>CheckQR</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    };
}