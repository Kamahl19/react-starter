import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout, selectIsLoggedIn, selectUserEmail } from '../../features/auth/ducks';
import { Header, HeaderMenu } from '../../app/components';

const mapStateToProps = state => ({
  email: selectUserEmail(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

const HeaderContainer = ({ actions, email, isLoggedIn }) => (
  <Header>
    <HeaderMenu email={email} isLoggedIn={isLoggedIn} logout={actions.logout} />
  </Header>
);

HeaderContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  email: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
