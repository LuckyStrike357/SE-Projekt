import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavigation = () => (
    <React.Fragment>
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