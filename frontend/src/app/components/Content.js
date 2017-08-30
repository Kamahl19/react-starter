import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';
import Spin from 'antd/lib/spin';

const Content = ({ children, showSpinner }) => (
  <Layout.Content>
    <Spin spinning={showSpinner} size="large">
      {children}
    </Spin>
  </Layout.Content>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

export default Content;
