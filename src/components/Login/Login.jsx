import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

class Login extends Component {
  render() {
    return (
      <div>
        <div className = "App">
      <form >
         <h1> Login </h1>
         <TextField label="Email" name="Email"/>
         <TextField label="Password" name="Password"/>
         <Button variant="contained" color="primary" >
          Login
        </Button>
       </form>
      </div>
      </div>
    );
  }
}

export default Login;