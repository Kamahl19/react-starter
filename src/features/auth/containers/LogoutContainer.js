import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutAction } from '../../../common/services/user';

import AuthSpinner from '../components/AuthSpinner';

const mapDispatchToProps = {
  logout: logoutAction,
};

class LogoutContainer extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <AuthSpinner />;
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutContainer);
