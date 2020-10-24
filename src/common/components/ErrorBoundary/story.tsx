import React from 'react';

import ErrorBoundary from './';

const conf = {
  title: 'common/ErrorBoundary',
};

export default conf;

export const Basic = () => (
  <ErrorBoundary>
    <Throw />
  </ErrorBoundary>
);

function Throw(): JSX.Element {
  throw new Error();
}
