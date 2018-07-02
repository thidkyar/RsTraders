import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Bar, Line, Pie, Area } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Chart.css";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this._setLabelDatafromAPI();
  }

  _setLabelDatafromAPI = () => {
    const coinCode = "BTC";
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coinCode}&tsym=CAD&limit=100`;

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
        console.log("before update", dataSetData);
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
  };

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
    return (
      <div className="chart">
        <Grid container spacing={0}>
          <Grid item xs={10} sm={2}>
            <Paper>
              <h1>Bitcoin</h1>
              <Button variant="contained" color="primary">
                {" "}
                Buy{" "}
              </Button>
              <br />
              <Button variant="contained" color="primary">
                {" "}
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
                    text: "BITCOIN"
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
                          color: '#707073'
                        },
                        position: "right",
                        ticks: {
                          fontColor: "white",
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
