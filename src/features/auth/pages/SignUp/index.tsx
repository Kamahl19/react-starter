import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { message, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { type CreateUserPayload, useCreateUser, useFetchUserEmailAvailability } from 'api';
import { useApiErrorMessage } from 'common/hooks';

import { useSignUpRules } from '../../validations';
import { AUTH_ROUTES } from '../../routes';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

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
    [t, navigate, createUser, onError]
  );

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue = ''] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  const rules = useSignUpRules();

  return (
    <Form<CreateUserPayload>
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      scrollToFirstError
    >
      <Form.Item
        label={t('auth:signUp.email.label')}
        name="email"
        rules={rules.email}
        validateFirst
        validateStatus={isUserEmailAvailable ? undefined : 'error'}
        help={isUserEmailAvailable ? undefined : t('auth:signUp.email.taken')}
      >
        <Input autoFocus autoComplete="off" />
      </Form.Item>
      <Form.Item
        label={t('auth:signUp.password.label')}
        name="password"
        rules={rules.password}
        validateFirst
      >
        <Input.Password />
      </Form.Item>
      <Button block type="primary" htmlType="submit" loading={createUserIsLoading}>
        {t('auth:signUp.submit')}
      </Button>
    </Form>
  );
};

export default SignUp;
