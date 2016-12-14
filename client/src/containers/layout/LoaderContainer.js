import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { showLoaderSelector } from '@src/redux/selectors';
import { Loader } from '@src/components/layout';

const LoaderContainer = ({ showLoader }) => (
    <Loader show={showLoader} />
);

LoaderContainer.propTypes = {
    showLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showLoader: showLoaderSelector(state),
});

export default connect(mapStateToProps)(LoaderContainer);
