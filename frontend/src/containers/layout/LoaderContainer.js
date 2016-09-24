import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from '@components/layout';

const mapStateToProps = (state) => ({
    unfinishedRequests: state.loader.unfinishedRequests,
});

@connect(mapStateToProps)
export default class LoaderContainer extends Component {
    static propTypes = {
        unfinishedRequests: PropTypes.array.isRequired,
    };

    render() {
        const { unfinishedRequests } = this.props;

        return (
            <Loader show={!!unfinishedRequests.length} />
        );
    }
}
