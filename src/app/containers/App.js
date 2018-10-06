import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'antd/lib/layout';

import { selectGlobalCounter } from '../../features/spinner/ducks';
import { logout, selectIsLoggedIn, selectUserEmail } from '../../features/auth/ducks';

import Header from '../components/Header';
import MainMenu from '../components/MainMenu';
import Content from '../components/Content';
import Footer from '../components/Footer';

const mapStateToProps = state => ({
  showSpinner: selectGlobalCounter(state),
  email: selectUserEmail(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

const AppContainer = ({ children, showSpinner, actions, email, isLoggedIn, history, location }) => (
  <Layout>
    <Header>
      <MainMenu
        email={email}
        isLoggedIn={isLoggedIn}
        logout={actions.logout}
        history={history}
        activePathname={location.pathname}
      />
    </Header>
    <Content showSpinner={showSpinner}>{children}</Content>
    <Footer />
  </Layout>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
