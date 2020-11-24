import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import SignUp from './view';

export default {
  title: 'auth/SignUp',
  component: SignUp,
  argTypes: {
    isLoading: { control: 'boolean' },
    onSubmit: { action: 'submit' },
  },
} as Meta;

export const Basic: Story<ComponentProps<typeof SignUp>> = (args) => <SignUp {...args} />;
