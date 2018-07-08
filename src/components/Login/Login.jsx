import React, { Component } from "react";

//Material UI components
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';
import Zoom from '@material-ui/core/Zoom';
//import other components
import Register from '../Register/Register.jsx'

import "./Login.css";

const styles = theme => ({
  margin: {
    margin: "none"
  },
  button: {
    marginTop: "10px",
    textAlign: "center",
    width: '100%'
  },
  input: {
    display: "none"
  },
  form: {
    textAlign: "center"
  },
  appBar: {
    backgroundColor: '#A63D40',
    marginBottom: '20px'
  },
  registerButton: {
    marginTop: "10px",
    textAlign: "center",
    width: '100%',
    backgroundColor: '#8C3336'
  }
});

function Transition(props) {
  return <Collapse direction="right" {...props} />;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    console.log(e);
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({ [e.target.name]: e.target.value });
    console.log(this);
  };

  onSubmit = e => {
    console.log("EXECUTE SUBMIT F");
    e.preventDefault();
    const { password, email } = this.state;

    fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(result => result.json())
      .then(response => {
        if (response.redirect) {
          window.location.replace(response.url);
        }
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="session">
        <h1>Sign in to RSTraders</h1>
        <div className="register-form">
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              onBlur={this.onChange}
              type="email"
              label="Email"
              name="email"
              required
              fullWidth
            />
            <TextField
              onBlur={this.onChange}
              type="password"
              label="Password"
              name="password"
              required
              fullWidth
            />
            <Button
              className={classes.button}
              type="Submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button className={classes.registerButton} variant='contained' color='secondary' onClick={this.handleClickOpen}>
            New Account
          </Button>
          </form>
        </div>
        <div >
          <Dialog
          PaperProps={{
            style: {
              backgroundColor: '#0F031E',
              boxShadow: 'none',
              borderRadius: '10px'
            },
          }}
            className={classes.dialog}
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
            <Register />
          </Dialog>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
