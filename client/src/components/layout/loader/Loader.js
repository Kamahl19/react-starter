import React, { Component, PropTypes } from 'react';
import { Loader as ReactLoaders } from 'react-loaders';

import 'loaders.css/src/animations/ball-spin-fade-loader.scss';
import './loader.scss';

export default class Loader extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { show } = this.props;

        if (!show) {
            return <div />;
        }

        return (
            <div className="loader-overlay">
                <ReactLoaders
                    type="ball-spin-fade-loader"
                />
            </div>
        );
    }
}
