import React, { Component } from 'react';
import {Router, Link} from "@reach/router";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import NavBar from "./NavBar/NavBar.jsx";

import './App.css';
import { AppBar } from '@material-ui/core';


let Home = () => <h1>Yo</h1 >

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        <Router>
          <Home path="/" />
          <Login path="login" />
          <Register path="register" />
        </Router>
      </div>
    );
  }
}

export default App;
