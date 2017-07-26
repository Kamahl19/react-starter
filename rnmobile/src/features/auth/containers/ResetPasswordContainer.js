import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPasswordRequest } from '../ducks';
import { ResetPassword } from '../components';

const mapStateToProps = (state, props) => ({
  passwordResetToken: props.match.params.passwordResetToken,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetPasswordRequest,
    },
    dispatch
  ),
});

const ResetPasswordContainer = ({ passwordResetToken, actions }) =>
  <ResetPassword onSubmit={actions.resetPasswordRequest} passwordResetToken={passwordResetToken} />;

ResetPasswordContainer.propTypes = {
  passwordResetToken: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
