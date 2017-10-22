import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';

import { selectIsInProgress } from '../../../features/spinner/ducks';
import { apiCallIds } from '../api';
import { loginActions } from '../ducks';
import { Login } from '../components';

const mapStateToProps = state => ({
  isLoading: selectIsInProgress(state, apiCallIds.LOGIN),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      login: loginActions.request,
    },
    dispatch
  ),
});

const LoginContainer = ({ actions, isLoading }) => (
  <Spin spinning={isLoading}>
    <Login onSubmit={actions.login} />
  </Spin>
);

LoginContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
