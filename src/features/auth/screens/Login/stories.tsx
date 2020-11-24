import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import Login from './view';

export default {
  title: 'auth/Login',
  component: Login,
  argTypes: {
    isLoading: { control: 'boolean' },
    onSubmit: { action: 'submit' },
  },
} as Meta;

export const Basic: Story<ComponentProps<typeof Login>> = (args) => <Login {...args} />;
