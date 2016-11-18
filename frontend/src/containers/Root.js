import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '@src/routes';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                    {routes}
                </Router>
            </Provider>
        );
    }
}
