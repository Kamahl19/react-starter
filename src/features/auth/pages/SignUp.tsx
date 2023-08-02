import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { App, Button, Form, Input, Result } from 'antd';

import { useSignUp, useResendConfirmation, type SignUpPayload } from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';

import { useSignUpRules } from '../validations';
import AuthCard from '../components/AuthCard';

const SignUp = () => {
  const { t } = useTranslation();

  const { message } = App.useApp();

  const [success, setSuccess] = useState<{ requiresConfirmation: boolean; email: string }>();

  const onError = usePrintErrorMessage();

  const { signUp, isPending } = useSignUp();

  const handleSubmit = useCallback(
    (payload: SignUpPayload) =>
      signUp(payload, {
        onSuccess: ({ requiresConfirmation }) =>
          setSuccess({ requiresConfirmation, email: payload.email }),
        onError,
      }),
    [signUp, onError],
  );

  const { resendConfirmation, isPending: isResendConfirmationPending } = useResendConfirmation();

  const handleResendConfirmation = useCallback(
    () =>
      resendConfirmation(
        { email: success?.email ?? '' },
        {
          onSuccess: () => void message.success(t('auth:signUp.resendConfirmation.success')),
          onError,
        },
      ),
    [t, resendConfirmation, onError, message, success],
  );

  const rules = useSignUpRules();

  return (
    <AuthCard title={t('auth:signUp.title')}>
      {success?.requiresConfirmation ? (
        <Result
          status="success"
          title={t('auth:signUp.success.title')}
          subTitle={t('auth:signUp.success.subTitle')}
          extra={
            <Button onClick={handleResendConfirmation} loading={isResendConfirmationPending}>
              {t('auth:signUp.resendConfirmation.button')}
            </Button>
          }
        />
      ) : (
        <Form<SignUpPayload> onFinish={handleSubmit} layout="vertical">
          <Form.Item label={t('auth:signUp.email')} name="email" rules={rules.email} validateFirst>
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
