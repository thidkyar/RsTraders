import React, { Component } from "react";
import { Router } from "@reach/router";
//import Material UI components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

//import CSS
import "./NavBar2.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    paddingTop: "5px",
    // paddingLeft: "10px",
    paddingBottom: "10px",
    boxShadow: "none",
    boxSizing: "border-box",
    textAlign: "center",
    color: "#E8E8E8",
    backgroundColor: "#273954",
    borderColor: "white",
    // textAlign: "left",
    fontSize: "18px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  grid3: {
    // borderStyle: "solid"
  }
});

class NavBar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBalance: 0,
      allCoins: {}
    };
  }

  componentDidMount() {
    this._getBalance();
    this._verifyUser();
  }
  //Get user Balance from Blockchain
  _getBalance = () => {
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // console.log(data.message.amountTotal.RST)
        this.setState({
          userBalance: data.message.amountTotal.RST,
          allCoins: data.message.amountTotal
        });
        this.puller = setTimeout(this._getBalance, 1 * 1000);
      });
  };

  //Get all user coins
  renderObject = () => {
    const { classes } = this.props;
    const items = [];
    for (let key in this.state.allCoins) {
      if (this.state.allCoins.hasOwnProperty(key)) {
        items.push(
          <Grid className={classes.grid3} item xs={6} sm={2}>
            <div className="insideGrid">
              <div className="title">{key}</div>
              <Paper className={classes.paper} key={key}>
                {(this.state.allCoins[key].toLocaleString())}
              </Paper>
              <div className="Currency">USD ($)</div>
            </div>
          </Grid>
        );
      }
    }
    console.log("askdfjlasdjfs", items);
    return items;
  };

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

  _renderBar = () => {
    if (this.state.loggedIn) {
      return (
      <div className="topnav" id="myTopnav">

        <div className="container">
          <h1> CRYPTO WALLET </h1>
          <Grid container spacing={24}>
            {this.renderObject()}
          </Grid>
        </div>
      </div>
      );
    } else {
      <div>
        </div>
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
      {this._renderBar()}
        </div>
    );
  }
}

export default withStyles(styles)(NavBar2);
