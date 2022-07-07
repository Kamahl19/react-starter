import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { type ResetPasswordPayload } from 'api';
import { useValidationRules } from 'common/validations';

type Props = {
  isLoading: boolean;
  onSubmit: (values: ResetPasswordPayload) => void;
};

const ResetPassword = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { password } = useValidationRules();

  return (
    <Form<ResetPasswordPayload> onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('resetPassword.password.label')}
        name="password"
        rules={password}
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