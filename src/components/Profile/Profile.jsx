import React, { Component } from 'react';

class Profile extends Component{
    constructor(props){
        super(props);
            this.state = {
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
            }
        }
        onChange(){
            console.log("DATA IS HERE");
        }
        // getProfile = () => {
            componentWillMount(){
             fetch("/api/users/userprofile", {
                 method: "GET",
                credentials: "include"
                // body: JSON.stringify({hi: "Yoooooooo"})
              })
              .then(res => res.json())
              .then(res => {
                  let data = res.message[0];
                this.setState({
                    email: data.email, last_name: data.last_name, first_name: data.first_name, phone: data.phone})
              })
}
    render(){
        return(
            //delete favourites / display total 
            <div className="user-dashboard">
            <div className="user-profile">
            <p>Name: </p> <label id="lName" />
            <p>Email: </p><label id="lemail" />
            <p>Your Portfolio (List)</p>
            <p>Your Portfolio (Chart of total balance)</p>
            </div>
            <hr />
            <div className="user-settings">
            <label> Change Password </label>
            {/* <input type="text" label="password" value="{this.state.password}"/>
            <button>Save</button> */}
            <br />
            <label> Update Email Address </label>
            <input type="text" label="email" onChange = {this.onChange} value={this.state.email}/>
            <button>Save</button>
            <br />
            <hr />
            <label> Update Phone Number</label>
            <input type="text" label="email" onChange = {this.onChange} value={this.state.phone}/>
            <button>Save</button>
            <br />
            <label> Delete Favourites </label>
            <br />
            <label> list all transactions </label>
            <br />
            <hr />
            <label> Display Profile Picture</label>
            </div>
            </div>
        )

    }
}

export default Profile;