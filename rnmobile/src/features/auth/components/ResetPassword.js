import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput, PasswordInput } from './inputs';
import { createForm, FormItem } from '../../../common/services/Form';
import rules from '../rules';

@createForm()
export default class ResetPassword extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    passwordResetToken: PropTypes.string.isRequired,
  };

  handleSubmit = () => {
    const { onSubmit, passwordResetToken, form } = this.props;

    form.validateFields((err, { email, password }) => {
      if (!err) {
        onSubmit({ email, password, passwordResetToken });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <View>
        <Text>Reset Password</Text>

        <FormItem>
          {getFieldDecorator('email', { rules: rules.email })(<EmailInput autoFocus />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: rules.passwordWithLimit,
          })(<PasswordInput />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('repeatPassword', {
            rules: rules.repeatPassword(form),
          })(<PasswordInput placeholder="Repeat Password" />)}
        </FormItem>

        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

// TODO repeat password
