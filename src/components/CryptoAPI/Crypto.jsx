import React, { Component } from "react";
import "./Crypto.css";

//Material UI Components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import CryptoNews from "../CryptoNews/CryptoNews.jsx";


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
      <div className="Crypto-Ticker" style={{ padding: 20 }}>
        <Grid container >
          <Grid item xs={8}>
            <Paper settings={{
              padding: '2%', overflowX: 'auto'
            }}>
              <h1 style={{ padding: '2em' }}> Top 100 Cryptocurrencies </h1>
              {/* <Table style={{
                minWidth: 700, overflowX: 'auto'
              }}> */}
                {/* <Paper> */}
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
            <Grid item xs={4} style={{ paddingTop: '1.3%', paddingLeft: '1%', paddingRight: '4%' }} >
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
