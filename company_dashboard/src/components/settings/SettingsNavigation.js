import React from "react";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

import AccountSettings from "./AccountSettings";
import Billing from "./Billing";
import AdminPanel from "../Admin/AdminPanel";
import { NavigationFullscreenExit } from "material-ui/svg-icons";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = {
  root: {
    flexGrow: 1
  }
};

class SettingsNavigation extends React.Component {
  state = {
    value: 0,
    is_admin: null
  };
  componentDidMount() {
    console.log("State Before loading Page:", this.state.is_admin);
    const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Settings Navigation response: ", response);
      this.setState({
        is_admin: response.data.is_admin
      }, () => {
        console.log("State After loading Page:", this.state.is_admin);
      });
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const adminStatus = this.state.is_admin;
    if(adminStatus) {
      return (
        <div>
          <NoSsr>
            <Paper className={classes.root}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                  <LinkTab label="Account Settings" />
                  <LinkTab label="Admin Panel"/>
                  <LinkTab label="Team Billing" />
              </Tabs>
            </Paper>
            {value === 0 && <TabContainer><AccountSettings user={this.state.user} /></TabContainer>}
            {value === 1 && <TabContainer><AdminPanel user={this.state.user} /></TabContainer>}
            {value === 2 && <TabContainer><Billing /></TabContainer>}
          </NoSsr>
        </div>
      )} else {
        return (
          <div>
            <NoSsr>
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  >
                    <LinkTab label="Account Settings" />
                </Tabs>
              </Paper>
              {value === 0 && <TabContainer><AccountSettings user={this.state.user} /></TabContainer>}
            </NoSsr>
          </div>
        )
      }
    }
}

SettingsNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SettingsNavigation));
