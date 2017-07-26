import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput, PasswordInput } from './inputs';
import { createForm, FormItem } from '../../../common/services/Form';
import rules from '../rules';

@createForm()
export default class Login extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    goToSignUp: PropTypes.func.isRequired,
    goToForgottenPassword: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { onSubmit, form } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { goToSignUp, goToForgottenPassword, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <View>
        <Text>Log In</Text>

        <FormItem>
          {getFieldDecorator('email', { rules: rules.email })(<EmailInput autoFocus />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', { rules: rules.password })(<PasswordInput />)}
        </FormItem>

        <Button onPress={this.handleSubmit} title="Log In" />

        <Button onPress={goToSignUp} title="Sign Up" />

        <Button onPress={goToForgottenPassword} title="Forgot password?" />
      </View>
    );
  }
}
