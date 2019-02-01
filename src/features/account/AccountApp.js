import React from 'react';

import { Layout, Footer } from '../../common/components';

import Header from './components/Header';

const AccountApp = () => (
  <Layout>
    <Header />
    <Layout.Content>
      <h1>You are logged in</h1>
    </Layout.Content>
    <Footer />
  </Layout>
);

export default AccountApp;
