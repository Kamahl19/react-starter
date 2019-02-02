import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Footer } from '../../../../common/components';

import Header from '../Header';

const Screen = ({ children }) => (
  <Layout>
    <Header />
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Screen;
