import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '../../../app/Root';

import { Button } from '../';

const NotFound = () => (
  <>
    <h1>
      <Trans i18nKey="notFound.title">Page not found</Trans>
    </h1>
    <p>
      <Trans i18nKey="notFound.subtitle">
        Ooops! Looks like the page you have requested doesn't exist.
      </Trans>
    </p>
    <Button type="primary">
      <Link to={ROUTE_PATHS.root}>
        <Trans i18nKey="notFound.back">Go back</Trans>
      </Link>
    </Button>
  </>
);

export default NotFound;
