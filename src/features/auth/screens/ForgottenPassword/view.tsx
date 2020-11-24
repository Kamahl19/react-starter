import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { ForgottenPasswordPayload } from 'common/ApiTypes';
import { useFormRules } from 'common/hooks';

import AuthLayout from '../../components/AuthLayout';

type Props = {
  isLoading: boolean;
  onSubmit: (values: ForgottenPasswordPayload) => void;
};

const ForgottenPasswordForm = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { required, email } = useFormRules();

  return (
    <AuthLayout>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item
          label={t('fields.email.label', { defaultValue: 'E-mail' })}
          name="email"
          rules={[required, email]}
        >
          <Input
            autoFocus
            placeholder={t('fields.email.placeholder', { defaultValue: 'E-mail' })}
          />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {t('fields.submit', { defaultValue: 'Submit' })}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default ForgottenPasswordForm;
