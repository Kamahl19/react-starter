import React from 'react';

import Widget from './';

export default {
  title: 'common/Widget',
};

export const Basic = () => (
  <div style={{ padding: 100, background: '#f0f2f5' }}>
    <Widget title="Title" extra={<a href="/">More</a>} style={{ width: 300 }}>
      Content
    </Widget>
  </div>
);
