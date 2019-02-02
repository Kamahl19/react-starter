import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'antd/lib/layout';

import { GlobalSpinner } from '../';

const Content = ({ children }) => (
  <Layout.Content>
    <GlobalSpinner>{children}</GlobalSpinner>
  </Layout.Content>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
