import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Space } from 'antd';
import { css } from '@emotion/react';

import { ThemeSwitch, useIsDark } from 'app/theme';
import { Navbar, Logo } from 'common/components';
import { createStyles, getMQ } from 'common/styleUtils';

import { AUTH_ROUTES } from '../../routes';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: AUTH_ROUTES.login.to,
        label: <Link to={AUTH_ROUTES.login.to}>{t('auth:menu.login')}</Link>,
      },
      {
        key: AUTH_ROUTES.signUp.to,
        label: <Link to={AUTH_ROUTES.signUp.to}>{t('auth:menu.signUp')}</Link>,
      },
    ],
    [t]
  );

  return (
    <Layout css={styles.layout}>
      <Layout.Header css={styles.header}>
        <Row justify="space-between" wrap={false}>
          <Col>
            <Logo to={AUTH_ROUTES.login.to} inverted={useIsDark()} />
          </Col>
          <Col>
            <Space size="large">
              <ThemeSwitch />
              <Navbar items={menuItems} mobileMenuBreakpoint="md" />
            </Space>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content css={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};

export default AuthLayout;

const styles = createStyles({
  layout: css({
    minHeight: '100vh',
  }),

  header: ({ token }) =>
    css({
      position: 'sticky',
      top: 0,
      boxShadow: token.boxShadowTertiary,
      zIndex: 19,

      '&&': {
        background: token.colorBgContainer,
        paddingInline: token.paddingLG,

        [getMQ(token).smMax]: {
          paddingInline: token.paddingSM,
        },
      },
    }),

  content: ({ token }) =>
    css({
      display: 'grid',
      height: '100%',
      padding: token.paddingLG,

      [getMQ(token).smMax]: {
        padding: token.paddingSM,
      },

      '.ant-form': {
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
      },
    }),
});
