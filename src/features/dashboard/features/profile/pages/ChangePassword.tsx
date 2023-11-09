import { useCallback } from 'react';
import { App, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ChangePasswordPayload, useChangePassword } from '@/api';
import { useAuth } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';
import { Widget } from '@/common/components';

import { useChangePasswordRules } from '../validations';

const ChangePassword = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const { message } = App.useApp();

  const [form] = Form.useForm<ChangePasswordPayload>();

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useChangePassword();

  const handleSubmit = useCallback(
    (payload: ChangePasswordPayload) =>
      mutate(
        { userId, payload },
        {
          onSuccess: () => {
            form.resetFields();
            message.success(t('profile:changePassword.success'));
          },
          onError,
        },
      ),
    [t, userId, mutate, form, onError, message],
  );

  const rules = useChangePasswordRules();

  return (
    <>
      <Widget.WithMenuTitle>{t('profile:changePassword.title')}</Widget.WithMenuTitle>

      <Form<ChangePasswordPayload> form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('profile:changePassword.password')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password autoFocus />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {t('global:save')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
