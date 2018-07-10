import React, { Component } from "react";

//Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

//PROJECT FILES
import CryptoNews from "../CryptoNews/CryptoNews.jsx";
import "./Crypto.css";
import { Typography } from "@material-ui/core";


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow: 1,
  },
  table: {
    minWidth: 100,
  },
  maintable: {
    padding: '4px 4px 4px 42px',
    textAlign: 'center'
  },
  logosprite: {
    height: '16',
    width: '16'
  }
});

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      anchorEl: null
    };
  }

  //MenuItem handlers
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  componentDidMount() {
    //API to GET all cryptocurrency tickers
    const url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=100&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        console.log("Original Format", result);
        var coins = Object.values(result.data);
        this.setState({ coins: coins });
      });
  }
  render() {
    const { classes } = this.props;
    console.log('this.state.coins', this.state.coins)
    const { anchorEl } = this.state;
    return (
      <div className="Crypto-Ticker" >
        <Grid container style={{paddingLeft: '5px' }}>
          <Grid item xs={8} style={{paddingLeft: '1%' }}>
            <Paper settings={{
              overflowX: 'auto'
            }}>
      {/* <Typography style={{ color: 'white', background: 'rgb(39, 57, 84)' }} variant="display2" gutterBottom >Top 100 Cryptocurrencies </Typography> */}
              <h1 style={{ 
                padding: '.5em', 
                background: '#4C5B74',
                // background:'rgb(39, 57, 84)',
                color: 'white'}}> Top 100 Cryptocurrencies </h1>
              <Divider light />
              <Table className={classes.maintable}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.maintable} width='1%'>Rank</TableCell>
                    <TableCell className={classes.maintable} width='1%'>Symbol</TableCell>
                    <TableCell className={classes.maintable} width='10%'>Name</TableCell>
                    <TableCell className={classes.maintable} width='10%'>Price</TableCell>
                    <TableCell className={classes.maintable} width='10%'>Change (24h)</TableCell>
                    <TableCell className={classes.maintable} width='15%'>Price Graph (7d)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.coins.map((coin, c) => {
                    return (
                      <TableRow key={c}>
                        <TableCell className={classes.maintable}>{coin.rank}</TableCell>
                        <TableCell className={classes.maintable}>
                          <img src={'https://s2.coinmarketcap.com/static/img/coins/16x16/' + coin.id + '.png'} />
                          <br />
                          {coin.symbol}</TableCell>
                        <TableCell className={classes.maintable}>{coin.name}</TableCell>
                        <TableCell className={classes.maintable}>{'$' + Math.round(coin.quotes.USD.price * 100) / 100} </TableCell>
                        <TableCell className={classes.maintable}>
                          {(coin.quotes.USD.percent_change_24h > 0) ?
                            <font color="#3c8229"> {coin.quotes.USD.percent_change_24h + '%'}</font> :
                            <font color="red"> {coin.quotes.USD.percent_change_24h + '%'} </font>}
                        </TableCell>
                        <TableCell className={classes.maintable}><img class="sparkline" alt="sparkline" src={'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/' + coin.id + '.png'} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: '1.3%', paddingLeft: '1%', paddingRight: '1%' }} >
            <Paper settings={{ padding: '2%' }}>
              <CryptoNews />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Crypto);
