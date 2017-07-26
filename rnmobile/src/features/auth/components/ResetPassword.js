import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput, PasswordInput } from './inputs';

export default class ResetPassword extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    passwordResetToken: PropTypes.string.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { onSubmit, passwordResetToken } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password, passwordResetToken });
  };

  onChangeEmail = email => this.setState({ email });

  onChangePassword = password => this.setState({ password });

  render() {
    const { email, password } = this.state;

    return (
      <View>
        <Text>Reset Password</Text>

        <EmailInput onChangeText={this.onChangeEmail} value={email} autoFocus />

        <PasswordInput onChangeText={this.onChangePassword} value={password} />

        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

// TODO repeat password
