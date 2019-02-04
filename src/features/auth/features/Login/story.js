import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Login from './view';

storiesOf('auth/Login', module).add('default', () => (
  <Login isLoading={false} onSubmit={action('submit')} />
));
