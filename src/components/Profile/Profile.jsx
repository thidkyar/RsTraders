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
            amount: 0
        };
    }

    //Handles the event of the change in state of email 
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    //Handles the even of the change of password
    onChangePassword = (e) => {
    }

    //Handles the event of the change of phone number
    onChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    }

    getTransactions = () => {
        fetch("api/balance", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
            })
    }

    //GET USERS BALANCE FROM THE BLOCKCHAIN
    _getBalance = () => {
        fetch("/api/blockchain/balance", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ amount: data.message.amountTotal.RST });
                console.log("Here's the value of the amount", data.message.amountTotal.RST);
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
        console.log("***Password EVENT***", e);
        const { password } = this.state;

        fetch("/api/users/changePassword", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(response => {
                console.log("Password Response", response);
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
                    <p>Total Balance</p> {this.state.amount}
                    {/* <label id="totalBalance" onChange={this.onChange}> {this.state.amount}</label> */}
                    <p>Your Portfolio (List all Transactions)</p>
                    <p>Your Portfolio (Chart of total balance)</p>
                </div>
                <hr />
                <form id="update-email" onSubmit={this.onSubmitEmail}>
                    <label> Update Email Address </label>
                    <input type="text" label="email" onChange={this.onChangeEmail} defaultValue={this.state.email} />
                    <button>Save</button>
                </form>
                <br />
                <hr />
                <form className="phone-number" onSubmit={this.onSubmitPhone}>
                    <label> Update Phone Number</label>
                    <input type="text" label="email" onChange={this.onPhoneChange} defaultValue={this.state.phone} />
                    <button>Save</button>
                </form>
                <br />
                <hr />
                <div className="user-settings">
                    <form className="password-change" onSubmit={this.onSubmitPassword}>
                        <label> Current Password </label>
                        <input type="password" required onChange={this.onChangePassword} defaultValue={this.state.password} />
                        <br />
                        <label> New Password </label>
                        <input type="password" onChange={this.onChangePassword} required id="newpswd" />
                        <input type="text" label="email" onChange={this.onChangeEmail} defaultValue={this.state.email} />


                        <label> Confirm Password </label>
                        <input type="password" onChange={this.onChangePassword} required id="repswd" required />
                        <button type="Submit"> Change Password </button>
                    </form>
                    <br />
                    <hr />

                    <h1> Favourites </h1>
                    {this.state.favourites}
                    <label> Delete Favourites </label>
                    <br />
                    <br />
                    <hr />
                </div>
            </div>
        );
    }
}

export default Profile;