import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Login from './view';

storiesOf('auth/Login', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Login isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
  ));
