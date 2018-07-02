import React, {Component} from 'react';
import { TextField } from '@material-ui/core';


class ResetPassword extends Component{

render(){
    return (
    <div className="reset-password">
    <h1>Reset Password</h1>
    <div className="reset-form">
    <p>Enter your email address below to reset your password</p>
    <TextField label="Email" name="email" />
        <TextField label="" />
        <button type="submit" >Submit </button> 
    </div>
</div>
    )
}
}

export default ResetPassword;