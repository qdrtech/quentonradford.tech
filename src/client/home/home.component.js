import React, { Component } from 'react';

//helpers
import Configurations from './helpers/configurations';

//services
import BackgroundImageService from './services/backgroundimage.service';
import UserService from './services/users.service';

//css
import './home.component.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.__init__();
    }

    __init__ = () => {
        this.UserService = new UserService();
        this.configurations = new Configurations();
        this.backgroundImageService = new BackgroundImageService();

        this._bootStrapComponent();
    }

    _bootStrapComponent = () => {
        this._initBackgroundImage();
        this._initUser();
        this._setComponentState();
    }

    _initBackgroundImage = () => {
        this.backgroundImageService.getBackgroundImage().then((response) => {
            if (response && response.status === 200) {
                this.setImageOfTheDay(`${this.configurations.BING_URL}${(this.returnImageOfTheDay(JSON.parse(response.data)))}`);
            }
        });
    }

    _initUser = () => {
        this.UserService.getUserByUserID().then((response) => {
            if (!response || !response.data || !response.data.Item) {
                this.UserService.createUser().then((response) => {
                    this._initUser();
                    return;
                });
            };
            this.setState({ affirmation: response.data.Item.Affirmation !== "null" ? response.data.Item.Affirmation : "a declaration" });
        });
    }

    _setComponentState = () => {
        this.state = { affirmation: null };
    }

    setImageOfTheDay = (string) => {
        this.img = {
            backgroundImage: `url(${string})`

        }
    };

    returnImageOfTheDay = (data) => {
        if (data && data.images && data.images.length > 0) {
            return this.extractImageOfTheDay(data.images[0]);
        }
    };

    extractImageOfTheDay = (image) => {
        return image.url;
    };

    componentDidMount = () => {
        this.timerID = setInterval(() => {
            let now = new Date().getTime();
            this.setState({ countdownTime: this.countdownDate - now });
        }, 1)
    };

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    };



    render = () => {
        return (
            <div className="App">
                <div className="bgimg" style={this.img}>
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