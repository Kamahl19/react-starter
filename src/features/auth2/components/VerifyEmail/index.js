import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';
import RetinaImage from 'react-retina-image';

import {
  Button,
  Form,
  FormScreen,
  FormItem,
  CodeInput,
  Input,
  Widget,
} from '../../../../common/components';
import rules from '../../../../common/rules';
import { mail, mail2x } from '../../../../resources/images';

const VerifyEmail = ({
  form,
  t,
  emailCredentialExists,
  changeEmailButton,
  isLoading,
  isResendEmailVerificationLoading,
  onResendEmailVerification,
  onSubmit,
}) => {
  const email = form.getFieldValue('email');

  return (
    <Widget
      centered
      className="verify-email"
      title={<Trans i18nKey="verifyEmail.title">Verify Your Email</Trans>}
    >
      <div className="content">
        <RetinaImage src={[mail, mail2x]} alt="mail-icon" />
        <p>
          <Trans i18nKey="verifyEmail.message">
            We've sent you an email with a verification code.
            <br /> Please enter the code below to continue.
          </Trans>
        </p>
      </div>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
              id="code"
              rules={[rules.required, rules.code]}
              className="code-input"
              label={<Trans i18nKey="fields.code.label">Code</Trans>}
            >
              <CodeInput size="large" autoFocus />
            </FormItem>
            {!emailCredentialExists && (
              <FormItem
                id="email"
                rules={[rules.required, ...rules.email]}
                label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
              >
                <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
              </FormItem>
            )}
            <Form.Item>
              <Button
                loading={isLoading}
                disabled={hasErrors}
                block
                type="primary"
                htmlType="submit"
              >
                <Trans i18nKey="verifyEmail.continue">Continue</Trans>
              </Button>
            </Form.Item>

            <Button
              link
              block
              loading={isResendEmailVerificationLoading}
              disabled={isResendEmailVerificationLoading || (!emailCredentialExists && !email)}
              onClick={() => onResendEmailVerification({ email })}
            >
              <Trans i18nKey="verifyEmail.resendCode">Resend code</Trans>
            </Button>
            {changeEmailButton}
          </Form>
        )}
      </FormScreen>
    </Widget>
  );
};

VerifyEmail.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  emailCredentialExists: PropTypes.bool.isRequired,
  changeEmailButton: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  isResendEmailVerificationLoading: PropTypes.bool.isRequired,
  onResendEmailVerification: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default translate()(Form.create()(VerifyEmail));
