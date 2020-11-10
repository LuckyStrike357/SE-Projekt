import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavigation = () => (
    <React.Fragment>
        <h1>Admin Navigation!</h1>
        <nav>
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