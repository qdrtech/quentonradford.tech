import React, { Component } from 'react';

//css
import './loader.component.css';

export default class LoaderComponent extends Component {
    isLoading = () => {
        return(
            <div id="animation"></div>
        )
    }

    render() {
        return (
            <this.isLoading />
        )
    }
}