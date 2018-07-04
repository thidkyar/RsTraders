import React, { Component } from 'react';
import {Router, Link} from "@reach/router"
//import components
import Chart from "./Chart.jsx"
//import CSS
// import './App.css'; 

class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coinCodes: []
    }
  }
  componentWillMount() {
    this._getUserFavorites()
  }
  _getUserFavorites = () => {
    fetch("/api/favorites", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {

        const coinCodes = [];
        data.forEach(x => {
          coinCodes.push(x.coin_id);
        });
        this.setState({ coinCodes: coinCodes });
      });
  };
  render() {
    console.log('this',this.state.coinCodes)
    return (
      <div>
        {this.state.coinCodes.map(coinCode => {
          return (
            <Chart coinCode={coinCode} />
          )
      })}
      </div>
    );
  }
}

export default Charts;
