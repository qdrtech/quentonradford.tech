import React from 'react';
import {render}  from 'react-dom';
import './index.css';
import Home from './home/home.component';
import registerServiceWorker from './registerServiceWorker';

render(
<Home />,
 document.getElementById('root')
);
registerServiceWorker();
