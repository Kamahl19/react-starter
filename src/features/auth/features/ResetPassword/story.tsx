import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ResetPassword from './view';

export default {
  title: 'auth/ResetPassword',
  decorators: [withKnobs],
};

export const Basic = () => (
  <ResetPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
