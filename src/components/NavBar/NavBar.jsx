import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  _onSubmit = e => {
      e.preventDefault()
      fetch("/api/users/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-type": "application/json"
        },
      })
        .then(result => result.json())
        .then(response => {
          console.log(response);
          if (response.redirect) {
            window.location.replace(response.url)
          }
        });
    };
  

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title">
              <Link to="/"> Home </Link> |
              <Link to="/chart"> Chart </Link> |
              <Link to="login"> Login </Link> |
              <Link to="register"> Register </Link> |
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={this._onSubmit}>
        <Button type="Submit" varient="outlined" color="secondary" >Logout </Button>

              </form>
      </div>
    );
  }
}
export default NavBar;
