import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, message, Typography } from 'antd';

import { type ChangePasswordPayload } from 'api';
import { useValidationRules } from 'common/validations';

const { Title } = Typography;

type Props = {
  isLoading: boolean;
  onSubmit: (values: ChangePasswordPayload) => Promise<void>;
};

const ChangePassword = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  const { password, passwordNoCheck } = useValidationRules();

  const [form] = Form.useForm<ChangePasswordPayload>();

  const handleSubmit = useCallback(
    async (values: ChangePasswordPayload) => {
      await onSubmit(values);

      form.resetFields();

      message.success(
        t('changePassword.success', {
          defaultValue: 'Your password has been changed successfully.',
        })
      );
    },
    [onSubmit, form, t]
  );

  return (
    <>
      <Title level={4}>{t('changePassword.title', { defaultValue: 'Change Password' })}</Title>
      <Form<ChangePasswordPayload>
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          label={t('changePassword.currentPassword.label', { defaultValue: 'Current Password' })}
          name="currentPassword"
          rules={passwordNoCheck}
          validateFirst
        >
          <Input.Password
            placeholder={t('changePassword.currentPassword.placeholder', {
              defaultValue: 'Current Password',
            })}
          />
        </Form.Item>
        <Form.Item
          label={t('changePassword.newPassword.label', { defaultValue: 'New Password' })}
          name="password"
          rules={password}
          validateFirst
        >
          <Input.Password
            placeholder={t('changePassword.newPassword.placeholder', {
              defaultValue: 'New Password',
            })}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t('changePassword.submit', { defaultValue: 'Submit' })}
        </Button>
      </Form>
    </>
  );
};

export default ChangePassword;
