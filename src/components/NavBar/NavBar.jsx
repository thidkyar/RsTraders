import React, { Component } from "react";
import { Link } from "@reach/router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
  }
  _onSubmit = e => {
      e.preventDefault()
      fetch("/api/users/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-type": "application/json"
        },
      })
        .then(result => result.json())
        .then(response => {
          console.log(response);
          if (response.redirect) {
            window.location.replace(response.url)
          }
        });
    };
    componentDidMount() {
      //API to GET all cryptocurrency tickers
      const url = "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=100&sort=rank&structure=array";
      //fetch data from API
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState("Set state"[result]);
            // console.log("Original Format", result);
            var coins = Object.values(result.data);
            this.setState({ coins: coins });
            // console.log("Here's the array", coins);
          }
        )
    }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title">
              <Link to="/"> Home </Link> |
              <Link to="/chart"> Chart </Link> |
              <Link to="login"> Login </Link> |
              <Link to="register"> Register </Link> |
              <Link to="favourites"> Fav </Link> | 
              <Link to="profile"> Profile </Link> | 
              <Link to="usersettings">User Settings</Link> | 
              <Link to="stripe">Stripe</Link> |
              <Link to="cryptonews">News</Link>
              <form onSubmit={this._onSubmit}>
        <Button type="Submit" varient="outlined" color="secondary" >Logout </Button>
              </form>
            </Typography>
          </Toolbar>
        </AppBar>

        <marquee className="coin-container" >
            {this.state.coins.map((coin, c) => {
              return (
                <span className="sym" style={{
                  padding: '10px'}} key={c}> {coin.symbol}: {coin.quotes.CAD.percent_change_24h} %  </span>
              )
            })
            }
          </marquee>
          <hr />
      </div>
    );
  }
}
export default NavBar;
