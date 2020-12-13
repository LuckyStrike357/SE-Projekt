import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './css/index.css';
import 'react-notifications/lib/notifications.css';
import 'whatwg-fetch';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);