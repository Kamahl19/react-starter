import { useCallback } from 'react';
import { message, Button, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ChangePasswordPayload, useChangePassword } from 'api';
import { useAuth } from 'common/auth';
import { useApiErrorMessage } from 'common/hooks';

import { useChangePasswordRules } from '../../validations';

const { Title } = Typography;

const ChangePassword = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

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
    [t, userId, changePassword, form, onError]
  );

  const rules = useChangePasswordRules();

  return (
    <>
      <Title level={4}>{t('profile:changePassword.title')}</Title>

      <Form<ChangePasswordPayload>
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        scrollToFirstError
      >
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
        <Button type="primary" htmlType="submit" loading={changePasswordIsLoading}>
          {t('global:submit')}
        </Button>
      </Form>
    </>
  );
};

export default ChangePassword;
