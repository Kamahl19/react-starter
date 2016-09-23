import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import ScreenHeader from './screen-header';
import ScreenFooter from './ScreenFooter';
import Loader from './Loader';

import './main-wrapper.less';

export default class MainWrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <div className="main-wrapper">

                <ScreenHeader />

                {children}

                <ScreenFooter />

                <Loader />

                <Alert
                    position="top-right"
                    timeout={3000}
                    stack={{ spacing: 10 }}
                />

            </div>
        );
    }
}
