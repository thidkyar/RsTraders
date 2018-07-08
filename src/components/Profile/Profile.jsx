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

const styles = {
  card: {
    maxWidth: 345,
  },
  card2: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media2: {
    maxHeight: 20,
  }
};

const styles1 = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     height: 430,
//     zIndex: 1,
//     overflow: 'hidden',
//     position: 'relative',
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawerPaper: {
//     position: 'relative',
//     width: drawerWidth,
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3,
//     minWidth: 0, // So the Typography noWrap works
//   },
//   toolbar: theme.mixins.toolbar,
// });


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
      <div className="user-dashboard">
        <br />
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="https://www.w3schools.com/bootstrap/img_avatar4.png"
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
          {/* <CardActions> */}
            {/* <Button size="small" color="primary">
              Share
          </Button>
            <Button size="small" color="primary">
              Learn More
          </Button> */}
          {/* </CardActions> */}
        </Card>
        <br />
        <br />




        <Card className={classes.card2}>
            <CardHeader style={{ background: 'green'}}>
            <Typography gutterBottom variant="headline" component="h2" style = {{ align:'center'}}> Transactions </Typography>
            </CardHeader>
              <CardContent>
                            <Typography component="p">

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

                  < div >
                                    <Table>
                    <TableRow>
                    <TableHead>From:</TableHead>
                      <TableCell>{newFrom[1]} {newFrom[0]}</TableCell>
                      </TableRow>
                      <TableRow>
                      <TableHead>To: </TableHead>
                      <TableCell>{x.coin_value_to.toLocaleString()} {x.coin_id_to.toLocaleString()} </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableHead>Date Received</TableHead>
                      <TableCell>{theTime}</TableCell>
                      </TableRow>

                    </Table>
                    <br />
                    <hr />
            </div>
            )
          })}
          </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small" color="primary">
              View More
          </Button>
          </CardActions> */}
        </Card>



      </div>
    );
  }
}

export default withStyles(styles)(Profile);




