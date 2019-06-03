import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ForgottenPassword from './view';

storiesOf('auth/ForgottenPassword', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ForgottenPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
  ));
