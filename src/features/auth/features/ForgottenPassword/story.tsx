import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ForgottenPassword from './view';

export default {
  title: 'auth/ForgottenPassword',
  decorators: [withKnobs],
};

export const Basic = () => (
  <ForgottenPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
