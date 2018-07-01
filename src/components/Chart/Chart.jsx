import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Bar, Line, Pie, Area } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
            data: [],
          }, {

          }
        ]
      },
      options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]         
        }
      }
    };
  }
  
  componentDidMount() {
    this._setLabelDatafromAPI();
  }

  _setLabelDatafromAPI = () => {
    const coinCode = "BTC";
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${coinCode}&tsym=CAD&limit=10`;

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
          const theTime = new Date(time*1000).toLocaleDateString()
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
                label: 'Close',
                borderColor: "#c45850",
                lineTension: 0,
                fill: false
              },
              {
                ...this.state.data.datasets,
                data: costHighData,
                label: 'High',
                borderColor: "#3e95cd",
                lineTension: 0,
                fill: false
              },{
                ...this.state.data.datasets,
                data: costLowData,
                label: 'Low',
                borderColor: "#3cba9f",
                lineTension: 0,
                fill: false
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'BitCoin'
            }
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
        <Grid item sm={2}>
          <Paper > 
          <h1>Bitcoin</h1>
          <Button variant="outlined" color="primary"> Buy </Button>
          <br/>
          <Button variant="outlined" color="primary"> Sell</Button>
          </Paper>
        </Grid>
        <Grid item sm={10}>
          <Paper ><Line
          data={this.state.data}
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false
          }}
        /></Paper>
        </Grid>
      </Grid>
        
      </div>
    );
  }
}

export default Chart;
