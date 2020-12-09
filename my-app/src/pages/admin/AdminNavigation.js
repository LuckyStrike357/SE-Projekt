import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/H20_Logo1.JPG';

const AdminNavigation = () => (
    <React.Fragment>
        <img src={logo} className="adminLogo" alt="adminLogo" />
        <nav className="adminnavigation">
            <ul>
                <li>
                    <Link to="/admin/start">Start</Link>
                </li>
                <li>
                    <Link to="/admin/timeslots">Timeslots</Link>
                </li>
                <li>
                    <Link to="/admin/checkQR">CheckQR</Link>
                </li>
            </ul>
        </nav>
    </React.Fragment>
)

export default AdminNavigation;