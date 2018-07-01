import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { Bar, Line, Pie, Area } from "react-chartjs-2";
class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartdData: {
        labels: ['Hi', 'Worcester', 'This', 'That', 'YOOOO', 'YEEEE'],
        datasets:[
          {
            label:'population',
            data:[
              134134,
              234324,
              454334,
              234245,
              865433,
              23454
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6',
              'rgba(52, 164, 232, 0.6'
            ]
          }
        ]
      }
    }
  }
  render() {
    return (
      <div className="chart">
      <h1>CHART</h1>
        <Bar
          data={this.state.chartData}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default Chart;
