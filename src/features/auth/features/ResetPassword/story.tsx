import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ResetPassword from './view';

storiesOf('auth/ResetPassword', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ResetPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
  ));
