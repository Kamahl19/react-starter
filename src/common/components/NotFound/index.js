import React from 'react';
import { Trans } from 'react-i18next';

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
  </>
);

export default NotFound;
