import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from '@src/components/layout';

const mapStateToProps = ({ loader }) => ({
    showLoader: !!loader.unfinishedRequests.length,
});

@connect(mapStateToProps)
export default class LoaderContainer extends Component {
    static propTypes = {
        showLoader: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <Loader show={this.props.showLoader} />
        );
    }
}
