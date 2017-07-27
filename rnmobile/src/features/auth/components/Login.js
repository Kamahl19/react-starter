import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Button, FormItem } from '../../../common/components';
import { createForm } from '../../../common/services/Form';
import { EmailInput, PasswordInput } from './inputs';
import rules from '../rules';
import styles from './styles';

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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Log In</Text>

        <FormItem style={styles.textInputContainer}>
          {getFieldDecorator('email', { rules: rules.email })(
            <EmailInput autoFocus style={styles.textInput} />
          )}
        </FormItem>

        <FormItem style={styles.textInputContainer}>
          {getFieldDecorator('password', { rules: rules.password })(
            <PasswordInput style={styles.textInput} />
          )}
        </FormItem>

        <View style={styles.button}>
          <Button onPress={this.handleSubmit} title="Log In" type="primary" block />
        </View>

        <View style={styles.button}>
          <Button onPress={goToForgottenPassword} title="Forgot password?" />
          <Button onPress={goToSignUp} title="Sign Up" />
        </View>
      </ScrollView>
    );
  }
}
