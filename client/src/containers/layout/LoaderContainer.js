import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from '@src/components/layout';

const LoaderContainer = ({ showLoader }) => (
    <Loader show={showLoader} />
);

LoaderContainer.propTypes = {
    showLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ loader }) => ({
    showLoader: !!loader.unfinishedRequests.length,
});

export default connect(mapStateToProps)(LoaderContainer);
