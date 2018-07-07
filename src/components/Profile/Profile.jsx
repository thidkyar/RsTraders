import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            amount: 0,
            transactions: {
                details: []
            }
        };
    }

    //sets the state of the email
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    //sets the state of the email
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    //Handles the event of the change of phone number
    onChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    }

    //GET USERS BALANCE FROM THE BLOCKCHAIN
    _getBalance = () => {
        fetch("/api/blockchain/balance", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    amount: data.message.amountTotal.RST,
                    coin_from: data.message.totalTransactions[0].coin_id_from,
                    coin_to:data.message.totalTransactions[0].coin_id_to,
                    coin_value_from: data.message.totalTransactions[0].coin_value_from,
                    coin_value_to: data.message.totalTransactions[0].coin_value_to
                });

console.log("Here's data.message", data.message);

console.log("Here's the transaction for coin id from", data.message.totalTransactions[0].coin_id_to);

console.log("Here's the value of the amount",data.message.amountTotal.RST);
            });
    };

    //Handles event of Submit Button
    // onSubmit
    onSubmitPhone = e => {
        e.preventDefault();
        console.log("***EVENT***", e);
        const { phone } = this.state;

        fetch("/api/users/changePhone", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(response => {
                console.log("Phone Response", response);
            })
    }

    //Handles event of Submit Button
    // onSubmit
    onSubmitEmail = e => {
        e.preventDefault();
        console.log("***EVENT***", e);
        const { email } = this.state;

        fetch("/api/users/changeEmail", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(response => {
                console.log("Email Response", response);
            })
    }

    onSubmitPassword = e => {
        e.preventDefault();
        console.log("***PASSWORD EVENT***", e.target.elements.current_pwd.value);
        const { password } = this.state;
        fetch("/api/users/changePassword",
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        current_pwd: e.target.elements.current_pwd.value,
                        new_pwd: e.target.elements.new_pwd.value,
                        rep_pwd: e.target.elements.rep_pwd.value
                    }
                )
            })
            .then(result => result.json())
            .then(response => {
                if (response.error) {
                    console.log(response.message);
                } else {
                }
            })
    }

    componentDidMount() {

        //FETCH DETAILS FOR USER DETAILS
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
                        email: data.email, last_name: data.last_name, first_name: data.first_name, phone: data.phone
                    })
                }
                this._getBalance();
            })


    }
    render() {
        return (
            <div className="user-dashboard">
                <div className="user-profile">
                    <h1> Display Profile Picture</h1>

                    <h2>First Name: </h2>
                    <label id="fName" onChange={this.onChange}> {this.state.first_name}</label>
                    <h2> Last Name: </h2>{this.state.last_name}
                    <hr />
                    <p>Coins:  {this.state.amount}</p>
                    {/* <label id="totalBalance" onChange={this.onChange}> {this.state.amount}</label> */}
                    <p>Your Portfolio (List all Transactions)</p>
                    <p> From:{this.state.transactions.coin_value_from}
                        To: {this.state.transactions.coin_id_from}
                        Value: {this.state.transactions.coin_id_to}
                        Date: {this.state.transactions.coin_value_to}
                    </p>
                    }
                    <hr />
                    <p>Your Portfolio (Chart of total balance)</p>
                </div>
                <hr />
            </div>
        );
    }
}

export default Profile;