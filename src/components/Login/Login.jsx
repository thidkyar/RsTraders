import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import "./Login.css";

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

    fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    // .then(result => result.json())
      .then(info => {
        console.log(info);
      });
  }
  render() {
    return (
      <div className="session">
      <h1>Sign in to RSTraders</h1>
      <div className="register-form">
        <form onSubmit={this.onSubmit}>
          <TextField onBlur={this.onChange} label="Email" name="email" />
          <br />
          <TextField onBlur={this.onChange} label="Password" name="password" />
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