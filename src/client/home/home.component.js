import React, { Component } from 'react';
import Configurations from './helpers/configurations';
import BackgroundImageService from './services/backgroundimage.service';
import './home.component.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.configurations = new Configurations();
        this.state = { countdownTime: null };
        this.countdownDate = new Date("07/10/2018").getTime();
        this.backgroundImageService = new BackgroundImageService();
        this.backgroundImageService.getBackgroundImage().then((response) => {
            if (response && response.status === 200) {
                this.setImageOfTheDay(`${this.configurations.BING_URL}${(this.returnImageOfTheDay(response.data))}`);
            }
        });
    }

    setImageOfTheDay(string) {
        this.img = {
            backgroundImage: `url(${string})`

        }
    };

    returnImageOfTheDay(data) {
        if (data && data.images && data.images.length > 0)
            return this.extractImageOfTheDay(data.images[0]);
    };

    extractImageOfTheDay(image) {
        return image.url;
    };

    componentDidMount() {
        this.timerID = setInterval(() => {
            let now = new Date().getTime();
            this.setState({ countdownTime: this.countdownDate - now });
        }, 1)
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    };



    render() {
        return (
            <div className="App">
                <div className="bgimg" style={this.img}>
                    <div className="middle">
                        <h1>QUENTON WILL BE BACK..</h1>
                        <hr />
                        <p>+{this.state.countdownTime}ms</p>
                    </div>
                </div>
            </div>
        );
    };
}

export default Home;