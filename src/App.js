import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { countdownTime: null };
    this.countdownDate = new Date("07/10/2018").getTime();
  }

  componentDidMount = (() => {
    this.timerID = setInterval(() => {
      let now = new Date().getTime();
      this.setState({countdownTime: this.countdownDate - now});
    }, 1)
  });

  componentWillUnmount = (() => {
    clearInterval(this.timerID);
  });

  render = (() => {
    return (
      <div className="App">
        <div className="bgimg">
          <div className="middle">
            <h1>QUENTON WILL BE BACK..</h1>
            <hr />
            <p>+{this.state.countdownTime}ms</p>
          </div>
        </div>
      </div>
    );
  });
}

export default App;
