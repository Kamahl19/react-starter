import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { type CreateUserPayload, useCreateUser, useFetchUserEmailAvailability } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { AUTH_ROUTES } from '../routes';
import { useSignUpRules } from '../validations';
import AuthCard from '../components/AuthCard';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const onError = useApiErrorMessage();

  const { mutate, isLoading } = useCreateUser();

  const handleSubmit = useCallback(
    (payload: CreateUserPayload) =>
      mutate(payload, {
        onSuccess: () => {
          message.success(t('auth:signUp.success'));
          navigate(AUTH_ROUTES.signIn.to);
        },
        onError,
      }),
    [t, navigate, mutate, onError, message]
  );

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue = ''] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  const rules = useSignUpRules();

  return (
    <AuthCard title={t('auth:signUp.title')}>
      <Form<CreateUserPayload> form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={t('auth:signUp.email')}
          name="email"
          rules={rules.email}
          validateFirst
          validateStatus={isUserEmailAvailable ? undefined : 'error'}
          help={isUserEmailAvailable ? undefined : t('auth:signUp.emailTaken')}
        >
          <Input autoFocus autoComplete="off" />
        </Form.Item>
        <Form.Item
          label={t('auth:signUp.password')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            {t('auth:signUp.submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default SignUp;
