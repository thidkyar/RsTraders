import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import "./Login.css";
import { Router, Link } from "@reach/router";
import ResetPassword from '../ResetPassword/ResetPassword';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = e => {
    console.log(e)
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({ [e.target.name]: e.target.value });
    console.log(this)
  };

  onSubmit = e => {
    console.log('EXECUTE SUBMIT F')
    e.preventDefault();
    const {password, email} = this.state;

    fetch("/api/users/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(result => result.json())
      .then(response => {
        if (response.redirect) {
          window.location.replace(response.url)
        }
      });
  }
  render() {
    return (
      <div className="session">
      <h1>Sign in to RSTraders</h1>
      <div className="register-form">
        <form onSubmit={this.onSubmit}>
          <TextField onBlur={this.onChange} label="Email" name="email" required/>
          <br />
          <TextField onBlur={this.onChange} label="Password" name="password" required/>
          <br />
          <Button
            type="Submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <br />
          <br />
          <Link to="resetpassword">Reset Password</Link>
        </form>
      </div>
    </div>
    );
  }
}

export default Login;