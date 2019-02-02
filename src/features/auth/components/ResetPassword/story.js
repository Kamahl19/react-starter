import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ResetPassword from './view';

storiesOf('ResetPassword', module).add('default', () => (
  <ResetPassword isLoading={false} onSubmit={action('submit')} />
));
