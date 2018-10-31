import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Footer } from '../../common/components';

import Header from './components/Header';

const AccountApp = ({ children }) => (
  <Layout>
    <Header />
    <Layout.Content>
      <h1>You are logged in</h1>
    </Layout.Content>
    <Footer />
  </Layout>
);

AccountApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountApp;
