import React, { Component } from 'react';

//css
import './home.component.css';

//components
import AffirmationContainerComponent from '../components/affirmation-container/affirmation-container.component';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="App">
                <div className="container">
                    <AffirmationContainerComponent />
                </div>
            </div>
        );
    };
}

export default Home;