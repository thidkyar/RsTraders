import React, { Component } from 'react';


// //GET USERS BALANCE FROM THE BLOCKCHAIN
//     _getBalance = () => {
//         fetch("/api/blockchain/balance", {
//             credentials: "include"
//         })
//             .then(res => res.json())
//             .then(data => {
//                 // console.log(data.message.amountTotal.RST)
//                 this.setState({ amount: data.message.amountTotal.RST });
//             });
//     };

   


// onFavouriteHandler(){}
// favouritesHandler() {
//     fetch("/api/changePassword", {
//         method: "POST",
//         credentials: 'include',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(this.state)
//     })
//         .then(result => result.json())
//         .then(response => {
//             console.log("Password Response", response);
//         })
// }

//     phoneHandler() {
//         fetch("/api/users/changePhone", {
//             method: "POST",
//             credentials: 'include',
//             headers: {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify(this.state)
//         })
//             .then(result => result.json())
//             .then(response => {
//                 console.log("Phone Number Response: ", response);
//             })
//     }
// }
//***********CHANGE PASSWORD*****************/
// pswdHandler(){
//     fetch("/api/changePassword", {
//         method: "POST",
//         credentials: 'include',
//         headers: {
//             "Content-type": "application/json"
//         }
//         // body: JSON.stringify(this.state)
//     })
//         .then(result => result.json())
//         .then(response => {
//             console.log("Password Response", response);
//         })
// }
//******************END PASSWORD CHANGE****(*****/
// componentWillMount(){

//     fetch("/api/changePassword", {
//         method: "POST",
//         credentials: 'include',
//         headers:{
//             "Content-type": "application/json"
//         }
//         // body: JSON.stringify(this.state)
//     })
//     .then(result => result.json())
//     .then(response => {
//         console.log(response);
//     })

// // FETCH DETAILS FOR TRANSACTIONS
//               fetch("/api/favorites", {
//                 method: "GET",
//                credentials: "include"
//              })
//              .then(res => res.json())
//              .then(res => {

//  }
// )

// }
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

    onChangeEmail = (e) => {
        // console.log("DATA IS HERE", e.currentTarget.value);
        this.setState({ email: e.target.value });

    }
//handles phone number change
    onPhoneChange = (e) => {
this.setState({ phone: e.target.value});
    }

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


    componentDidMount() {
        // this._getBalance();

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
                    <p>Total Balance</p>
                    {/* <p>{_getBalance()}</p> */}
                    <p>Your Portfolio (List all Transactions)</p>
                    {/* <div _getBalance = {this.amount}></div> */}
                    <p>Your Portfolio (Chart of total balance)</p>
                </div>
                <hr />
                <div className="user-settings">
                    <form className="password-change" onSubmit={this.onSubmitPassword}>
                        <label> Current Password </label>
                        <input type="password" required defaultValue={this.state.password} />
                        <br />
                        <label> New Password </label>
                        <input type="password" required id="newpswd" />
                        <label> Confirm Password </label>
                        <input type="password" required id="repswd" required />
                        <button type="Submit"> Change Password </button>
                    </form>
                    <br />
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