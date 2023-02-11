import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { type CreateUserPayload, useCreateUser, useFetchUserEmailAvailability } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { useSignUpRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const onError = useApiErrorMessage();

  const { mutate: createUser, isLoading: createUserIsLoading } = useCreateUser();

  const handleSubmit = useCallback(
    (payload: CreateUserPayload) =>
      createUser(payload, {
        onSuccess: () => {
          message.success(t('auth:signUp.success'));
          navigate(AUTH_ROUTES.login.to);
        },
        onError,
      }),
    [t, navigate, createUser, onError, message]
  );

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue = ''] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  const rules = useSignUpRules();

  return (
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
        <Button block type="primary" htmlType="submit" loading={createUserIsLoading}>
          {t('auth:signUp.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
