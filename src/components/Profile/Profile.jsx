import React, { Component } from 'react';

class Profile extends Component{
    // constructor(props){
    //     super(props);
    //         this.state = {

    //             email: "",

    //         }
    //     }
    
    render(){
        return(
            <div className="user-profile" border="black">
            <p>Username: </p>
            <p>Email: </p>
            <p>Your Portfolio (List)</p>
            <p>Your Portfolio (Chart of total balance)</p>
            </div>
        )

    }
}

export default Profile;