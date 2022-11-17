import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import {
  type CreateUserPayload,
  useCreateUser,
  useFetchUserEmailAvailability,
  isApiError,
} from 'api';
import { useValidationRules } from 'common/validations';

import { AUTH_ROUTES } from '../../routes';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const rules = useValidationRules();

  const { mutate: createUser, isLoading: createUserIsLoading } = useCreateUser();

  const handleSubmit = useCallback(
    (payload: CreateUserPayload) =>
      createUser(payload, {
        onSuccess: () => {
          message.success(t('signUp.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError: (error) => {
          if (isApiError(error)) {
            message.error(error.message);
          }
        },
      }),
    [t, navigate, createUser]
  );

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue = ''] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  return (
    <Form<CreateUserPayload>
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        label={t('signUp.email.label')}
        name="email"
        rules={rules.email}
        validateFirst
        validateStatus={isUserEmailAvailable ? undefined : 'error'}
        help={isUserEmailAvailable ? undefined : t('signUp.email.taken')}
      >
        <Input autoFocus placeholder={t('signUp.email.placeholder')} autoComplete="off" />
      </Form.Item>
      <Form.Item
        label={t('signUp.password.label')}
        name="password"
        rules={rules.password}
        validateFirst
      >
        <Input.Password placeholder={t('signUp.password.placeholder')} />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={createUserIsLoading}>
        {t('signUp.submit')}
      </Button>
    </Form>
  );
};

export default SignUp;
