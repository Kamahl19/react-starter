import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hub } from 'aws-amplify';

import { reloginAction } from '../../../common/services/user';
import { AMPLIFY_AUTH_CODES } from '../../../common/enums';

import AuthSpinner from '../components/AuthSpinner';

const mapDispatchToProps = {
  relogin: reloginAction,
};

const AUTH_CHANNEL = 'auth';

class AuthContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    relogin: PropTypes.func.isRequired,
  };

  componentWillMount() {
    Hub.listen(AUTH_CHANNEL, this, 'authContainer');
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.search.includes('error')) {
      history.push('/auth/login');
    }
  }

  onHubCapsule(capsule) {
    const { channel, payload } = capsule;
    if (channel === AUTH_CHANNEL) {
      this.onAuthEvent(payload);
    }
  }

  onAuthEvent({ event }) {
    if (event === AMPLIFY_AUTH_CODES.SIGN_IN) {
      this.props.relogin();
    }
  }

  render() {
    return <AuthSpinner />;
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(AuthContainer);
