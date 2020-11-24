import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';

import Widget from './';

export default {
  title: 'common/Widget',
  component: Widget,
  argTypes: {
    title: { control: 'text', defaultValue: 'Title' },
    loading: { control: 'boolean' },
    size: { control: { type: 'check', options: ['small'] } },
  },
} as Meta;

export const Basic: Story<ComponentProps<typeof Widget>> = (args) => (
  <Widget {...args} extra={<a href="/">More</a>}>
    Content
  </Widget>
);
