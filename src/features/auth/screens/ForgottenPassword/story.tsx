import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import ForgottenPassword from './view';

const conf = {
  title: 'auth/ForgottenPassword',
  decorators: [withKnobs],
};

export default conf;

export const Basic = () => (
  <ForgottenPassword isLoading={boolean('isLoading', false)} onSubmit={action('submit')} />
);
