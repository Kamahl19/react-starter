import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginActions } from '../ducks';
import { Login } from '../components';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      login: loginActions.request,
    },
    dispatch
  ),
});

@connect(undefined, mapDispatchToProps)
export default class LoginContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Login',
  };

  goToSignUp = () => this.props.navigation.navigate('SignUp');

  goToForgottenPassword = () => this.props.navigation.navigate('ForgottenPassword');

  render() {
    const { actions } = this.props;

    return (
      <Login
        onSubmit={actions.login}
        goToSignUp={this.goToSignUp}
        goToForgottenPassword={this.goToForgottenPassword}
      />
    );
  }
}
