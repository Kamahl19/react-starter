import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../../features/auth/ducks';
import NavigatorService from '../../common/services/navigator';
import GuestNavigator from './GuestNavigator';
import UserNavigator from './UserNavigator';

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const AppNavigator = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <GuestNavigator ref={ref => NavigatorService.setContainer(ref)} />;
  }

  return <UserNavigator ref={ref => NavigatorService.setContainer(ref)} />;
};

AppNavigator.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppNavigator);
