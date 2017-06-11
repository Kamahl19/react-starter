import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import rules from '../rules';

@translate()
@Form.create()
export default class ResetPasswordForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    passwordResetToken: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit, passwordResetToken } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit({ ...values, passwordResetToken });
      }
    });
  };

  render() {
    const { form, t } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <h1>{t('Reset Password')}</h1>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('E-mail')}>
            {getFieldDecorator('email', { rules: rules.email })(
              <Input placeholder={t('E-mail')} autoFocus />
            )}
          </Form.Item>
          <Form.Item label={t('Password')}>
            {getFieldDecorator('password', {
              rules: rules.passwordWithLimit,
            })(<Input type="password" placeholder={t('Password')} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('repeatPassword', {
              rules: rules.repeatPassword(form),
            })(<Input type="password" placeholder={t('Repeat Password')} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('Submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
