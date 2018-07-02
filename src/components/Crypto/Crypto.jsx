import React, { Component } from 'react';

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    }
  }
  componentDidMount() {
    //API to GET all cryptocurrency tickers
    const url = "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=500&sort=rank&structure=array";
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
      <div className="Crypto-Ticker">

        <h1>         Top 20 cryptocurrencies </h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.coins.map((coin, c) => {
              return (
                <tr key={c}>
                  <td>{coin.rank}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.name}</td>
                  <td>$ {Math.round((coin.quotes.CAD.price) * 100) / 100}</td>
                  <td>{coin.quotes.CAD.percent_change_24h} %</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        <hr />
        <marquee>This is text. This is a text. This is a text</marquee>
        <marquee heght="10">{this.state.coins.map((coin, c) => {
          return 
          <p>
          <p> key={c}></p>
          <p> {coin.symbol} - {coin.percent_change_24h}</p>
          </p>
          // <ul>
          // <li> key={c}></li>
          // <li> {coin.symbol} Hello Text</li>
          // <li>{coin.percent_change_24h}</li>
          // </ul>
        })} </marquee>
      </div>
    )
  }
}


export default Crypto;