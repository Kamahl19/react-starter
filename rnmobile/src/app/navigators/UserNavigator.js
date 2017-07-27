import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { ScreenWrapper, CenterView, Text } from '../../common/components';
import CustomDrawer from './drawer/CustomDrawer';

const DemoHomeScreen = () =>
  <ScreenWrapper>
    <CenterView>
      <Text>Welcome</Text>
    </CenterView>
  </ScreenWrapper>;

DemoHomeScreen.navigationOptions = {
  drawerLabel: 'Home',
};

const DemoProfileScreen = () =>
  <ScreenWrapper>
    <CenterView>
      <Text>User Profile</Text>
    </CenterView>
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
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
  }
);
