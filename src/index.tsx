import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';

import 'app/styles/main.css';
import Root from 'app/Root';

import * as serviceWorker from './serviceWorker';

render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
