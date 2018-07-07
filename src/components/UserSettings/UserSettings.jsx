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

    onChangeEmail = e => {
        this.setState({ email: e.target.value });
    };

    onPhoneChange = e => {
        this.setState({ phone: e.target.value });
    };

    onSubmitPhone = e => {
        e.preventDefault();
        fetch("/api/users/changePhone", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(response => {
            });
    };
    // onSubmit
    onSubmitEmail = e => {
        e.preventDefault();
        fetch("/api/users/changeEmail", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(response => {
            });
    };

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
            });
    };

    onSubmitPhone = e => {
        e.preventDefault();
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
            })
    }

    onSubmitEmail = e => {
        e.preventDefault();
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
            })
    }


    onSubmitPassword = e => {
        e.preventDefault();
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
            <div className="user-settings">
                <form id="update-email" onSubmit={this.onSubmitEmail}>
                    <label> Update Email Address </label>
                    <input
                        type="text"
                        label="email"
                        onChange={this.onChangeEmail}
                        defaultValue={this.state.email} />
                    <button>Save</button>
                </form>
                <br />
                <hr />
                <form className="phone-number" onSubmit={this.onSubmitPhone}>
                    <label> Update Phone Number</label>
                    <input
                        type="text"
                        label="email"
                        onChange={this.onPhoneChange}
                        defaultValue={this.state.phone} />
                    <button>Save</button>
                </form>
                <br />
                <hr />

                <form className="password-change" onSubmit={this.onSubmitPassword}>
                    <label> Current Password </label>
                    <input type="password" required name="current_pwd" onChange={this.onMatchPassword} defaultValue={this.state.password} />
                    <br />
                    <label> New Password </label>
                    <input type="password" onChange={this.onChangePassword} required name="new_pwd" />
                    <label> Confirm Password </label>
                    <input type="password" onChange={this.onChangePassword} name="rep_pwd" />
                    <button type="Submit"> Change Password </button>
                </form>
                <br />
            </div>
        );
    }
}
export default UserSettings;