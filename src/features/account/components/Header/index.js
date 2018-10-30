import React from 'react';
import { Trans } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { Menu, Header } from '../../../../common/components';

const { Item: MenuItem } = Menu;

const AccountHeader = () => (
  <Header>
    {({ isMobile }) => (
      <MenuItem key="logout">
        <NavLink to="/auth/logout">
          <Trans i18nKey="logout">Logout</Trans>
        </NavLink>
      </MenuItem>
    )}
  </Header>
);

export default AccountHeader;
