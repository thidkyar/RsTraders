import React, { Component } from "react";
import { Link } from "@reach/router";

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
import Divider from '@material-ui/core/Divider';

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
    textAlign: "left",
    // position: 'fixed'
  },
  toolBar: {
    textAlign: "right"
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

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        {/* <hr /> */}

        <div className='marquee'>
        <marquee>
          {this.state.coins.map((coin, c) => {
            return (
              <span
                className="sym"
                style={{
                  padding: "10px"
                }}
                key={c}
              >
                {" "}
                {coin.symbol}: {coin.quotes.CAD.percent_change_24h} %{" "}
              </span>
            );
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
              {auth && (
                <div>
                  <Button
                    component={Link}
                    to="/login"
                    className={classes.button}
                    color="inherit"
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/chart"
                    className={classes.button}
                    color="inherit"
                  >
                    Chart
                  </Button>
                  {/* <Button
                    component={Link}
                    to="/cryptonews"
                    className={classes.button}
                    color="inherit"
                  >
                    News
                  </Button> */}
                  <IconButton
                    aria-owns={open ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
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
                    <MenuItem
                      component={Link}
                      to="/usersettings"
                      onClick={this.handleClose}
                    >
                      My account
                    </MenuItem>
                    <MenuItem onClick={this._onSubmit}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <Divider light/>

      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
