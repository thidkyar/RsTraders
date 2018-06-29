import React, { Component } from 'react';
import {Link} from "@reach/router";
import { AppBar } from '@material-ui/core';

//Navigation componenet (child)
class Navbar extends Component {
  render() {
    return (
      <div>
        <Link to='/'>Home</Link> |
        <Link to="Login/Login.jsx">Login</Link> |
        <Link to="Register/Register.jsx">Register</Link>
      </div>
    );
  }
}

export default Navbar;
