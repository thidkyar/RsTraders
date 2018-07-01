import React, { Component } from 'react';
import {Router} from "@reach/router";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import Crypto from './CryptoAPI/Crypto.jsx';
import CryptoNews from './CryptoNews/CryptoNews.jsx';
import NavBar from "./NavBar/NavBar";

import './App.css';

let Home = () => <Crypto />

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
      <CryptoNews />
      <Crypto />
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
