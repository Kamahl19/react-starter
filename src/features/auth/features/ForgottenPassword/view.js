import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';

import { FormScreen, FormItem } from 'packages/ant-form-helpers';

import { Button, Form, Input } from 'common/components/';
import rules from 'common/rules';

import PageLayout from '../../components/PageLayout';

const ForgottenPasswordForm = ({ form, isLoading, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <FormScreen form={form} onSubmit={onSubmit}>
        {({ hasErrors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormItem
              id="email"
              rules={[rules.required, rules.email]}
              label={<Trans i18nKey="fields.email.label">E-mail</Trans>}
            >
              <Input
                autoFocus
                placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })}
              />
            </FormItem>
            <Button block type="primary" htmlType="submit" loading={isLoading} disabled={hasErrors}>
              <Trans i18nKey="fields.submit">Submit</Trans>
            </Button>
          </Form>
        )}
      </FormScreen>
    </PageLayout>
  );
};

ForgottenPasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(ForgottenPasswordForm);
