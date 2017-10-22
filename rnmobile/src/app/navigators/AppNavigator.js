import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectIsLoggedIn } from '../../features/auth/ducks';
import GuestNavigator from './GuestNavigator';
import UserNavigator from './UserNavigator';

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const AppNavigator = ({ isLoggedIn }) => (isLoggedIn ? <UserNavigator /> : <GuestNavigator />);

AppNavigator.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppNavigator);
