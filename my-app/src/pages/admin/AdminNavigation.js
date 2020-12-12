import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/H20_Logo1.JPG';
import history from '../../history';
import Button from 'react-bootstrap/Button';

/* This is the navigation bar of the admin part
* get: token from AdminLogIn
* send: token to Subpages
*/

export default class AdminNavigation extends Component {
    /*Component for rendering navigation*/

    state = {
        token: '',
    }

    componentDidMount() {

        var token = undefined; 

        //Check if token is supplied
        if (history.location.state) {
            console.log( "histroy", history.location.state.token)
            token = history.location.state.token;
            this.setState({ token: token });
            //save token in localStorage to save login
            window.localStorage.setItem('token', token);
        } else {
            //get token from localStorage
            token = window.localStorage.getItem('token');
            if(token){
                console.log( "localStorage", localStorage);
            }
        }

        if(token){
            //test if token is valid
            this.testToken(token);
        }else{
            //send to loginPage if token is not valid
            history.push({ pathname: '/admin' });
        }
    }

    async testToken(token){
        //validate token
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
            //token o.k.

        } else {
            console.log("Error during testToken: ", result.status);
            history.push({ pathname: '/admin' });
        }
    }

    logout = () =>{
        //logout
        window.localStorage.removeItem('token');
        history.push({pathname:'/admin'});
    }

    render() {
        const { token } = this.state;

        //HTML Part 
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