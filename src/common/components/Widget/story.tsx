import React from 'react';
import { storiesOf } from '@storybook/react';

import Widget from './';

storiesOf('common/Widget', module).add('default', () => (
  <div style={{ padding: 100, background: '#f0f2f5' }}>
    <Widget title="Title" extra={<a href="/">More</a>} style={{ width: 300 }}>
      Content
    </Widget>
  </div>
));
