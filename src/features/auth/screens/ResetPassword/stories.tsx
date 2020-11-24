import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import ResetPassword from './view';

export default {
  title: 'auth/ResetPassword',
  component: ResetPassword,
  argTypes: {
    isLoading: { control: 'boolean' },
    onSubmit: { action: 'submit' },
  },
} as Meta;

export const Basic: Story<ComponentProps<typeof ResetPassword>> = (args) => (
  <ResetPassword {...args} />
);
