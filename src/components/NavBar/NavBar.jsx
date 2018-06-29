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
            <Tab label="Home" onClick={<Link to="/" />}>
              <Link to="/">Home</Link>
            </Tab>
            <Tab label="Login">
              <Link to="login">Login</Link>
            </Tab>
            <Tab label="Register">
              <Link to="register">Register</Link>
            </Tab>
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
