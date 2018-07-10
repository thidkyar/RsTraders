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
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import "./Profile.css";
import UserSettings from "../UserSettings/UserSettings.jsx";

const styles = theme =>({
  title:{
    color:'white',
  },
  card2: {
    maxWidth: 1000,
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
  tablevalue: {
    padding: '4px 2px 4px 48px',
    textAlign: 'right'
  },
  tablevalue: {
    textAlign: 'right'
  }
});

const styles1 = theme => ({
  root: {
    padding:40,
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
      transactions:
        [
        ]
    };
  }

  //GET USERS BALANCE FROM THE BLOCKCHAIN
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
        console.log('yoo', transData)
        this.setState({
          amount: data.message.amountTotal.RST.toLocaleString(),
          transactions: transData
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
            <Grid container spacing={8}>
            <Grid item xs={4} style={{ padding: '4%'}} >
          <Paper className={classes.paper} settings={{ padding: '4%'}}>
{/*           
        <Grid item xs>
        <Paper className={classes.paper}> */}

        {/* <br /> */}
        <Card className={classes.card} >
          <CardMedia
            className={classes.media}
            image="https://media.brstatic.com/2016/11/02103232/highest-grossing-actresses-5-cate-blanchett.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              User: {this.state.first_name} {this.state.last_name}
            </Typography>
            <Typography component="p">
              Wallet: {this.state.amount} RST
  
          </Typography>
          </CardContent>
        </Card>
        </Paper>
        <br />
        <Paper className={classes.paper} settings={{ padding: '4%'}}>
        <UserSettings />
        </Paper>
        </Grid>


            <Grid item xs={8} style={{ padding: '4%'}}>
          <Paper className={classes.paper}>
        <Card className={classes.card2}>
        {/* <CardMedia className={classes.cardTop}> */}
            <CardHeader title='Balance'
            classes={{title: classes.title}} 
            style={{background:'#273954'}}
            // className={classes.cardTop}
            >
            <Typography className={classes.cardTop} gutterBottom variant="headline" component="h2"> Transactions </Typography>
            </CardHeader>
            {/* </CardMedia> */}
              <CardContent>
              <Typography component="p">
                  <Table>
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
                          <TableCell className={classes.tablevalue}>{newFrom[1]}{' '+newFrom[0]}</TableCell>
                          <TableCell className={classes.tablevalue}>{x.coin_value_to.toLocaleString()}{' '+x.coin_id_to.toLocaleString()}</TableCell>
                        <TableCell className={classes.tablevalue}>  {theTime}</TableCell>
                      </TableRow>
                )
              })}
                   </TableBody>
                  </Table>   
          
          </Typography>
          </CardContent>
        </Card> 
        </Paper>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);




