import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Bar, Line, Pie, Area } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Chart.css";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ENGINE_METHOD_DIGESTS } from "constants";
import { TextField } from "@material-ui/core";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBalance: 0,
      numberOfContracts: 0,
      coinCodes: [],
      allCoins: {},
      data: {
        labels: [],
        datasets: [
          {
            data: []
          },
          {}
        ]
      },
      options: {
        legend: {
          labels: {
            fontColor: "orange"
          }
        },
        title: {
          display: true,
          fontColor: "white",
          text: "BitCoin"
        }
      }
    };
  }

  componentWillMount() {
    this._setLabelDatafromAPI();
    // this._setChartState();
    this._getBalance();
  }

  //get user favorites from database -- then callback setchartstate function to update state
  _setLabelDatafromAPI = () => {
    fetch("/api/favorites", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const coinCodes = [];
        data.forEach(x => {
          coinCodes.push(x.coin_id);
        });
        //set state then callback _setChartState function
        this.setState({ coinCodes: coinCodes }, this._setChartState);
      });
  };

  //set chart state from API call for coinCode passed from Charts component as prop
  _setChartState() {
    const { coinCode } = this.props;
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coinCode}&tsym=CAD&limit=100`;
    console.log("URL", url);
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const data = Object.values(result.Data);
        const timeData = [];
        const costCloseData = [];
        const costHighData = [];
        const costLowData = [];
        data.forEach(x => {
          //extract times from api
          const time = x.time;
          const closeTime = x.close;
          const highTime = x.high;
          const lowTime = x.low;
          //convert epoch time to readable time
          const theTime = new Date(time * 1000).toLocaleDateString();
          //push items to set arrays
          timeData.push(theTime);
          costCloseData.push(closeTime);
          costHighData.push(highTime);
          costLowData.push(lowTime);
        });
        // console.log(costData);
        let labels = this.state.data.labels;
        let dataSetData = { ...this.state.data.datasets[0].data };
        // console.log("before update", dataSetData);
        dataSetData = costCloseData;
        this.setState({
          data: {
            labels: timeData,
            datasets: [
              {
                ...this.state.data.datasets,
                data: costCloseData,
                label: "Close",
                borderColor: "#c45850",
                lineTension: 0,
                fill: false
              },
              {
                ...this.state.data.datasets,
                data: costHighData,
                label: "High",
                borderColor: "#3e95cd",
                lineTension: 0,
                fill: false
              },
              {
                ...this.state.data.datasets,
                data: costLowData,
                label: "Low",
                borderColor: "#308D8C",
                lineTension: 0,
                fill: false
              }
            ]
          }
        });
      });
  }

  //event handler to create sell transaction in blockchain
  _onBuyButtonClick = e => {
    const numberOfContracts = this.state.numberOfContracts
    const marketValue = this.state.data.datasets[0].data.slice(-1)[0]
    // const lastItem = marketValue.slice(-1)[0]
    if (this.state.userBalance > (marketValue*numberOfContracts)) { 
    const userData = {
      coin_id_from: "RST", //USD
      coin_value_from: marketValue * this.state.numberOfContracts, //USD - $10
      coin_id_to: this.props.coinCode, //RST
      coin_value_to: marketValue * this.state.numberOfContracts, //RST- get market rate - *1,000
      date: Date.now() //
    };

    fetch("/api/blockchain/transaction", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      // .then(res => res.json())
      .then(response => {
        this._getBalance();
      });
    } else {
      const ableToBuy = this.state.userBalance/this.state.data.datasets[0].data.slice(-1)[0]
      alert(`not enough funds, You can only buy ${ableToBuy} ${this.props.coinCode}`)
      };
    }

  //event handler to create sell transaction in blockchain
  _onSellButtonClick = e => {
    const sellAt = this.state.data.datasets[0];
    const marketValue = this.state.data.datasets[0].data.slice(-1)[0]
    const userData = {
      coin_id_from: this.props.coinCode, //USD
      coin_value_from: marketValue * this.state.numberOfContracts, //USD - $10
      coin_id_to: "RST", //RST
      coin_value_to: marketValue * this.state.numberOfContracts, //RST- get market rate - *1,000
      date: Date.now() //
    };

    fetch("/api/blockchain/transaction", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      // .then(res => res.json())
      .then(response => {
        this._getBalance();
      });
  };

  //get balance of user from blockchain
  _getBalance = () => {
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // console.log(data.message.amountTotal.RST)
        this.setState({ userBalance: data.message.amountTotal.RST, allCoins: data.message.amountTotal });
      });
  };

  _getNumberOfContracts = (e) => {
    this.setState({numberOfContracts: e.target.value})
  }

  renderObject = () => {
    const items = [];
    for (let key in this.state.allCoins) {
      if (this.state.allCoins.hasOwnProperty(key)) {
        items.push(<p key={key}>{key}: {this.state.allCoins[key]}</p>);
      }
    }

    return items;
  }

  render() {
    const styles = theme => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        color: theme.palette.text.secondary
      }
    });
    const balance = this.state.userBalance.toLocaleString();

    

    return (
      <div className="chart">
        <p> Your current balance: {balance}</p>
        {this.renderObject()}
        <Grid container spacing={0}>
          <Grid item xs={10} sm={2}>
            <Paper>
              <div>
                <h1>{this.props.coinCode}</h1>
                <TextField onChange={this._getNumberOfContracts} label="Number"> </TextField>
                <Button
                  onClick={this._onBuyButtonClick}
                  variant="contained"
                  color="primary"
                >
                  Buy
                </Button>
              </div>
              <br />
              <Button
                onClick={this._onSellButtonClick}
                variant="contained"
                color="primary"
              >
                Sell
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={10} sm={10}>
            <Paper>
              <Line
                data={this.state.data}
                width={100}
                height={300}
                options={{
                  title: {
                    display: true,
                    fontColor: "white",
                    text: this.props.coinCode
                  },
                  tooltips: {
                    mode: "index",
                    intersect: false
                  },
                  legend: {
                    labels: {
                      fontColor: "white"
                    }
                  },
                  scales: {
                    yAxes: [
                      {
                        gridLines: {
                          display: true,
                          color: "#707073"
                        },
                        position: "right",
                        ticks: {
                          fontColor: "white"
                        }
                      }
                    ],
                    xAxes: [
                      {
                        ticks: {
                          fontColor: "white",
                          maxTicksLimit: 8
                        }
                      }
                    ]
                  },
                  maintainAspectRatio: false
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Chart;
