import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';

import {
  AgreementCheckbox,
  Button,
  Form,
  FormScreen,
  FormItem,
  Input,
  Widget,
  Row,
  Col,
  Divider,
  PasswordInput,
} from '../../../../common/components';
import rules from '../../../../common/rules';

import SocialButton from '../SocialButton';

const SignUpForm = ({ form, t, isLoading, socialButtonProps, onSubmit }) => (
  <Widget title={<Trans i18nKey="signUp.title">Sign Up</Trans>}>
    <FormScreen form={form} onSubmit={onSubmit}>
      {({ hasErrors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            id="email"
            rules={[rules.required, ...rules.email]}
            label={<Trans i18nKey="signUp.email.label">E-mail</Trans>}
          >
            <Input
              placeholder={t('signUp.email.placeholder', { defaultValue: 'E-mail' })}
              autoFocus
            />
          </FormItem>
          <FormItem
            id="password"
            rules={rules.passwordWithLimit}
            label={<Trans i18nKey="fields.password.label">Password</Trans>}
          >
            <PasswordInput
              placeholder={t('signUp.password.placeholder', {
                defaultValue: 'Choose Password',
              })}
            />
          </FormItem>
          <FormItem id="agreement" valuePropName="checked" rules={[rules.checked]}>
            <AgreementCheckbox />
          </FormItem>
          <Button loading={isLoading} disabled={hasErrors} block type="primary" htmlType="submit">
            <Trans i18nKey="signUp.signUp">Sign Up</Trans>
          </Button>
        </Form>
      )}
    </FormScreen>
    <Divider className="ant-divider-plain">
      <Trans i18nKey="signUp.or">or</Trans>
    </Divider>
    <Row className="social-buttons">
      <Col {...socialButtonProps}>
        <SocialButton block provider="Google" isSignUp />
      </Col>
      <Col {...socialButtonProps}>
        <SocialButton block provider="Facebook" isSignUp />
      </Col>
    </Row>
  </Widget>
);

SignUpForm.defaultProps = {
  socialButtonProps: {
    sm: {
      span: 12,
    },
  },
};

SignUpForm.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  socialButtonProps: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default translate()(Form.create()(SignUpForm));
