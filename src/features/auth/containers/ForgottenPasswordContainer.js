import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';

import { selectIsInProgress } from '../../../features/spinner/ducks';

import { apiCallIds } from '../api';
import { forgottenPasswordRequest } from '../ducks';
import ForgottenPassword from '../components/ForgottenPassword';

const mapStateToProps = state => ({
  isLoading: selectIsInProgress(state, apiCallIds.FORGOTTEN_PASSWORD),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      forgottenPasswordRequest,
    },
    dispatch
  ),
});

const ForgottenPasswordContainer = ({ actions, isLoading }) => (
  <Spin spinning={isLoading}>
    <ForgottenPassword onSubmit={actions.forgottenPasswordRequest} />
  </Spin>
);

ForgottenPasswordContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPasswordContainer);
