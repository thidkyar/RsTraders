import React, { Component } from 'react';
import {Router, Link} from "@reach/router"
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import './App.css';

let Navigation = props => (
  <div>
    <Link to="/">Home</Link>
    <Link to="login">Login</Link> 
    <Link to="register">Register</Link>
  </div>
)

let Home = () => <h1>Yo</h1 >

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation> 
        </Navigation>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </div>
    );
  }
}

export default App;
