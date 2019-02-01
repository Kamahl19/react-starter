import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutAction } from '../../../../common/services/user';

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
    return <h1>Logging you out...</h1>;
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutContainer);
