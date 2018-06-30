import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="session">
      <h1>Sign in to RSTraders</h1>
      <div className="register-form">
        <form >
          <TextField label="Email" name="email" />
          <br />
          <TextField label="Password" name="password" />
          <br />
          <Button
            type="Submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
    );
  }
}

export default Login;