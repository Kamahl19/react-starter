import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { connectRefereumWidget } from '../../../common/services/refereum';
import { connectSpinner } from '../../../common/services/spinner';

import { signUpAction } from '../ducks';
import { apiCallIds } from '../api';
import SignUp from '../components/SignUp';

const EnhancedSignUp = connectSpinner({
  isLoading: apiCallIds.SIGN_UP,
})(SignUp);

const mapStateToProps = (_, { location }) => ({
  hasReferral: location.search.includes('refer'),
});

const mapDispatchToProps = {
  signUp: signUpAction,
};

class SignUpContainer extends Component {
  static propTypes = {
    hasReferral: PropTypes.bool.isRequired,
    signUp: PropTypes.func.isRequired,
    showRefereumWidget: PropTypes.func.isRequired,
    hideRefereumWidget: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { hasReferral } = this.props;

    if (hasReferral) {
      this.props.showRefereumWidget();
      this.props.hideRefereumWidget();
    }
  }

  render() {
    const { signUp, hasReferral } = this.props;

    return <EnhancedSignUp hasReferral={hasReferral} onSubmit={signUp} />;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(connectRefereumWidget(SignUpContainer))
);
