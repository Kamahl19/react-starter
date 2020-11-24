import { Meta } from '@storybook/react';

import LoadingScreen from './';

export default {
  title: 'common/LoadingScreen',
  component: LoadingScreen,
} as Meta;

export const Basic = () => <LoadingScreen />;
