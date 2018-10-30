import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutAction } from '../../common/services/user';
import { Layout, Footer } from '../../common/components';

import Header from './components/Header';

const mapDispatchToProps = {
  logout: logoutAction,
};

const AccountApp = ({ children, logout, history, location }) => (
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
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(AccountApp)
);
