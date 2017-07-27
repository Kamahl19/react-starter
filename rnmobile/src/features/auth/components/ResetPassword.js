import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Button } from '../../../common/components';
import { createForm, FormItem } from '../../../common/services/Form';
import { EmailInput, PasswordInput } from './inputs';
import rules from '../rules';
import styles from './styles';

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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <FormItem>
          {getFieldDecorator('email', { rules: rules.email })(
            <EmailInput autoFocus style={styles.textInput} />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: rules.passwordWithLimit,
          })(<PasswordInput style={styles.textInput} />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('repeatPassword', {
            rules: rules.repeatPassword(form),
          })(<PasswordInput placeholder="Repeat Password" style={styles.textInput} />)}
        </FormItem>

        <View style={styles.button}>
          <Button onPress={this.handleSubmit} title="Submit" type="primary" />
        </View>
      </ScrollView>
    );
  }
}
