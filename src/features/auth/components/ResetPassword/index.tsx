import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { type ResetPasswordPayload, useResetPasswordValidation } from 'api';

type Props = {
  isLoading: boolean;
  onSubmit: (values: ResetPasswordPayload) => void;
};

const ResetPassword = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  const validation = useResetPasswordValidation();

  return (
    <Form<ResetPasswordPayload> onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('resetPassword.password.label')}
        name="password"
        rules={validation.password}
        validateFirst
      >
        <Input.Password autoFocus placeholder={t('resetPassword.password.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('resetPassword.submit')}
      </Button>
    </Form>
  );
};

export default ResetPassword;
