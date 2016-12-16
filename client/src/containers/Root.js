import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '@src/routes.js';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            {routes}
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Root;
