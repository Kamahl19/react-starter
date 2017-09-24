import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import rules from '../../../common/rules';

class SignUpForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  render() {
    const { form, t } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <h1>{t('Sign Up')}</h1>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('E-mail')}>
            {getFieldDecorator('email', { rules: [rules.required, rules.email] })(
              <Input placeholder={t('E-mail')} autoFocus />
            )}
          </Form.Item>
          <Form.Item label={t('Password')}>
            {getFieldDecorator('password', { rules: rules.passwordWithLimit })(
              <Input type="password" placeholder={t('Password')} />
            )}
          </Form.Item>
          <Form.Item label={t('Repeat Password')}>
            {getFieldDecorator('repeatPassword', {
              rules: rules.repeatPassword(form),
            })(<Input type="password" placeholder={t('Repeat Password')} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('Sign Up')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default translate()(Form.create()(SignUpForm));
