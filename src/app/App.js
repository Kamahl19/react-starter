import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutAction, selectIsLoggedIn, selectProfile } from '../common/services/user';

import Layout from '../common/components/Layout';
import Header from '../common/components/Header';
import MainMenu from '../common/components/Header/Nav';
import Footer from '../common/components/Footer';

const mapStateToProps = state => ({
  profile: selectProfile(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = {
  logout: logoutAction,
};

// TODO rewrite
const AppContainer = ({ children, logout, profile, isLoggedIn, history, location }) => (
  <Layout>
    <Header>
      <MainMenu
        email={profile && profile.email} // TODO remove
        isLoggedIn={isLoggedIn}
        logout={logout}
        history={history}
        activePathname={location.pathname}
      />
    </Header>
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContainer)
);
