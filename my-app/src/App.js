import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <div id="page-body">
      <Route path="/" component={HomePage} exact/>
      <Route path="/about/:id" component={AboutPage} />
      </div>
    </div>
    </Router>
  );
}

export default App;
