import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
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
        const allCoins = [];
        resultObj.forEach(item => {
          allCoins.push(item.name);
        });
        this.setState({ coins: allCoins });
      });
  };

  componentDidMount() {
    this.callFromApi();
  }
  render() {
    return (
      <div>
            {this.state.coins.map(x => {
              return (
                  <Button>
                  {x}
                  </Button>
              );
            })}
      </div>
    );
  }
}
export default Favourites;
