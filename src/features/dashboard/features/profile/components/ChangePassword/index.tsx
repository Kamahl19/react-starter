import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Typography } from 'antd';

import { type ChangePasswordPayload, useChangePasswordValidation } from 'api';

const { Title } = Typography;

type Props = {
  isLoading: boolean;
  onSubmit: (values: ChangePasswordPayload) => Promise<void>;
};

const ChangePassword = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  const validation = useChangePasswordValidation();

  const [form] = Form.useForm<ChangePasswordPayload>();

  const handleSubmit = useCallback(
    async (values: ChangePasswordPayload) => {
      await onSubmit(values);
      form.resetFields();
    },
    [onSubmit, form]
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
          rules={validation.currentPassword}
          validateFirst
        >
          <Input.Password placeholder={t('changePassword.currentPassword.placeholder')} />
        </Form.Item>
        <Form.Item
          label={t('changePassword.newPassword.label')}
          name="password"
          rules={validation.password}
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
