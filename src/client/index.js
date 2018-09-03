import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import Home from './home/home.component';
import Header from './components/header/header.component';
import Login from './components/login/login.component';

render(
    <Router>
        <div className="App">
            <div id="Rotuer">
                <div id="Header">
                    <Header />
                </div>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
            </div>
        </div>
    </Router>,
    document.getElementById('root')
);
