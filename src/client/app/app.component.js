import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import classNames from 'classnames';
import PropTypes from 'prop-types';

//components
import Home from './components/home/home.component';
import Header from './components/header/header.component';
import Publish from './components/publish/publish.component';

const styles = theme => ({
    body: {
        margin: 0,
        padding: 0,
        fontFamily: 'sans-serif'
    },
    App: {
        background: "white", /* fallback for old browsers */
        position: 'absolute',
        /* Full-screen */
        height: "100%",
        width: "100%",
        /* Center the background image */
        backgroundPosition: 'center',
        /* Scale and zoom in the image */
        backgroundSize: 'cover',
        /* Add a white text color to all elements inside the .bgimg container */
        color: 'white',
        /* Add a font */
        /* Set the font-size to 25 pixels */
        fontSize: '25px'
    }
});

class App extends Component {
    constructor() {
        super();
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.App}>
                    <div id="Rotuer">
                        <div id="Header">
                            <Header />
                        </div>
                        <Route exact path='/' render={(props) => <Home />} />
                        <Route exact path='/publish' render={(props) => <Publish />} />
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);