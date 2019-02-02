import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Header, Menu } from '../../../../common/components';

const { Item: MenuItem } = Menu;

const AuthHeader = () => (
  <Header>
    {() => [
      <MenuItem key="signup">
        <Link to="/auth/sign-up">
          <Trans i18nKey="nav.signup">Sign Up</Trans>
        </Link>
      </MenuItem>,
      <MenuItem key="login">
        <Link to="/auth/login">
          <Trans i18nKey="nav.login">Log In</Trans>
        </Link>
      </MenuItem>,
    ]}
  </Header>
);

export default AuthHeader;
