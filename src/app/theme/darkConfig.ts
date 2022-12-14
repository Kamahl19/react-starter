import { theme } from 'antd';

import { mergeWithBase } from './baseConfig';

export default mergeWithBase({
  algorithm: theme.darkAlgorithm,
  // https://ant.design/docs/react/customize-theme#theme
});
