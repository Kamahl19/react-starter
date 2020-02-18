import React from 'react';

import Widget from './';

export default {
  title: 'common/Widget',
};

export const Basic = () => (
  <div style={{ padding: 20, background: '#f0f2f5' }}>
    <Widget title="Title" extra={<a href="/">More</a>}>
      Content
    </Widget>
  </div>
);
