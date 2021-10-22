import { Meta } from '@storybook/react';

import LoadingScreen from './';

export default {
  title: 'common/LoadingScreen',
  component: LoadingScreen,
  argTypes: {
    fullVPHeight: { control: 'boolean' },
  },
} as Meta;

export const Basic = () => <LoadingScreen />;
