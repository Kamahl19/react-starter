import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SignUp from './view';

storiesOf('SignUp', module).add('default', () => (
  <SignUp isLoading={false} onSubmit={action('submit')} />
));
