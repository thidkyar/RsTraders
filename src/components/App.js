import React, { Component } from 'react';
import {Router} from "@reach/router";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import Crypto from './Crypto/Crypto.jsx';
import CryptoNews from './CryptoNews/CryptoNews.jsx';
import NavBar from "./NavBar/NavBar";
import Chart from "./Chart/Chart.jsx";
import ResetPassword from "./ResetPassword/ResetPassword.jsx";

import './App.css';

let Home = () => <Crypto />

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
      {/* <CryptoNews /> */}
        <Router>
          <Chart path="/chart" />
          <Home path="/" />
          <Login path="login" />
          <Register path="register" />
          <ResetPassword path="/login/resetpassword" />
        </Router>
      </div>
    );
  }
}

export default App;
