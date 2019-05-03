import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path ="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
