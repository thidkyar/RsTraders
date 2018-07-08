import React, { Component } from 'react';
import './Crypto.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
});


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
      <br />
        <Table style={{ width: '70%' }} >
        <TableHead>

        <TableRow>
        <Typography gutterBottom component="h1" variant="headline">Top 100 Cryptocurrencies
            </Typography>
        </TableRow>
              <TableRow>
              <TableCell style={{ width: '5%' }}>Rank</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.coins.map((coin, c) => {
              return (
                <TableRow key={c}>
                  <TableCell>{coin.rank}</TableCell>
                  <TableCell>{coin.symbol}</TableCell>
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>$ {Math.round((coin.quotes.CAD.price) * 100) / 100}</TableCell>
                  <TableCell style={{ color: 'green' }}>{coin.quotes.CAD.percent_change_24h} %</TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>


        {/* <h1>         Top 100 Cryptocurrencies </h1>
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
        </table> */}
      </div>
    )
  }
}


export default Crypto;