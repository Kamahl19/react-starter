import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Login from './view';

const conf = {
  title: 'auth/Login',
  decorators: [withKnobs],
};

export default conf;

export const Basic = () => (
  <Login isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
