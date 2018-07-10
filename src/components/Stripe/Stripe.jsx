import React, { Component } from "react";

//import components
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';

// import './stripe.css';

const theme = createMuiTheme({
  // palette: {
  //   primary: 'blue',
  // },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'blue',
      },
    },
  }
});

const styles = {

  stripeBox: {
    height: '14em',
    textAlign: 'center'
  },

  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'blue',
      },
    },
  }

};

class Stripe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      inputAmount: 0,
    };
  }
  componentDidMount() {
    this._getBalance();
  }

  onToken = token => {
    console.log('THIS', this.state.amount)
    console.log('THAT', this.state.inputAmount)
    let inputAmount = (this.state.inputAmount)/100
    if (token.id) {
      this.setState({amount: this.state.amount + (inputAmount*1000)})
      this._sendUserBalanceToBlockChain()
    }
  };

  _sendUserBalanceToBlockChain = () => {
    console.log('TRIGGERED')
    const amount = (this.state.inputAmount)/100
    const userData = {
      coin_id_from: null, //USD
      coin_value_from: null, //USD - $10
      coin_id_to: "RST", //RST
      coin_value_to: amount * 1000, //RST- get market rate - *1,000
      date: Date.now() //
    };

    fetch("/api/blockchain/transaction", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(result => {

    })
  };

  _getBalance = () => {
    fetch("/api/blockchain/balance", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.message.amountTotal.RST)
        this.setState({ amount: data.message.amountTotal.RST });
      });
  };



  //listen for change in form
  _onChange = e => {
    let amount = (e.target.value)*100
    console.log(e.target.value)
    this.setState({inputAmount: amount})
  }
  // ...

  render() {
    const { classes } = this.props;
    const amount = (this.state.amount).toLocaleString()
    console.log('thisone', this.state.amount)
    return (
      <div className={classes.stripeBox}>
      <h3>Your Current Balance RST:{amount}</h3>
      <p>$1 USD = 1000 RST</p>
      <TextField
              onChange={this._onChange}
              label="Amount"
              name="amount"
              required
            />
            <br/>
        <StripeCheckout
          token={this.onToken}
          amount={this.state.inputAmount}
          stripeKey="pk_test_NVd8TEc4qgjRVVYTUiyMQx6c"
        ><br/>
          <Button 
              variant="outlined"
              type="Submit"
              color="primary"
          >Buy Coins</Button>
        </StripeCheckout>
      </div>
    );
  }
}

export default withStyles(styles)(Stripe);