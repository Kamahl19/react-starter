import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput, PasswordInput } from './inputs';

export default class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    goToSignUp: PropTypes.func.isRequired,
    goToForgottenPassword: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password });
  };

  onChangeEmail = email => this.setState({ email });

  onChangePassword = password => this.setState({ password });

  render() {
    const { goToSignUp, goToForgottenPassword } = this.props;
    const { email, password } = this.state;

    return (
      <View>
        <Text>Log In</Text>

        <EmailInput onChangeText={this.onChangeEmail} value={email} autoFocus />

        <PasswordInput onChangeText={this.onChangePassword} value={password} />

        <Button onPress={this.handleSubmit} title="Log In" />

        <Button onPress={goToSignUp} title="Sign Up" />

        <Button onPress={goToForgottenPassword} title="Forgot password?" />
      </View>
    );
  }
}
