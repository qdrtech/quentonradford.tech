import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core";
import classNames from 'classnames';
import PropTypes from 'prop-types';

//components
import Home from '../components/home/home.component';
import Header from '../components/header/header.component';
import Login from '../components/login/login.component';

const styles = theme => ({

});

class App extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="App">
                <div id="Rotuer">
                    <div id="Header">
                        <Header />
                    </div>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);