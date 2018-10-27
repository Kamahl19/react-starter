import React from 'react';
import Layout from 'antd/lib/layout';

import Content from './Content';

const EnhancedLayout = props => <Layout {...props} />;

EnhancedLayout.Header = Layout.Header;
EnhancedLayout.Content = Content;
EnhancedLayout.Footer = Layout.Footer;

export default EnhancedLayout;
