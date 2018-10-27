import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '../';

const NotFound = () => (
  <Fragment>
    <h1>
      <Trans i18nKey="notFound.title">Page not found</Trans>
    </h1>
    <p>
      <Trans i18nKey="notFound.subtitle">
        Ooops! Looks like the page you have requested doesn't exist.
      </Trans>
    </p>
    <Button type="primary">
      <Link to="/">
        <Trans i18nKey="notFound.back">Go back</Trans>
      </Link>
    </Button>
  </Fragment>
);

export default NotFound;
