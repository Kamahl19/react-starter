import React from 'react';
import { storiesOf } from '@storybook/react';

import ErrorBoundary from './';

storiesOf('common/ErrorBoundary', module).add('default', () => (
  <ErrorBoundary>
    <Throw />
  </ErrorBoundary>
));

function Throw() {}
