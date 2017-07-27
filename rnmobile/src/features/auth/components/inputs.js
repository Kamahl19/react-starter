import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../common/components';

export class EmailInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
  };

  render() {
    const { value, onChangeText, ...rest } = this.props;

    return (
      <TextInput
        onChangeText={onChangeText}
        value={value}
        keyboardType="email-address"
        placeholder="E-mail"
        autoCapitalize="none"
        {...rest}
      />
    );
  }
}

export class PasswordInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
  };

  render() {
    const { value, onChangeText, ...rest } = this.props;

    return (
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder="Password"
        secureTextEntry
        {...rest}
      />
    );
  }
}
