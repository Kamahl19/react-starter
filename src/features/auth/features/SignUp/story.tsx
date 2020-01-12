import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import SignUp from './view';

export default {
  title: 'auth/SignUp',
  decorators: [withKnobs],
};

export const Basic = () => (
  <SignUp isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
