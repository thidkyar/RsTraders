import React, { Component } from 'react';

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            amount: 0
    }
    }

//sets the state of the email
onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
}

//sets the state of the email
onChangePassword = (e) => {
    this.setState({ password: e.target.value })
}

//Handles setting the new password
onSetPassword = (e) => {
}
// //Handles the matching of the new password
// onConfirmPassword = (e) => {
//     this.setState({password: e.t})
// }



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
                if(response.error){
console.log(response.message);
                }else{
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
            <div className="user-settings">
                <form className="password-change" onSubmit={this.onSubmitPassword}>
                    <label> Current Password </label>
                    <input type="text" required name="current_pwd" onChange={this.onMatchPassword} defaultValue={this.state.password} />
                    <br /> 
                    <label> New Password </label>
                    <input type="text" onChange={this.onChangePassword} required name="new_pwd" /> 

                    <label> Confirm Password </label>
                    <input type="text" onChange={this.onChangePassword}  name="rep_pwd" />
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
    );
}
}
export default UserSettings;