import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import SignUp from './view';

const conf = {
  title: 'auth/SignUp',
  decorators: [withKnobs],
};

export default conf;

export const Basic = () => (
  <SignUp isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
