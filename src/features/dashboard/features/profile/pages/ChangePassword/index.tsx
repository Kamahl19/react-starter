import { useCallback } from 'react';
import { message, Button, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { type ChangePasswordPayload, useChangePassword, handleApiError } from 'api';
import { useAuth } from 'common/auth';
import { useValidationRules } from 'common/validations';

const { Title } = Typography;

const ChangePassword = () => {
  const { t } = useTranslation();

  const { userId } = useAuth();

  const rules = useValidationRules();

  const [form] = Form.useForm<ChangePasswordPayload>();

  const { mutate, isLoading } = useChangePassword();

  const handleSubmit = useCallback(
    (payload: ChangePasswordPayload) => {
      mutate(
        { userId, payload },
        {
          onSuccess: () => {
            message.success(t('changePassword.success'));
            form.resetFields();
          },
          onError: handleApiError((msg: string) => message.error(msg)),
        }
      );
    },
    [userId, mutate, form, t]
  );

  return (
    <>
      <Title level={4}>{t('changePassword.title')}</Title>
      <Form<ChangePasswordPayload>
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          label={t('changePassword.currentPassword.label')}
          name="currentPassword"
          rules={rules.requiredString}
          validateFirst
        >
          <Input.Password placeholder={t('changePassword.currentPassword.placeholder')} />
        </Form.Item>
        <Form.Item
          label={t('changePassword.newPassword.label')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password placeholder={t('changePassword.newPassword.placeholder')} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t('changePassword.submit')}
        </Button>
      </Form>
    </>
  );
};

export default ChangePassword;
