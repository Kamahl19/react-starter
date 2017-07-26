import React from 'react';
import { TextInput } from 'react-native';

export const EmailInput = ({ value, onChangeText, ...rest }) =>
  <TextInput
    onChangeText={onChangeText}
    value={value}
    keyboardType="email-address"
    placeholder="E-mail"
    autoCapitalize="none"
    {...rest}
  />;

export const PasswordInput = ({ value, onChangeText, ...rest }) =>
  <TextInput
    onChangeText={onChangeText}
    value={value}
    placeholder="Password"
    secureTextEntry
    {...rest}
  />;
