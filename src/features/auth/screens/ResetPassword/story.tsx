import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ResetPassword from './view';

const conf = {
  title: 'auth/ResetPassword',
  decorators: [withKnobs],
};

export default conf;

export const Basic = () => (
  <ResetPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
