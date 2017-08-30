import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { ScreenWrapper, CenterView, Text } from '../../common/components';
import CustomDrawer from './drawer/CustomDrawer';

const DemoHomeScreen = () => (
  <ScreenWrapper>
    <CenterView>
      <Text>Slide right to open the Sider</Text>
    </CenterView>
  </ScreenWrapper>
);

DemoHomeScreen.navigationOptions = {
  drawerLabel: 'Home',
};

export default DrawerNavigator(
  {
    Home: {
      screen: DemoHomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
  }
);
