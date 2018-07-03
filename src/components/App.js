import React, { Component } from 'react';
import {Router, Link} from "@reach/router"
//import components
import Home from "./Home/Home.jsx"
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import NavBar from "./NavBar/NavBar.jsx"
import Chart from "./Chart/Chart.jsx"
import Crypto from "./CryptoAPI/Crypto.jsx"
import Favourites from "./Favourites/Favourites.jsx"
//import CSS
import './App.css'; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        <Router>
          <Chart path="/chart" />
          <Home path="/" />
          <Login path="login" />
          <Register path="register" />
          <Favourites path="favourites" />
        </Router>
      </div>
    );
  }
}

export default App;
