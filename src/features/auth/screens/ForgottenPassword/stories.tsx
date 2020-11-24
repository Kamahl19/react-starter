import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import ForgottenPassword from './view';

export default {
  title: 'auth/ForgottenPassword',
  component: ForgottenPassword,
  argTypes: {
    isLoading: { control: 'boolean' },
    onSubmit: { action: 'submit' },
  },
} as Meta;

export const Basic: Story<ComponentProps<typeof ForgottenPassword>> = (args) => (
  <ForgottenPassword {...args} />
);
