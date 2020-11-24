import { Meta } from '@storybook/react';

import AuthLayout from './';

export default {
  title: 'common/AuthLayout',
  component: AuthLayout,
} as Meta;

export const Basic = () => <AuthLayout>Content</AuthLayout>;
