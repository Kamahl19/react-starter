import { useCallback } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ChangePasswordPayload, useChangePassword } from 'api';
import { useAuth } from 'common/auth';
import { useApiErrorMessage } from 'common/hooks';
import { Widget } from 'common/components';

import { useChangePasswordRules } from '../../validations';

const ChangePassword = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const { message } = App.useApp();

  const [form] = Form.useForm<ChangePasswordPayload>();

  const onError = useApiErrorMessage();

  const { mutate: changePassword, isLoading: changePasswordIsLoading } = useChangePassword();

  const handleSubmit = useCallback(
    (payload: ChangePasswordPayload) =>
      changePassword(
        { userId, payload },
        {
          onSuccess: () => {
            message.success(t('profile:changePassword.success'));
            form.resetFields();
          },
          onError,
        }
      ),
    [t, userId, changePassword, form, onError, message]
  );

  const rules = useChangePasswordRules();

  return (
    <>
      <Widget.Header title={t('profile:changePassword.title')} />

      <Form<ChangePasswordPayload> form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('profile:changePassword.currentPassword')}
          name="currentPassword"
          rules={rules.currentPassword}
          validateFirst
        >
          <Input.Password autoFocus />
        </Form.Item>
        <Form.Item
          label={t('profile:changePassword.newPassword')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" loading={changePasswordIsLoading}>
            {t('global:submit')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
