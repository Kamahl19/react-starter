import { deepmergeCustom } from 'deepmerge-ts';
import { theme } from 'antd';
import { type ThemeConfig } from 'antd/es/config-provider/context'; // TODO fix import

const baseConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  // https://ant.design/docs/react/customize-theme#theme
};

export default baseConfig;

export const mergeWithBase = (config: ThemeConfig) =>
  deepmergeCustom({ mergeArrays: false })(baseConfig, config);
