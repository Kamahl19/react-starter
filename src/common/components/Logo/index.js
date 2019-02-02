import React from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

const Logo = () => (
  <Link to="/">
    <Trans i18nKey="header.title">React Starter</Trans>
  </Link>
);

export default Logo;
