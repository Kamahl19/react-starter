import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { EmailInput } from './inputs';
import { createForm, FormItem } from '../../../common/services/Form';
import rules from '../rules';

@createForm()
export default class ForgottenPassword extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
    const { getFieldDecorator } = this.props.form;

    return (
      <View>
        <Text>Forgotten Password</Text>

        <FormItem>
          {getFieldDecorator('email', { rules: rules.email })(<EmailInput autoFocus />)}
        </FormItem>

        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}
