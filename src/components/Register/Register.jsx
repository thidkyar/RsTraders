import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Register.css";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Register extends Component {
  getData = () => {
    return fetch("http://localhost:4000/")
      .then(res => res.json())
      .then(data => {
        console.log("Just hit the server");
        console.log(data.message);
      })
      .catch(err => console.log(err));
  };

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
    return (
      <div className="session">
      <h1>Create your Account</h1>
        <div className="register-form">
          <button onClick={() => this.getData().message}>Hey</button>
          <form>
            <TextField label="Email" name="Email" />
            <br/>
            <TextField label="Password" name="Password" />
            <br/>
            <TextField label="Confirm Password" name="Password" />
            <br/>
            <Button variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
