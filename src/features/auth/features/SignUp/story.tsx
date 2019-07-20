import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import SignUp from './view';

storiesOf('auth/SignUp', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SignUp isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
  ));
