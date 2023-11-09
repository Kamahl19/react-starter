import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Result } from 'antd';
import { useDebounce } from 'use-debounce';

import { type CreateUserPayload, useCreateUser, useFetchUserEmailAvailability } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';

import { useSignUpRules } from '../validations';
import AuthCard from '../components/AuthCard';

const DEBOUNCE_MS = 500;

const SignUp = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const onError = usePrintErrorMessage();

  const { mutate, isPending } = useCreateUser();

  const handleSubmit = useCallback(
    (payload: CreateUserPayload) =>
      mutate(payload, {
        onSuccess: () => setSuccess(true),
        onError,
      }),
    [mutate, onError, setSuccess],
  );

  const [form] = Form.useForm<CreateUserPayload>();

  const [emailValue = ''] = useDebounce(Form.useWatch('email', form), DEBOUNCE_MS);

  const { data: isUserEmailAvailable } = useFetchUserEmailAvailability(emailValue);

  const rules = useSignUpRules();

  return (
    <AuthCard title={t('auth:signUp.title')}>
      {success ? (
        <Result
          status="success"
          title={t('auth:signUp.success.title')}
          subTitle={t('auth:signUp.success.subTitle')}
        />
      ) : (
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
            <Button block type="primary" htmlType="submit" loading={isPending}>
              {t('auth:signUp.submit')}
            </Button>
          </Form.Item>
        </Form>
      )}
    </AuthCard>
  );
};

export default SignUp;
