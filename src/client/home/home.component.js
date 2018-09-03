import React, { Component } from 'react';

//css
import './home.component.css';

//components
import Header from '../components/header/header.component';
import AffirmationContainerComponent from '../components/affirmation-container/affirmation-container.component';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="container">
                <AffirmationContainerComponent />
            </div>
        );
    };
}