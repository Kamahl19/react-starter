import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';

import { Button, Form, FormScreen, FormItem, Input } from '../../../../common/components';
import rules from '../../../../common/rules';

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
    <FormScreen form={form} onSubmit={onSubmit}>
      {({ hasErrors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            id="code"
            rules={[rules.required, rules.code]}
            className="code-input"
            label={<Trans i18nKey="fields.code.label">Code</Trans>}
          >
            <Input placeholder={t('fields.code.placeholder', { defaultValue: 'Code' })} />
          </FormItem>
          {!emailCredentialExists && (
            <FormItem
              id="email"
              rules={[rules.required, rules.email]}
              label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
            >
              <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
            </FormItem>
          )}
          <Form.Item>
            <Button loading={isLoading} disabled={hasErrors} block type="primary" htmlType="submit">
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
