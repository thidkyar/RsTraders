import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Register.css";
import { TextField } from "@material-ui/core";
import { redirect } from "@reach/router";

const styles = theme => ({
  margin: {
    margin: 'none'
  },
  button: {
    marginTop: '10px',
    textAlign: 'center',
    paddingLeft: '100px',
    paddingRight: '100px'
  },
  input: {
    display: "none"
  },
  form: {
    textAlign: 'center'
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
    console.log(this);
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(e);
    // get form data out of state
    const { first_name, last_name, password, email, phone } = this.state;

    fetch("/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(result => result.json())
      .then(response => {
        this._sendUserBalanceToBlockChain(()=> {
          if (response.redirect) {
            window.location.replace(response.url);
          }
        });
      });
  };

  _sendUserBalanceToBlockChain = (cb) => {
    const userData = {
      coin_id_from: null, //USD
      coin_value_from: null, //USD - $10
      coin_id_to: "RST", //RST
      coin_value_to: 10000, //RST- get market rate - *1,000
      date: Date.now() //
    };

    fetch("/api/blockchain/transaction", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(result => {
      cb()
    })
  };

  render() {
    const { classes } = this.props;
    // const { first_name, last_name, password, email, phone } = this.state;
    return (
      <div className="session">
        <h1>create your account</h1>
        <div className="register-form">
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              className={classes.margin}
              onChange={this.onChange}
              label="First Name"
              name="first_name"
              fullWidth
              required
            />
            <br />
            <TextField
              onChange={this.onChange}
              label="Last Name"
              name="last_name"
              fullWidth
              required
            />
            <br />
            <TextField
              onChange={this.onChange}
              type="email"
              label="Email"
              name="email"
              fullWidth
              required
            />
            <br />
            <TextField
              onChange={this.onChange}
              type="password"
              label="Password"
              name="password"
              fullWidth
              required
            />
            <br />
            <TextField
              onChange={this.onChange}
              type="number"
              label="Phone #"
              name="phone"
              fullWidth
              required
            />
            <Button className={classes.button} type="Submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
