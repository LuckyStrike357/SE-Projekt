import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';


export default class AdminNavigation extends Component {
    
    state = {
        token: '',
    }

    componentDidMount() {
        if(history.location.state){
        this.setState({token:history.location.state.token});
        }
    }

    render() {
        const { token } = this.state;
        return (

            <React.Fragment>
                <nav className="adminnavigation">
                    <ul>
                        <li>
                            <Link to="/admin/start" state={token}>Start</Link>
                        </li>
                        <li>
                            <Link to="/admin/timeslots" state={token}>Timeslots</Link>
                        </li>
                        <li>
                            <Link to="/admin/checkQR" state={token}>CheckQR</Link>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    };
}