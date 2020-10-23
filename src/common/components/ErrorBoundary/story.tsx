import React from 'react';

import ErrorBoundary from './';

export default {
  title: 'common/ErrorBoundary',
};

export const Basic = () => (
  <ErrorBoundary>
    <Throw />
  </ErrorBoundary>
);

function Throw(): JSX.Element {
  throw new Error();
}
