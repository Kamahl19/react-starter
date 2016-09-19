import React, { Component, PropTypes } from 'react';
import ReactLoaders from 'react-loaders';
import { connect } from 'react-redux';

import './loader.less';

const mapStateToProps = (state) => ({
    unfinishedRequests: state.loader.unfinishedRequests,
});

@connect(mapStateToProps)
export default class Loader extends Component {
    static propTypes = {
        unfinishedRequests: PropTypes.array,
    };

    render() {
        const { unfinishedRequests } = this.props;

        if (!unfinishedRequests || unfinishedRequests.length === 0) {
            return <div />;
        }

        return (
            <div className="overlay">
                <ReactLoaders
                    type="ball-spin-fade-loader"
                />
            </div>
        );
    }
}
