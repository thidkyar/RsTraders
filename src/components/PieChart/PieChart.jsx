import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
    }
  }
}

  setChartData = () => {
    const coinN = [];
        const coinAmount = []
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const returnedObj = data.message.amountTotal;
        const coinName = Object.keys(data.message.amountTotal).slice(1);
        const coinTotal = Object.values(data.message.amountTotal).slice(1);
        // console.log("COIN NAMES" + Object.keys(data.message.amountTotal) + "\n" + "SLICED COIN NAMES " + Object.keys(data.message.amountTotal).slice(1))

        
coinName.forEach(x => {
  coinN.push(x);
})
coinTotal.forEach(x =>{
  coinAmount.push(x);
})
// coinName.forEach(x =>{
//   coinTotal.push(x);
// })

this.setState({
  data: {
    labels: coinN,
    datasets: [{
      data: coinAmount,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  }
})
});
        
  }
  componentDidMount() {
    this.setChartData();
  }
  render() {
    return (
      <div>
        <Doughnut
          data={this.state.data}
        />
      </div>
    );
  }
}

export default PieChart;
