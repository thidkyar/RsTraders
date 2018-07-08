import React, { Component } from "react";
import { Link } from "@reach/router";

//import CSS
import "./Sidebar.css";

//Material UI Components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 240;
   
const styles = theme => ({
  sidebar: {
    height: "200vh",
    width: "20%",
    backgroundColor: "red",
    float: "left"
  }
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return ( 

        // <div class="s-layout">
          <div class="s-layout__sidebar">
            <a class="s-sidebar__trigger" href="#0">
              <i class="fa fa-bars" />
            </a>

            <nav class="s-sidebar__nav">
              <ul>
                <li>
                  <a class="s-sidebar__nav-link" href="#0">
                    <i class="fa fa-home" />
                    <em>Home</em>
                  </a>
                </li>
                <li>
                  <a class="s-sidebar__nav-link" href="#0">
                    <i class="fa fa-user" />
                    <em>My Profile</em>
                  </a>
                </li>
                <li>
                  <a href='favourites' class="s-sidebar__nav-link">
                    <i class="fa fa-camera" />
                    <em>Camera</em>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        // </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
