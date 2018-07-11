import React, { Component } from "react";

//Material UI Components
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: '#273954',
    boxShadow: 'none',
  },
  allfavoritesDiv: {
    
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  favButton: {
    minWidth: 250,
    color: "#273954",
    borderColor: "#273954",
    boxShadow: "0px 0px 15px 0px #312c2c",
    margin: "6px"
  },
  searchBar: {
    width: "90%"
  }
});
class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      favCoins: [],
      currentRank: 1,
      favCount: 0,
      coinCodes: [],
      search: ""
    };
  }

  callFromApi = () => {
    const url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=500&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const resultObj = result.data;
        const allCoinData = [];
        resultObj.forEach(item => {
          // console.log(item)
          allCoinData.push(item);
        });
        console.log(allCoinData);
        this.setState({ coins: allCoinData });
      });
  };

  _getFavorites = () => {
    fetch("/api/favorites", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const coinCodes = [];
        data.forEach(x => {
          coinCodes.push(x.coin_id);
        });
        console.log(coinCodes);
        //set state then callback _setChartState function
        this.setState({ coinCodes: coinCodes });
      });
  };

  _deleteFavorites = e => {
    console.log("HMM", e.target.id);
    const favDetails = {
      coin_id: e.target.id
    };
    fetch("/api/favorites/delete", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(favDetails)
    })
      .then(result => result.json())
      .then(res => {
        // console.log(res);
        if (res.success === true) {
          this._getFavorites();
        } else {
          alert("delete failed");
        }
      });
  };

  _favButtonEvent = e => {
    const buttonText = e.target.innerText.split("/");
    // const favCoin = []
    // favCoin.push(buttonText[0])
    // console.log('1',favCoin)
    // this.setState({favCoin: favCoin})
    const params = {
      coin_id: buttonText[0],
      rank: this.state.currentRank
    };

    fetch("/api/favorites", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params)
      // body: params
    }).then(response => {
      const newFavCoins = this.state.coinCodes;
      if (!newFavCoins.includes(params.coin_id)) {
        newFavCoins.push(params.coin_id);
        this.setState({
          currentRank: this.state.currentRank + 1,
          favCount: this.state.favCount + 1,
          favCoins: newFavCoins
        });
      } else {
        alert("already in your favorites!");
      }
    });
  };

  _updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20) });
  };

  componentDidMount() {
    this._getFavorites();
    this.callFromApi();
  }
  render() {
    const { classes } = this.props;
    // console.log("check this", this.state.favCoins);
    const numberOfCoins = this.state.coinCodes;
    let filteredFavorites = this.state.coins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.state.search.toLowerCase())
      );
    });
    console.log(filteredFavorites);
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Select your Favourite Crypto's!</h1>
        <h3>You have {numberOfCoins.length} favorites </h3>
        <div className={classes.allfavoritesDiv}>
        {this.state.coinCodes.map(coin => {
          return (
                <Button
                  id={coin}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this._deleteFavorites}
                >
                  {coin}
                  <DeleteIcon
                    id={coin}
                    onClick={this._deleteFavorites}
                    className={classes.rightIcon}
                  />
                </Button>
          );
        })}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            className={classes.searchBar}
            type="text"
            label="Search Coin"
            name="search"
            value={this.state.search}
            onChange={this._updateSearch}
            fullWidth
          />
        </div>
        {filteredFavorites.map(x => {
          const buttonStyle = {
            variant: "outlined"
          };
          if (this.state.favCoins.includes(x)) {
            buttonStyle.variant = "contained";
            console.log(buttonStyle);
          }
          return (
            <Button
              className={classes.favButton}
              onClick={this._favButtonEvent}
              variant={buttonStyle.variant}
              color="primary"
            >
              {x.symbol}/{x.name}
            </Button>
          );
        })}
        <hr />

        <br />
        <br />
        <br />
        <hr />
      </div>
    );
  }
}

Favourites.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Favourites);
