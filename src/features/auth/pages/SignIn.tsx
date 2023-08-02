import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Col, Result, Row, Typography } from 'antd';

import {
  useSignIn,
  useSignInMagicLink,
  type SignInPayload,
  type SignInMagicLinkPayload,
} from '@/api';
import { usePrintErrorMessage } from '@/common/hooks';

import { useSignInRules } from '../validations';
import { AUTH_ROUTES } from '../routes';
import AuthCard from '../components/AuthCard';

enum View {
  PASSWORD = 'password',
  MAGIC_LINK = 'magicLink',
}

const SignIn = () => {
  const [view, setView] = useState(View.PASSWORD);

  return view === View.PASSWORD ? (
    <SignInWithPassword onViewChange={() => setView(View.MAGIC_LINK)} />
  ) : (
    <SignInWithMagicLink onViewChange={() => setView(View.PASSWORD)} />
  );
};

export default SignIn;

const SignInWithPassword = ({ onViewChange }: { onViewChange: VoidFunction }) => {
  const { t } = useTranslation();

  const { signIn, isPending } = useSignIn();

  const onError = usePrintErrorMessage();

  const handleSubmit = useCallback(
    (payload: SignInPayload) => signIn(payload, { onError }),
    [signIn, onError],
  );

  const rules = useSignInRules();

  return (
    <AuthCard title={t('auth:signIn.title')}>
      <Form<SignInPayload> onFinish={handleSubmit} layout="vertical" requiredMark={false}>
        <Form.Item label={t('auth:signIn.email')} name="email" rules={rules.email} validateFirst>
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          label={t('auth:signIn.password')}
          name="password"
          rules={rules.password}
          validateFirst
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col>
              <Link to={AUTH_ROUTES.resetPassword.to}>{t('auth:signIn.resetPassword')}</Link>
            </Col>
            <Col>
              <Typography.Link onClick={onViewChange}>
                {t('auth:signIn.useMagicLink')}
              </Typography.Link>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item noStyle>
          <Button block type="primary" htmlType="submit" loading={isPending}>
            {t('auth:signIn.submit')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

const SignInWithMagicLink = ({ onViewChange }: { onViewChange: VoidFunction }) => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);

  const { signInMagicLink, isPending } = useSignInMagicLink();

  const onError = usePrintErrorMessage();

  const handleSubmit = useCallback(
    (payload: SignInMagicLinkPayload) =>
      signInMagicLink(payload, {
        onSuccess: () => setSuccess(true),
        onError,
      }),
    [signInMagicLink, onError],
  );

  const rules = useSignInRules();

  return (
    <AuthCard title={t('auth:signIn.withMagicLink.title')}>
      {success ? (
        <Result status="success" title={t('auth:signIn.withMagicLink.success')} />
      ) : (
        <Form<SignInMagicLinkPayload>
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item label={t('auth:signIn.email')} name="email" rules={rules.email} validateFirst>
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Typography.Link onClick={onViewChange}>{t('auth:signIn.usePassword')}</Typography.Link>
          </Form.Item>
          <Form.Item noStyle>
            <Button block type="primary" htmlType="submit" loading={isPending}>
              {t('auth:signIn.withMagicLink.submit')}
            </Button>
          </Form.Item>
        </Form>
      )}
    </AuthCard>
  );
};
