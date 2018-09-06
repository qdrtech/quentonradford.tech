import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';

import App from './app/app.component';


render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
