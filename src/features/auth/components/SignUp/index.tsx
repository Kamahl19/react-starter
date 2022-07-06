import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';
import { useDebounce } from 'use-debounce';

import { type CreateUserPayload, useFetchUserEmailAvailability } from 'api';
import { useValidationRules } from 'common/validations';

const DEBOUNCE_MS = 500;

type Props = {
  isLoading: boolean;
  onSubmit: (values: CreateUserPayload) => void;
};

const SignUp = ({ isLoading, onSubmit }: Props) => {
  const { t } = useTranslation();

  const { email, password } = useValidationRules();

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const isUserEmailAvailable = useFetchUserEmailAvailability(emailValue);

  return (
    <Form<CreateUserPayload> form={form} onFinish={onSubmit} layout="vertical" scrollToFirstError>
      <Form.Item
        label={t('signUp.email.label')}
        name="email"
        rules={email}
        validateFirst
        validateStatus={isUserEmailAvailable ? undefined : 'error'}
        help={isUserEmailAvailable ? undefined : t('signUp.email.taken')}
      >
        <Input autoFocus placeholder={t('signUp.email.placeholder')} autoComplete="off" />
      </Form.Item>
      <Form.Item label={t('signUp.password.label')} name="password" rules={password} validateFirst>
        <Input.Password placeholder={t('signUp.password.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={isLoading}>
        {t('signUp.submit')}
      </Button>
    </Form>
  );
};

export default SignUp;
