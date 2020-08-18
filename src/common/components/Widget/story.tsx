import React from 'react';

import Widget from './';

export default {
  title: 'common/Widget',
};

export const Basic = () => (
  <Widget title="Title" extra={<a href="/">More</a>}>
    Content
  </Widget>
);
