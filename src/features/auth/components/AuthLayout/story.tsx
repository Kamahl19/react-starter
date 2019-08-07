import React from 'react';
import { storiesOf } from '@storybook/react';

import AuthLayout from './';

storiesOf('auth/AuthLayout', module).add('default', () => (
  <AuthLayout>
    <></>
  </AuthLayout>
));
