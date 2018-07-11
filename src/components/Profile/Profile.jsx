import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Bar, Line, Pie, Area } from "react-chartjs-2";
import PieChart from '../PieChart/PieChart.jsx';
import Divider from '@material-ui/core/Divider';

import "./Profile.css";
import UserSettings from "../UserSettings/UserSettings.jsx";

const styles = theme => ({
  title: {
    color: 'white',
    textAlign: 'center'
  },
  card2: {
    maxWidth: '100%',
  },
  cardTop: {
    padding: '4px 2px 4px 48px',
    background: '#273954',
    textAlign: 'center',
    color: 'white'
  },


  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media2: {
    maxHeight: 20,
  },
  tab:{
    textAlign: 'center',
    width: '100%'

  },
  tablevalue: {
    padding: '4px 2px 4px 48px',
    textAlign: 'right'
  },
  tablevalue: {
    textAlign: 'right'
  },
  wallet:{
    textAlign: 'center',
    background: '#1C2C43',
    color:'white'
  }
});

const styles1 = theme => ({
  root: {
    padding: 40,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      amount: 0,
      eachCoin: {},
      transactions:
        [
        ],
      data: {
        labels: [],
        datasets: [
          {
            label: " ",
            data: [],
          }
        ]
      },
    };
  }
  //GET USERS BALANCE FROM THE BLOCKCHAIN
  //GET USER OWNED COINS FROM BLOCKCHAIN
  _getBalance = () => {
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const transData = []
        const allTransactions = data.message.totalTransactions
        allTransactions.forEach(x => {
          transData.push(x)
        })
        this.setState({
          amount: data.message.amountTotal.RST.toLocaleString(),
          transactions: transData,
          eachCoin: data.message.amountTotal
        });
      });
  };

  //FETCH for User details(name, wallet amount, transaction details
  _getUserDetails = () => {
    fetch("/api/users/userprofile", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res.redirect === true) {
          window.location.replace(res.url);
        } else {
          let data = res.message[0];
          this.setState({
            email: data.email,
            last_name: data.last_name,
            first_name: data.first_name,
            phone: data.phone
          });
        }
      });
  };
  componentDidMount() {
    this._getBalance();
    this._getUserDetails();
  }
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className="user-dashboard"  >
        <Grid container spacing={0}>
        <br />
        <br />
          <Grid item xs={4} style={{ paddingLeft: '1%', paddingTop: '1.3%' }} >
            <Paper className={classes.paper} settings={{ padding: '4%' }}>
              <Card className={classes.card} >
                <CardMedia>
                  <PieChart />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="p"><h3>User: {this.state.first_name} {this.state.last_name}</h3></Typography>
                  <Typography component="p"><h3> Wallet Balance: {this.state.amount} RST</h3></Typography>
                </CardContent>
              </Card>
            </Paper>
            <br />
            <Paper className={classes.paper} settings={{ padding: '4%' }}>
              <UserSettings />
            </Paper>
          </Grid>
          <Grid item xs={8} style={{ paddingLeft: '1%', paddingRight: '1%', paddingTop: '1.3%' }}>
            <Paper className={classes.paper}>
              <Card className={classes.card2}
              width='100%'>
                <CardHeader 
                title='Balance'
                  classes={{ 
                    title: classes.title
                   }}
                  style={{ background: '#273954' }}
                >
                  <Typography className={classes.cardTop} gutterBottom variant="headline" component="h2"> Transactions </Typography>
                </CardHeader>
                <CardContent>
                  <Typography component="p">
                    <Table 
                    className={classes.tab}
                    style={{width:"100%"}}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tablevalue}>From</TableCell>
                          <TableCell className={classes.tablevalue}>To</TableCell>
                          <TableCell className={classes.tablevalue}>Date Received</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.transactions.map(x => {
                          const newFrom = []
                          const theTime = new Date(x.date).toLocaleString();
                          if (x.coin_value_from === null || x.coin_id_from === null) {
                            newFrom.push('System')
                            newFrom.push(0)
                          } else {
                            newFrom.push(x.coin_id_from)
                            newFrom.push(x.coin_value_from.toLocaleString())
                          }
                          return (
                            <TableRow>
                              <TableCell className={classes.tablevalue}>{newFrom[1]}{' ' + newFrom[0]}</TableCell>
                              <TableCell className={classes.tablevalue}>{x.coin_value_to.toLocaleString()}{' ' + x.coin_id_to.toLocaleString()}</TableCell>
                              <TableCell className={classes.tablevalue}>  {theTime}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Typography>
                </CardContent>
              </Card>
              <Card>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);




