import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import rules from '../rules';

@translate()
@Form.create()
export default class ForgottenPasswordForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
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
        <h1>{t('Forgotten Password')}</h1>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Form.Item label={t('E-mail')}>
            {getFieldDecorator('email', { rules: rules.email })(
              <Input placeholder={t('E-mail')} autoFocus />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('Submit')}
            </Button>
            <Link to="/auth/login">{t('Log In')}</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
