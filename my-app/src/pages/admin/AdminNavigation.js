import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/H20_Logo1.JPG';
import history from '../../history';
import Button from 'react-bootstrap/Button';

export default class AdminNavigation extends Component {

    state = {
        token: '',
    }

    componentDidMount() {

        var token = undefined; 

        if (history.location.state) {
            console.log( "histroy", history.location.state.token)
            token = history.location.state.token;
            this.setState({ token: token });
            window.localStorage.setItem('token', token);
        } else {
            var token = window.localStorage.getItem('token');
            if(token){
                console.log( "localStorage", localStorage);
            }
        }

        if(token){
            this.testToken(token);
        }else{
            history.push({ pathname: '/admin' });
        }
    }

    async testToken(token){
        var url = `/api/auth/me`;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
        });
        if (result.ok) {
            const body = await result.json();

        } else {
            console.log("Error during testToken: ", result.status);
            history.push({ pathname: '/admin' });
        }
    }

    logout = () =>{
        window.localStorage.removeItem('token');
        history.push({pathname:'/admin'});
    }

    render() {
        const { token } = this.state;

        
        return (

            <React.Fragment>
                <img src={logo} className="adminLogo" alt="adminLogo" />
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
                        <li>
                            <Button className="adminLogout" variant="primary" onClick={this.logout} size="sm">Ausloggen</Button>
                        </li>
                    </ul>
                    
                </nav>
            </React.Fragment>
        )
    };
}