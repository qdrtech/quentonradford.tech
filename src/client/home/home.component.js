import React, { Component } from 'react';

//helpers
import Configurations from './helpers/configurations';

//services
import AffirmationService from './services/affirmation.service';
import BackgroundImageService from './services/backgroundimage.service';
import UserService from './services/users.service';

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
            this.setState({ affirmation: this.user.Affirmation });
        });
    }

    _setComponentState = (user) => {
        var today = Date.now();
        var oneDay = 24 * (60 * 60 * 1000);
        if (this.user && ((this.user.LastUpdatedDate + oneDay) >= today)) {
            this.AffirmationService.getAffirmation().then((response) => {
                if (!response || !response.data || !response.data.Affirmation) return;
                this.user.Affirmation = response.data.Affirmation;
                this.UserService.updateUser({ Affirmation: this.user.Affirmation, UserID: this.user.UserID }).then((response) => {
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