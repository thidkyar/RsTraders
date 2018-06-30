import React, { Component } from 'react';


class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        "data": {
          "2": {
            "name": "",
            "symbol": "",
            "rank": "",
            "quotes": {
              "CAD": {
                "price": "",
                "percent_change_24h": ""
              }
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    //API to GET all cryptocurrency tickers
    const url = "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=20";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ items: result });
          console.log(result);
        }
      )
  }
  render() {
    console.log("Render", this.state.items);
    const coins = this.state.items;
    return (
      <div>
        <h1> Top 20 cryptocurrencies </h1>
        <div>
          <table>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Rank</th>
              <th>Price</th>
              <th>Change (24h)</th>
            </tr>
            <tr>
              <td>
                {this.state.items["data"]["2"].name}
              </td>
              <td>
                {this.state.items["data"]["2"].symbol}
              </td>
              <td>
                {this.state.items["data"]["2"].rank}
              </td>
              <td>
                {this.state.items["data"]["2"]["quotes"]["CAD"].price}
              </td>
              <td>
                {this.state.items["data"]["2"]["quotes"]["CAD"].percent_change_24h}
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

export default Crypto;