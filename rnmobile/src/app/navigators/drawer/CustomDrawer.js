import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { logout, selectEmail } from '../../../features/auth/ducks';
import DrawerItem from './DrawerItem';

const mapStateToProps = state => ({
  email: selectEmail(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

const CustomDrawer = ({ logout, email, style, ...rest }) =>
  <View style={styles.container}>
    <DrawerItem label={`Hi ${email}`} />
    <DrawerItems {...rest} />
    <DrawerItem label="Logout" onPress={logout} />
  </View>;

CustomDrawer.propTypes = {
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
