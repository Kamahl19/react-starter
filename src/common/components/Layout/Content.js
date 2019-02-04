import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';

import { connectSpinner } from '../../../packages/spinner';

import { Spin } from '../';

const Content = ({ children, isLoading }) => (
  <Layout.Content>
    <Spin spinning={isLoading} size="large">
      {children}
    </Spin>
  </Layout.Content>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connectSpinner()(Content);
