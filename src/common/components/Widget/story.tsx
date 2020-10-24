import React from 'react';

import Widget from './';

const conf = {
  title: 'common/Widget',
};

export default conf;

export const Basic = () => (
  <Widget title="Title" extra={<a href="/">More</a>}>
    Content
  </Widget>
);
