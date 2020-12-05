import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import history from './../../history';

const AdminLogIn = () => (

    <React.Fragment>
    <h1>Admin LogIn!</h1>
    <Button variant="primary" onClick={()=>history.push({ pathname: '/admin/start'})}>Next</Button>
    </React.Fragment>

)

export default class AdminLogInPage extends Component {

    render() {
        return(

            <div className="AdminLogin">
                Bitten melden Sie sich mit Ihren Anmeldedaten ein. 
            </div>
        );
    }
    
};
    
    
    
    