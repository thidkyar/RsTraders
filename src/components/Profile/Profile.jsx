import React, { Component } from "react";

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
          amount: data.message.amountTotal.RST,
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
    console.log("Here's the value of the amount", this.state.transactions);
    return (
      <div className="user-dashboard">
        <div className="user-profile">
          <h1> Display Profile Picture</h1>
          <h2>First Name: </h2>
          <label id="fName" onChange={this.onChange}>
            <br />
            {this.state.first_name}
          </label>
          <h2> Last Name: </h2>
          {this.state.last_name}
          <hr />
          <p>Wallet: </p>{this.state.amount}
          <hr />
          <p>Your Portfolio (List all Transactions)</p>
          {this.state.transactions.map(x => {
            const newFrom = []
            const theTime = new Date(x.date).toLocaleString();
            if (x.coin_value_from === null || x.coin_id_from === null) {
              newFrom.push('System')
              newFrom.push(0)
            } else {
              newFrom.push(x.coin_id_from)
              newFrom.push(x.coin_value_from)
            }
            return (
              <div>
                <p> Id_from: {newFrom[0]} </p>
                <p> value_from: {newFrom[1]} </p>
                <p> id_to: {x.coin_id_to} </p>
                <p> value_to: {x.coin_value_to} </p>
                <p> Date: {theTime} </p>
              </div>
            )
          })}
        </div>
        <hr />
      </div>
    );
  }
}

export default Profile;
