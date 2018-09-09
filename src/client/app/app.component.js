import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withStyles } from "@material-ui/core";
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//components
import Home from './components/home/home.component';
import Header from './components/header/header.component';
import Publish from './components/publish/publish.component';

//services
import AffirmationService from './services/affirmation.service'
import UserService from './services/users.service';
import moment from 'moment';

import { styles } from './app.styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            open: false,
            isLoading: true,
            UserService: new UserService(),
            AffirmationService: new AffirmationService(),
        };
    }

    __init__ = () => {
        this._bootStrapComponent();
    }

    _bootStrapComponent = () => {
        this._initUser();
        this._setComponentState();
    }

    _initUser = () => {
        this.state.UserService.getUserByUserID().then((response) => {
            if (!response || !response.data || !response.data.Item) {
                this.state.UserService.createUser().then((response) => {
                    this._initUser();
                    this.state.user = response.data.Item;
                    this._setComponentState(this.state.user);
                });
            }
            else {
                this.state.user = response.data.Item;
                this._setComponentState(this.state.user);
            }
        });
    }

    convertEpochToLocalDate = (utcSeconds) => {
        return new Date(0).setUTCSeconds(utcSeconds);
    }

    _setComponentState = (user) => {
        if (!this.state.user || !this.state.user.LastUpdatedDate) return;

        if (moment() > moment(this.state.user.LastUpdatedDate).add(1, "days")) {
            this.state.AffirmationService.getAffirmation().then((response) => {
                if (!response || !response.data || !response.data.body || !JSON.parse(response.data.body).Affirmation) return;
                this.state.user.Affirmation = JSON.parse(response.data.body).Affirmation;
                this.state.user.LastUpdatedDate = moment().toISOString();
                this.setState({ affirmation: this.state.user.Affirmation, isLoading: true });
                this.state.UserService.updateUser({ Affirmation: this.state.user.Affirmation, UserID: this.state.user.UserID, LastUpdatedDate: this.state.user.LastUpdatedDate }).then(
                    (response) => {
                        this.state.user = response.data.Attributes;
                        this._initUser();
                        return;
                    });
            });
        }

        if (this.state.user && this.state.user.Affirmation) {
            this.setState({ user: this.state.user, affirmation: this.state.user.Affirmation, isLoading: false });
        }
    }

    componentWillMount = () => {
        this._initUser();
    }

    componentDidMount = () => {
        this.setState({ affirmation: null, isLoading: true });
        this.timerID = setInterval(() => {
            this._setComponentState(this.state.user);
        }, 100000)
    };

    onSnackbarNotif = () => {
        this.setState({ open: true });
    }

    onUpdatedUserObject = (val) => {
        this.setState({ user: val });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    render = () => {
        const { classes, user } = this.props;

        const { open, shareData } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.App}>
                    <div id="Header">
                        <Header />
                    </div>
                    <div id="Rotuer">
                        <Route exact path='/' render={(props) => <Home isLoading={this.state.isLoading} user={this.state.user} {...props} handleUserUpdate={this.onUpdatedUserObject.bind(this)} />} />
                        <Route exact path='/publish' render={(props) => <Publish user={this.state.user} initUser={this.__init__.bind(this)} handleSnackbar={this.onSnackbarNotif.bind(this)} handleUserUpdate={this.onUpdatedUserObject.bind(this)} />} />
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={800}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                            classes: {
                                root: classes.snackbar
                            }
                        }}
                        onClick={this.handleClose}
                        message={<span id="message-id">message published(++)</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);