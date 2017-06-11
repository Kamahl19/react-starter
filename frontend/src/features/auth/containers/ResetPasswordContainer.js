import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';
import { selectIsInProgress } from '@src/features/spinner/ducks';
import { apiCallIds } from '../api';
import { resetPasswordRequest } from '../ducks';
import { ResetPasswordForm } from '../components';

const mapStateToProps = (state, props) => ({
  isLoading: selectIsInProgress(state, apiCallIds.RESET_PASSWORD),
  passwordResetToken: props.params.passwordResetToken,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetPasswordRequest,
    },
    dispatch
  ),
});

const ResetPasswordContainer = ({ isLoading, passwordResetToken, actions }) =>
  <Spin spinning={isLoading}>
    <ResetPasswordForm
      onSubmit={actions.resetPasswordRequest}
      passwordResetToken={passwordResetToken}
    />
  </Spin>;

ResetPasswordContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  passwordResetToken: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
