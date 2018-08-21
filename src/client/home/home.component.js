import React, { Component } from 'react';

//helpers
import Configurations from './helpers/configurations';

//services
import AffirmationService from './services/affirmation.service';
import BackgroundImageService from './services/backgroundimage.service';
import UserService from './services/users.service';
import moment from 'moment';

//css
import './home.component.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.__init__();
        this.user = null;
    }

    __init__ = () => {
        this.AffirmationService = new AffirmationService();
        this.UserService = new UserService();
        this.configurations = new Configurations();
        this.backgroundImageService = new BackgroundImageService();

        this._bootStrapComponent();
    }

    _bootStrapComponent = () => {
        this.state = {};
        this._initUser();
        this._setComponentState();
    }

    _initUser = () => {
        this.UserService.getUserByUserID().then((response) => {
            if (!response || !response.data || !response.data.Item) {
                this.UserService.createUser().then((response) => {
                    this._initUser();
                });
            };

            this.user = response.data.Item;
            this._setComponentState(this.user);

            if (this.user && this.user.Affirmation)
                this.setState({ affirmation: this.user.Affirmation });
        });
    }

    convertEpochToLocalDate = (utcSeconds) => {
        return new Date(0).setUTCSeconds(utcSeconds);
    }

    _setComponentState = (user) => {
        if (!this.user || !this.user.LastUpdatedDate) return;

        if (moment(new Date()) > moment(this.user.LastUpdatedDate).add(1, "days")) {
            this.AffirmationService.getAffirmation().then((response) => {
                if (!response || !response.data || !response.data.body || !JSON.parse(response.data.body).Affirmation) return;
                this.user.Affirmation = JSON.parse(response.data.body).Affirmation;
                this.user.LastUpdatedDate = moment().toISOString();

                this.UserService.updateUser({ Affirmation: this.user.Affirmation, UserID: this.user.UserID, LastUpdatedDate: this.user.LastUpdatedDate }).then(
                    (response) => {
                        this.user = response.data.Attributes;
                        this._initUser();
                        return;
                    });
            });
        }
    }

    componentDidMount = () => {
        this.timerID = setInterval(() => {
            this._setComponentState(this.user);
        }, 100000)
    };

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    };



    render = () => {
        return (
            <div className="App">
                <div className="container">
                    <div className="middle">
                        <h1>{this.state.affirmation}</h1>
                        <hr />
                    </div>
                </div>
            </div>
        );
    };
}

export default Home;