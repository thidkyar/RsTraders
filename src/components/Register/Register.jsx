import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Register.css";
import { TextField } from "@material-ui/core";
import axios from 'axios';

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
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: ''
    }
  }

  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { first_name, last_name, password, email, phone } = this.state;

    axios.post('http://localhost:4000/api/users/register', { first_name, last_name, password, email, phone })
      .then((result) => {
        console.log(result)
      });
  }

  getData = () => {
    return fetch("http://localhost:4000/")
      .then(res => res.json())
      .then(data => {
        console.log("Just hit the server");
        console.log(data.message);
      })
      .catch(err => console.log(err));
  };

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
    const { first_name, last_name, password, email, phone } = this.state;
    return (
      <div className="session">
      <h1>Create your Account</h1>
        <div className="register-form">
          <form method='POST' action='http://localhost:4000/api/users/register'>
            <TextField onChange={this.onChange} value= {first_name} label="First Name" name="first_name" />
            <br/>
            <TextField onChange={this.onChange} value= {last_name} label="Last Name" name="last_name" />
            <br/>
            <TextField onChange={this.onChange} value= {email} label="Email" name="email" />
            <br/>
            <TextField onChange={this.onChange} value= {password} label="Password" name="password" />
            <br/>    
            <TextField onChange={this.onChange} value={phone} label="Phone #" name="phone" />
            <Button type='Submit' variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
