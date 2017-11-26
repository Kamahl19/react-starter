import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout, selectIsLoggedIn, selectUserEmail } from '../../features/auth/ducks';
import { Header, HeaderMenu } from '../../app/components';

const mapStateToProps = state => ({
  email: selectUserEmail(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

const HeaderContainer = ({ actions, email, isLoggedIn, history, location }) => (
  <Header>
    <HeaderMenu
      email={email}
      isLoggedIn={isLoggedIn}
      logout={actions.logout}
      history={history}
      activePathname={location.pathname}
    />
  </Header>
);

HeaderContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  email: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
