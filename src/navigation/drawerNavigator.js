import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './drawer';
import {bottomHomeNavigator} from './bottomHomeNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#05357a',
        },
        headerTintColor: '#ffffff',
      }}
      drawerPosition="right"
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen name="Bottom" component={bottomHomeNavigator} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
