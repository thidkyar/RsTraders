import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
                            <Typography className={classes.secondaryHeading}
                            style={{
                                width:'100%'
                            }}> Update Email Address</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <form id="update-email" onSubmit={this.onSubmitEmail}>
                                    <span><h3> Current Email Address: </h3><h4>{this.state.email}</h4></span>
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
                            <Typography className={classes.secondaryHeading} style={{
                                width:'100%'
                            }}> Update Phone Number</Typography>
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
                            <Typography className={classes.secondaryHeading} 
                            style={{
                                width:'100%'
                            }}> Change Password</Typography>
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
        );
    }
}

UserSettings.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserSettings);