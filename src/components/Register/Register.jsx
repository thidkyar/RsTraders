import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Register.css";
import { TextField } from "@material-ui/core";
import axios from "axios";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: ""
    };
  }
  onChange = e => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({ [e.target.name]: e.target.value });
    console.log(this)
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(e);
    // get form data out of state
    const { first_name, last_name, password, email, phone } = this.state;

    fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(result => result.json())
      .then(info => {
        console.log(info);
      });
  };

  // getData = () => {
  //   return fetch("http://localhost:4000/")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("Just hit the server");
  //       console.log(data.message);
  //     })
  //     .catch(err => console.log(err));
  // };

  // <button onClick={() => this.getData().message}>Hey</button>
  //POST REQUEST
  // return fetch('http://localhost:4000/', {
  //   method: "POST",
  //   headers: {
  //     'Content-type': 'application/json'
  //   },
  //   body: JSON.stringify({message: ""})
  // }).then

  render() {
    const { classes } = this.props;
    // const { first_name, last_name, password, email, phone } = this.state;
    return (
      <div className="session">
        <h1>Create your Account</h1>
        <div className="register-form">
          <form onSubmit={this.onSubmit}>
            <TextField onBlur={this.onChange} label="First Name" name="first_name" />
            <br />
            <TextField onBlur={this.onChange} label="Last Name" name="last_name" />
            <br />
            <TextField onBlur={this.onChange} label="Email" name="email" />
            <br />
            <TextField onBlur={this.onChange} label="Password" name="password" />
            <br />
            <TextField onBlur={this.onChange} label="Phone #" name="phone" />
            <Button
              type="Submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
