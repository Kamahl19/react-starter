import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forgottenPasswordRequest } from '../ducks';
import { ForgottenPassword } from '../components';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      forgottenPasswordRequest,
    },
    dispatch
  ),
});

const ForgottenPasswordContainer = ({ actions }) =>
  <ForgottenPassword onSubmit={actions.forgottenPasswordRequest} />;

ForgottenPasswordContainer.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(undefined, mapDispatchToProps)(ForgottenPasswordContainer);
