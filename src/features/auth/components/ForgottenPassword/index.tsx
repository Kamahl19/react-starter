import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { type ForgottenPasswordPayload } from 'api';
import { useValidationRules } from 'common/validations';

type Props = {
  isLoading: boolean;
  onSubmit: (values: ForgottenPasswordPayload) => void;
};

const ForgottenPassword = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { email } = useValidationRules();

  return (
    <Form<ForgottenPasswordPayload> onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('forgottenPassword.email.label')}
        name="email"
        rules={email}
        validateFirst
      >
        <Input autoFocus placeholder={t('forgottenPassword.email.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('forgottenPassword.submit')}
      </Button>
    </Form>
  );
};

export default ForgottenPassword;
