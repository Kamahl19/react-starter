import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput } from './inputs';

export default class ForgottenPassword extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    email: '',
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { email } = this.state;

    onSubmit({ email });
  };

  onChangeEmail = email => this.setState({ email });

  render() {
    const { email } = this.state;

    return (
      <View>
        <Text>Forgotten Password</Text>

        <EmailInput onChangeText={this.onChangeEmail} value={email} autoFocus />

        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}
