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
      "https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=50&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        console.log("Original Format", result);
        var coins = Object.values(result.data);
        this.setState({ coins: coins });
        // console.log("Here's the array", coins);
      });
  }
  render() {
    const { classes } = this.props;
    console.log('this.state.coins',this.state.coins)
    const { anchorEl } = this.state;
    return (
      <div className="Crypto-Ticker">
        <Grid container spacing={4}>
          <Grid item xs={8} style={{ paddingTop: '.5%', paddingLeft: '4%' }} >
            <Paper settings={{ padding: '2%' }}>

              <h1 style={{ padding: '2em' }}> Top 100 Cryptocurrencies </h1>
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
                          <br/>
                          {coin.symbol}</TableCell>
                        <TableCell className={classes.maintable}>{coin.name}</TableCell> 
                        <TableCell className={classes.maintable}>{'$' + Math.round(coin.quotes.USD.price * 100) / 100} </TableCell>
                        <TableCell className={classes.maintable}>
                        { (coin.quotes.USD.percent_change_24h > 0) ? 
                            <font color="#3c8229"> {coin.quotes.USD.percent_change_24h + '%'}</font> :
                            <font color="red"> {coin.quotes.USD.percent_change_24h + '%'} </font> }
                        </TableCell>
                        <TableCell className={classes.maintable}><img class="sparkline" alt="sparkline" src={'https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/' + coin.id + '.png'}/></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

        <Grid item xs={4} style={{ paddingTop: '.5%', paddingLeft: '1%', paddingRight: '4%' }} >
          <Paper settings={{ padding: '4%' }}>
            <CryptoNews />
          </Paper>
        </Grid>

                <Grid item xs={4} style={{ paddingTop: '.5%', paddingLeft: '1%', paddingRight: '4%' }} >
          <Paper settings={{ padding: '4%' }}>
            <p> Here </p>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
</p>
          </Paper>
        </Grid>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(Crypto);
