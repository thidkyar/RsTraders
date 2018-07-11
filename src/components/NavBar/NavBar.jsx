import React, { Component } from "react";
import { Link } from "@reach/router";
// import Marquee from "react-smooth-marquee"
import Marquee from 'react-text-marquee';


//Material UI components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stripe from '../Stripe/Stripe.jsx'

import "./NavBar.css";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  menuBar: {
    background: "#1C2C43",
    color: "white",
    textAlign: "left"
    // position: 'fixed'
  },
  toolBar: {
    textAlign: "right"
  },

  stripeTitle: {
    background: '#273954',
    color: 'white',
    width: '30em',
    height: '4em',
    textAlign: 'center'
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      auth: true,
      anchorEl: null
    };
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRSTClickOpen = () => {
    this.setState({ open: true });
  };

  handleRSTClose = () => {
    this.setState({ open: false });
  };
  
  _onSubmit = e => {
    e.preventDefault();
    fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(result => result.json())
      .then(response => {
        console.log(response);
        if (response.redirect) {
          window.location.replace(response.url);
        }
      });
  };
  componentDidMount() {
    this._verifyUser();
    //API to GET all cryptocurrency tickers
    const url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=300&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        // console.log("Original Format", result);
        var coins = Object.values(result.data);
        this.setState({ coins: coins });
        // console.log("Here's the array", coins);
      });
  }

  //verify whether user exists or not
  _verifyUser = () => {
    fetch("/api/users/login", {
      method: "GET",
      credentials: "include"
    })
      .then(result => result.json())
      .then(response => {
        this.setState({ loggedIn: response.loggedIn });
      });
  };

  //if user is logged in show Profile Icon - else - show login
  renderBasedonUserButton = () => {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    if (this.state.loggedIn) {
      return (
        <div>
          <Button
            component={Link}
            to="/chart"
            className={classes.button}
            color="inherit"
          >
            Trade
          </Button>{" "}
          <IconButton
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Button
            onClick={this.handleRSTClickOpen}
            className={classes.button}
            color="inherit"
          >Buy RST
          </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleRSTClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle style={{color:'white'}}className={classes.stripeTitle} id="form-dialog-title">
        <span style={{color: 'white', fontSize:'32px'}}>Buy RST Coins</span></DialogTitle>

        <Stripe className={classes.stripeBox}/>

        </Dialog>


        </div>
      );
    } else {
      return (
        <Button
          component={Link}
          to="/login"
          className={classes.button}
          color="inherit"
        >
          Login
        </Button>
      );
    }
  };
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.state.loggedIn);
    const loggedIn = this.state.loggedIn;
    return (
      <div>
        <div className="marquee">
        {/* <Marquee text="Wow this is really quite a long message but it can be handled by this component just fine" /> */}



          <marquee scrolldelay="200" className="coin-container">
            {this.state.coins.map((coin, c) => {
              const coinage = coin.quotes.CAD.percent_change_24h;
              const symolage = coin.symbol;
              if (coinage > 0) {
                return (
                  <b>
                    <span
                      style={{
                        padding: "15px"
                      }}
                    >
                      {" "}
                      {symolage} <font color="green"> {coinage}%</font>{" "}
                    </span>
                  </b>
                );
              } else {
                return (
                  <b>
                    <span
                      style={{
                        padding: "10px"
                      }}
                    >
                      {" "}
                      {symolage} <font color="red"> {coinage}% </font>
                    </span>
                  </b>
                );
              }
            })}
          </marquee>
        </div>
        <div className={classes.root}>
          {/* <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={this.handleChange}
                  aria-label="LoginSwitch"
                />
              }
              label={auth ? "Logout" : "Login"}
            />
          </FormGroup> */}
          <AppBar className={classes.menuBar} position="static">
            <Toolbar>
              <Typography
                component={Link}
                to="/"
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                RSTraders
              </Typography>

              <div>
                {this.renderBasedonUserButton()}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={this.handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/favourites"
                    onClick={this.handleClose}
                  >
                    Favorites
                  </MenuItem>
                  <MenuItem onClick={this._onSubmit}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
