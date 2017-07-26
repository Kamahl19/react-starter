import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput, PasswordInput } from './inputs';

export default class SignUp extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
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
    const { email, password } = this.state;

    return (
      <View>
        <Text>Sign Up</Text>

        <EmailInput onChangeText={this.onChangeEmail} value={email} autoFocus />

        <PasswordInput onChangeText={this.onChangePassword} value={password} />

        <Button onPress={this.handleSubmit} title="Sign Up" />
      </View>
    );
  }
}

// TODO repeat password
