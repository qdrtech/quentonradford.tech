import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//styles
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//Button
import Button from '@material-ui/core/Button';


//React-Core
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { styles } from './header.styles';


class Header extends Component {

  constructor(props) {
    super(props);
  }

  render = () => {
    const { classes } = this.props;

    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div id="app-bar">
        <Grid container direction="row">
          <AppBar className={classes.root}>
            <Toolbar>
              <Grid container direction="row" justify="flex-end">
                <Grid item xs={6} container direction="row" justify="flex-start">
                  <Button className={classes.dim} component={Link} to="/" color="inherit">affirm {bull} mate</Button>
                </Grid>
                <Grid item xs={6} container direction="row" justify="flex-end">
                  <Button className={classes.dim} component={Link} to="/" color="inherit">home</Button>
                  <Button className={classes.dim} component={Link} to="/publish" color="inherit">pub++</Button>
                </Grid>
              </Grid>
            </Toolbar>
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