import React from 'react';
import PropTypes from 'prop-types';
import { Trans, translate } from 'react-i18next';

import { Button, Form, FormScreen, FormItem, Input, Widget } from '../../../../common/components/';
import rules from '../../../../common/rules';

const ForgottenPasswordForm = ({ form, t, isLoading, onSubmit }) => (
  <Widget title={<Trans i18nKey="forgottenPassword.title">Forgotten Password</Trans>}>
    <FormScreen form={form} onSubmit={onSubmit}>
      {({ hasErrors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormItem
            id="email"
            rules={[rules.required, ...rules.email]}
            label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
          >
            <Input
              autoFocus
              placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })}
            />
          </FormItem>
          <Button loading={isLoading} disabled={hasErrors} block type="primary" htmlType="submit">
            <Trans i18nKey="fields.submit">Submit</Trans>
          </Button>
        </Form>
      )}
    </FormScreen>
  </Widget>
);

ForgottenPasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default translate()(Form.create()(ForgottenPasswordForm));
