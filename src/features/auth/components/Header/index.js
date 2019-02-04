import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Header, Menu } from '../../../../common/components';

const AuthHeader = () => (
  <Header>
    {() => [
      <Menu.Item key="signup">
        <Link to="/auth/sign-up">
          <Trans i18nKey="nav.signup">Sign Up</Trans>
        </Link>
      </Menu.Item>,
      <Menu.Item key="login">
        <Link to="/auth/login">
          <Trans i18nKey="nav.login">Log In</Trans>
        </Link>
      </Menu.Item>,
    ]}
  </Header>
);

export default AuthHeader;
