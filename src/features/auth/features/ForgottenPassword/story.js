import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ForgottenPassword from './view';

storiesOf('auth/ForgottenPassword', module).add('default', () => (
  <ForgottenPassword isLoading={false} onSubmit={action('submit')} />
));
