import React from 'react';
import PropTypes from 'prop-types';
import { translate, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Header, Menu } from '../../../../common/components';

const { Item: MenuItem } = Menu;

const AuthHeader = ({ i18n }) => (
  <Header>
    {({ isMobile }) => [
      <MenuItem key="signup" className="btn-item btn-item-auth">
        <Link to="/auth/sign-up">
          <Trans i18nKey="nav.signup">Sign Up</Trans>
        </Link>
      </MenuItem>,
      <MenuItem key="login" className="btn-item btn-item-auth">
        <Link to="/auth/login">
          <Trans i18nKey="nav.login">Log In</Trans>
        </Link>
      </MenuItem>,
    ]}
  </Header>
);

AuthHeader.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default translate()(AuthHeader);
