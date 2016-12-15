import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getShowLoader } from '@src/reducers/loader';
import { Loader } from '@src/components/layout';

const LoaderContainer = ({ showLoader }) => (
    <Loader show={showLoader} />
);

LoaderContainer.propTypes = {
    showLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showLoader: getShowLoader(state),
});

export default connect(mapStateToProps)(LoaderContainer);
