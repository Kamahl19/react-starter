import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { Navbar } from 'common/components';

import { AUTH_ROUTER_PATHS } from '../../constants';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <Layout className="auth-page-layout">
      <Layout.Header>
        <Logo />
        <Navbar>
          <Menu.Item key={AUTH_ROUTER_PATHS.signUp}>
            <Link to={AUTH_ROUTER_PATHS.signUp}>
              {t('nav.signup', { defaultValue: 'Sign Up' })}
            </Link>
          </Menu.Item>
          <Menu.Item key={AUTH_ROUTER_PATHS.login}>
            <Link to={AUTH_ROUTER_PATHS.login}>{t('nav.login', { defaultValue: 'Log In' })}</Link>
          </Menu.Item>
        </Navbar>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
      {/* You can remove the Netlify link. It's here only to conform with Netlify's Open Source Plan Policy (https://www.netlify.com/legal/open-source-policy/) */}
      <Layout.Footer style={{ textAlign: 'center' }}>
        <a href="https://www.netlify.com">This site is powered by Netlify</a>
      </Layout.Footer>
    </Layout>
  );
};

export default AuthLayout;

const Logo = () => <h1 style={{ margin: 0 }}>Logo</h1>;
