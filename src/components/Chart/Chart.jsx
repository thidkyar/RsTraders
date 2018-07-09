//React components
import React, { Component } from "react";
// import CoinmarketAPI from "../CoinmarketAPI/CoinmarketAPI.jsx"
//Chartjs Components
import { Bar, Line, Pie, Area } from "react-chartjs-2";
import "./Chart.css";

//Material UI Components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Draggable from "react-draggable";

const styles = {
  card: {
    maxWidth: "100%",
    margin: "0 auto",
    float: "none",
    marginBbottom: "10px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  chart: {
    // padding: 0
  },
  buySellButton: {
    float: "right"
  },
  contractInput: {
    width: "15%"
  },
  sellorbuy: {
    marginRight: "-138px"
  },
  allChartsGrid: {
    maxWidth: "95%",
    marginLeft: "34px",
    marginTop: "30px"
  }
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userBalance: 0,
      numberOfContracts: 0,
      coinCodes: [],
      allCoins: {},
      url: `https://min-api.cryptocompare.com/data/histominute?fsym=${
        this.props.coinCode
      }&tsym=USD&limit=100`,
      // theTime: new Date(time * 1000).toLocaleTimeString(),
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

  componentDidMount() {
    this._getBalance();
    this._setLabelDatafromAPI();
  }
  componentWillMount() {
    // this._setChartState();
    clearInterval(this.puller);
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
        this.setState(
          { coinCodes: coinCodes, url: this.state.url },
          this._setChartState
        );
        this.puller = setTimeout(this._setLabelDatafromAPI, 60 * 1000);
      });
  };

  //set chart state from API call for coinCode passed from Charts component as prop
  _setChartState(arg) {
    const { coinCode } = this.props;
    const url = this.state.url;
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
          const theTime = new Date(time * 1000).toLocaleDateString();
          //convert epoch time to readable time
          //   if (arg === 'date'){
          //   const theTime = new Date(time * 1000).toLocaleDateString();
          //   timeData.push(theTime);
          // } else {
          //   const theTime = new Date(time * 1000).toLocaleTimeString();
          //   timeData.push(theTime);
          //   }
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
                fill: false,
                hidden: true
              },
              {
                ...this.state.data.datasets,
                data: costLowData,
                label: "Low",
                borderColor: "#308D8C",
                lineTension: 0,
                fill: false,
                hidden: true
              }
            ]
          }
        });
      });
  }

  //event handler to create sell transaction in blockchain
  _onBuyButtonClick = e => {
    const numberOfContracts = this.state.numberOfContracts;
    const marketValue = this.state.data.datasets[0].data.slice(-1)[0];
    // const lastItem = marketValue.slice(-1)[0]
    if (
      this.state.userBalance > marketValue * numberOfContracts &&
      numberOfContracts >= 0
    ) {
      const userData = {
        coin_id_from: "RST", //USD
        coin_value_from: marketValue * this.state.numberOfContracts, //USD - $10
        coin_id_to: this.props.coinCode, //RST
        coin_value_to: parseFloat(this.state.numberOfContracts), //RST- get market rate - *1,000
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
      const ableToBuy =
        this.state.userBalance / this.state.data.datasets[0].data.slice(-1)[0];
      alert(
        `Invalid amount, You can only buy ${ableToBuy} ${this.props.coinCode}`
      );
    }
  };

  //event handler to create sell transaction in blockchain
  _onSellButtonClick = e => {
    const marketValue = this.state.data.datasets[0].data.slice(-1)[0];
    const currentCoin = this.props.coinCode;
    const sellamount = marketValue * this.state.numberOfContracts;
    console.log(marketValue);
    console.log(this.state.allCoins);
    console.log("log this", this.state.allCoins[currentCoin]);
    if (
      this.state.allCoins[currentCoin] &&
      this.state.allCoins[currentCoin] - sellamount >= 0 &&
      this.state.numberOfContracts >= 0
    ) {
      const userData = {
        coin_id_from: this.props.coinCode, //USD
        coin_value_from: parseFloat(this.state.numberOfContracts), //USD - $10
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
        .then(response => {});
    } else {
      alert("invalid input");
    }
  };

  //get balance of user from blockchain
  _getBalance = () => {
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          userBalance: data.message.amountTotal.RST,
          allCoins: data.message.amountTotal
        });
        this.puller = setTimeout(this._getBalance, 5 * 1000);
      });
  };

  _getNumberOfContracts = e => {
    this.setState({ numberOfContracts: e.target.value });
  };

  renderObject = () => {
    const items = [];
    for (let key in this.state.allCoins) {
      if (this.state.allCoins.hasOwnProperty(key)) {
        items.push(
          <p key={key}>
            {key}: {this.state.allCoins[key]}
          </p>
        );
      }
    }

    return items;
  };

  _minButtonClick = e => {
    const { coinCode } = this.props;
    const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${coinCode}&tsym=USD&limit=100`;
    this.setState({ url: url });
    this._setChartState("time");
  };

  _hourButtonClick = e => {
    const { coinCode } = this.props;
    const url = `https://min-api.cryptocompare.com/data/histohour?fsym=${coinCode}&tsym=USD&limit=100`;
    this.setState({ url: url });
    this._setChartState("time");
  };

  _dayButtonClick = e => {
    const { coinCode } = this.props;
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coinCode}&tsym=USD&limit=100`;
    this.setState({ url: url });
    this._setChartState("date");
  };
  render() {
    const { classes } = this.props;
    console.log("this", this.state.numberOfContracts);
    const balance = this.state.userBalance.toLocaleString();
    return (
      <div>
        <div className={classes.allChartsGrid}>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              <Card>
                <CardContent>
                  <Typography>
                    {/* <CoinmarketAPI /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Card className={classes.card}>
                <CardContent className={classes.chart}>
                  <div className="chart" draggable="true">
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
                    {/* </Paper> */}
                    <button onClick={this._minButtonClick}>min</button>
                    <button onClick={this._hourButtonClick}>hour</button>
                    <button onClick={this._dayButtonClick}>day</button>
                    <div className={classes.buySellButton}>
                      <CardActions className={classes.sellorbuy}>
                        <TextField
                          className={classes.contractInput}
                          onChange={this._getNumberOfContracts}
                          // label="Number"
                        >
                          {" "}
                        </TextField>
                        <Button
                          onClick={this._onBuyButtonClick}
                          variant="contained"
                          color="primary"
                        >
                          Buy
                        </Button>
                        {/* </div> */}
                        <br />
                        <Button
                          onClick={this._onSellButtonClick}
                          variant="contained"
                          color="primary"
                        >
                          Sell
                        </Button>
                      </CardActions>
                    </div>
                  </div>
                  <Typography gutterBottom variant="headline" component="h2">
                    {this.props.coinCode}
                  </Typography>

                  <Typography component="p" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chart);
