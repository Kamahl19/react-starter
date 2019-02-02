import React from 'react';
import PropTypes from 'prop-types';
import { Trans, withTranslation } from 'react-i18next';

import { FormScreen, FormItem } from '../../../../packages/ant-form-helpers';
import { Button, Form, Input } from '../../../../common/components';
import rules from '../../../../common/rules';

const ResetPasswordForm = ({ form, isLoading, t, onSubmit }) => (
  <FormScreen form={form} onSubmit={onSubmit}>
    {({ hasErrors, handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <FormItem
          id="email"
          rules={[rules.required, rules.email]}
          label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
        >
          <Input placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })} />
        </FormItem>
        <FormItem
          id="password"
          rules={rules.passwordWithLimit}
          label={<Trans i18nKey="resetPassword.newPassword.label">New Password</Trans>}
        >
          <Input.Password
            placeholder={t('resetPassword.password.placeholder', {
              defaultValue: 'Enter New Password',
            })}
          />
        </FormItem>
        <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
          <Trans i18nKey="fields.submit">Submit</Trans>
        </Button>
      </Form>
    )}
  </FormScreen>
);

ResetPasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withTranslation()(Form.create()(ResetPasswordForm));
