import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./UserSettings.css";

const styles = theme => ({
    root: {
        height: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: 'white'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        color: 'white'
    },
    top: {
        background: '#273954',
        color: 'white',
        backgroudcolor: 'white'
    },
    icon: { color: 'white' }
});


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
                    (e.target.elements.current_pwd.value).empty();
                    (e.target.elements.new_pwd.value).empty();
                    (e.target.elements.rep_pwd.value).empty();

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
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div id="set" className="user-settings">
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary style={{color:'white'}}expandIcon={<ExpandMoreIcon className={classes.icon}/>} className={classes.top} >
                            {/* <Typography variant="title" className={classes.heading}>Change Email Address</Typography> */}
                            <Typography className={classes.secondaryHeading}> Update your email address</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <form id="update-email" onSubmit={this.onSubmitEmail}>
                                    <label> Current Email Address: {this.state.email}</label>
                                    <br /><br />
                                    <TextField
                                        label="Email"
                                        id="email"
                                        onChange={this.onChangeEmail}
                                        style={{width:'16em'}}
                                    />
                                    <br /><br />
                                    <Button style={{align: 'right'}}
                                        variant="outlined"
                                        type="Submit"
                                        color="primary"
                                    >Update</Button>
                                </form>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon}/>} className={classes.top}>
                            <Typography className={classes.secondaryHeading}> Update your phone number</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <form className="phone-number" onSubmit={this.onSubmitPhone}>
                                    <label> Current Phone Number: {this.state.phone}</label>
                                    <br /><br />
                                    <TextField
                                        label="Phone Number"
                                        id="phone"
                                        onChange={this.onPhoneChange} 
                                        style={{width:'16em'}}/>
                                    <br /><br />
                                    <Button style={{align: 'right'}}
                                        variant="outlined"
                                        type="Submit"
                                        color="primary"
                                    >Update</Button>
                                </form>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.icon}/>} className={classes.top} >
                            <Typography className={classes.secondaryHeading}> Change your password</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails >
                            <Typography>
                                <form className="password-change" onSubmit={this.onSubmitPassword}>
                                    <br />
                                    <TextField
                                        label="Current Password"
                                        type="password"
                                        id="current_pwd"
                                        onChange={this.onMatchPassword} />
                                    <br />
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        id="new_pwd"
                                        onChange={this.onChangePassword} />
                                    {"                   "}
                                    <TextField
                                        label="Confirm Password"
                                        type="password"
                                        id="rep_pwd"
                                        onChange={this.onChangePassword} />
                                    <br /><br />
                                    <Button style={{align: 'right'}}
                                        variant="outlined"
                                        type="Submit"
                                        color="primary"
                                    >Save</Button>
                                </form>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>








            //     <div className="user-settings">
            //         <Card className={classes.card}>
            //             <CardHeader>
            //                 <h1>User Settings</h1>
            //             </CardHeader>
            //             <CardContent>
            //                 <form id="update-email" onSubmit={this.onSubmitEmail}>
            //                     <label> Current Email Address: {this.state.email}</label>
            //                     <br />
            //                     <TextField
            //                         label="Email"
            //                         id="email"
            //                         onChange={this.onChangeEmail}
            //                     />
            //                     <Button> Update</Button>

            //                 </form>
            //                 <br />
            //                 <hr />
            //                 <form className="phone-number" onSubmit={this.onSubmitPhone}>
            //                     <label> Current Phone Number: {this.state.phone}</label>
            //                     <br />
            //                     <TextField
            //                         label="Tel. Phone Number"
            //                         id="phone"
            //                         onChange={this.onPhoneChange} />
            //                     <br />
            //                     <Button>
            //                         Update
            //                         </Button>
            //                 </form>
            //                 <br />
            //                 <hr />

            //                 <form className="password-change" onSubmit={this.onSubmitPassword}>
            //                     <label> Update Password </label>
            //                     <br />
            //                     <TextField
            //                         label="Current Password"
            //                         type="password"
            //                         id="current_pwd"
            //                         onChange={this.onMatchPassword} />

            //                     <br />
            //                     <TextField
            //                         label="New Password"
            //                         type="password"
            //                         id="current_pwd"
            //                         onChange={this.onChangePassword} />
            //                     {"         "}
            //                     <br />
            //                     <TextField
            //                         label="Confirm Password"
            //                         type="password"
            //                         id="rep_pwd"
            //                         onChange={this.onChangePassword} />
            //                     <br />
            //                     <Button
            //                         variant="outlined"
            //                         type="Submit"
            //                         color="primary"
            //                     >
            //                         Change Password
            //   </Button>
            //                 </form>
            //                 <br />
            //             </CardContent>
            //         </Card>
            //     </div>

















            //ORIGINAL
            // <div className="user-settings">
            //     <form id="update-email" onSubmit={this.onSubmitEmail}>
            //         <label> Update Email Address </label>
            //         <TextField
            //         label="Email"
            //         id="email"
            //         defaultValue={this.state.email}
            //         // className={classes.textField}
            //         helperText="Enter you current email address"
            //         />


            //         <input
            //             type="text"
            //             label="email"
            //             onChange={this.onChangeEmail}
            //             defaultValue={this.state.email} />
            //         <button>Save</button>
            //     </form>
            //     <br />
            //     <hr />
            //     <form className="phone-number" onSubmit={this.onSubmitPhone}>
            //         <label> Update Phone Number</label>
            //         <input
            //             type="text"
            //             label="email"
            //             onChange={this.onPhoneChange}
            //             defaultValue={this.state.phone} />
            //         <button>Save</button>
            //     </form>
            //     <br />
            //     <hr />

            //     <form className="password-change" onSubmit={this.onSubmitPassword}>
            //         <label> Current Password </label>
            //         <input type="password" required name="current_pwd" onChange={this.onMatchPassword} defaultValue={this.state.password} />
            //         <br />
            //         <label> New Password </label>
            //         <input type="password" onChange={this.onChangePassword} required name="new_pwd" />
            //         <label> Confirm Password </label>
            //         <input type="password" onChange={this.onChangePassword} name="rep_pwd" />
            //         <button type="Submit"> Change Password </button>
            //     </form>
            //     <br />
            // </div>
        );
    }
}

UserSettings.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserSettings);