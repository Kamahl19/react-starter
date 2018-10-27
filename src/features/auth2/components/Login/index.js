import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  FormScreen,
  FormItem,
  Input,
  Widget,
  PasswordInput,
  Row,
  Col,
  Divider,
} from '../../../../common/components';
import rules from '../../../../common/rules';

import SocialButton from '../SocialButton';

const LoginForm = ({ form, t, isLoading, onSubmit }) => (
  <Widget title={<Trans i18nKey="logIn.title">Log In</Trans>}>
    <FormScreen form={form} onSubmit={onSubmit}>
      {({ hasErrors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            id="email"
            rules={[rules.required, ...rules.email]}
            label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
          >
            <Input
              placeholder={t('logIn.email.placeholder', { defaultValue: 'E-mail' })}
              autoFocus
            />
          </FormItem>
          <FormItem
            id="password"
            rules={[rules.required, rules.password]}
            label={<Trans i18nKey="fields.password.label">Password</Trans>}
          >
            <PasswordInput
              placeholder={t('logIn.password.placeholder', {
                defaultValue: 'Enter Password',
              })}
            />
          </FormItem>
          <Form.Item>
            <Link to="/auth/forgotten-password">
              <Trans i18nKey="logIn.forgotPassword">Forgot password?</Trans>
            </Link>
          </Form.Item>
          <Button loading={isLoading} disabled={hasErrors} block type="primary" htmlType="submit">
            <Trans i18nKey="logIn.logIn">Log In</Trans>
          </Button>
        </Form>
      )}
    </FormScreen>
    <Divider className="ant-divider-plain">
      <Trans i18nKey="logIn.or">or</Trans>
    </Divider>
    <Row className="social-buttons">
      <Col sm={{ span: 12 }}>
        <SocialButton block provider="Google" />
      </Col>
      <Col sm={{ span: 12 }}>
        <SocialButton block provider="Facebook" />
      </Col>
    </Row>
  </Widget>
);

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default translate()(Form.create()(LoginForm));
