import React from 'react';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Menu, Header } from '../../../../common/components';

const AccountHeader = () => (
  <Header>
    {({ isMobile }) => (
      <Menu.Item key="logout">
        <NavLink to="/auth/logout">
          <Trans i18nKey="logout">Logout</Trans>
        </NavLink>
      </Menu.Item>
    )}
  </Header>
);

export default AccountHeader;
