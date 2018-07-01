import React from 'react';
import { Link } from "@reach/router";

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const NavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title">
                        <Link to="/"> Home </Link> |
                        <Link to="login"> Login </Link> |
                        <Link to="register"> Register </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar;
