import React, { Component } from "react";
import {Router, Link} from "@reach/router"
import {AppBar, Tabs, Tab} from '@material-ui/core'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <div className='nav'>
        <AppBar style={{ textDecorationColor: '#2196F3' }}>
          <Tabs>
              <Link to="/">Home</Link>
              <Link to="/chart">Charts</Link>
              <Link to="login">Login</Link>
              <Link to="register">Register</Link>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
