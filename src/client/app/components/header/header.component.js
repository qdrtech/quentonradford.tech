import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import classNames from 'classnames';

//Button
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


//React-Core
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  iconSmall: {
    fontSize: 16,
  },
});

class Header extends Component {

  routeToPublishComponent = (props) => {
    console.log(props);
  }

  render = () => {
    const { classes } = this.props;
    return (
      <div id="app-bar">
        <Grid container direction="row">
          <AppBar className={classes.root}>
            <Grid container direction="row" justify="flex-end">
              <Grid item xs={6} container direction="row" justify="flex-end">
                <Button size="medium" variant="contained" color="primary" className={classNames(classes.button)}>
                  Publish
                </Button>
              </Grid>
            </Grid>
          </AppBar>
        </Grid>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);