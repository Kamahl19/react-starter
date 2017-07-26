import React from 'react';
import { Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { ScreenWrapper } from '../../common/components';
import CustomDrawer from './drawer/CustomDrawer';

const DemoHomeScreen = () =>
  <ScreenWrapper>
    <Text>Welcome</Text>
  </ScreenWrapper>;

DemoHomeScreen.navigationOptions = {
  drawerLabel: 'Home',
};

const DemoProfileScreen = () =>
  <ScreenWrapper>
    <Text>User Profile</Text>
  </ScreenWrapper>;

DemoProfileScreen.navigationOptions = {
  drawerLabel: 'My Profile',
};

export default DrawerNavigator(
  {
    Home: {
      screen: DemoHomeScreen,
    },
    Profile: {
      screen: DemoProfileScreen,
    },
  },
  {
    contentComponent: CustomDrawer,
  }
);
