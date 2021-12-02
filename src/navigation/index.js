import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import bottomHomeNavigator from './bottomHomeNavigator';
import CustomDrawer from './drawer';
import Home from '../screens/HomeScreen';
const Drawer = createDrawerNavigator();

const Router = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Screen name="Home" component={bottomHomeNavigator} />
  </Drawer.Navigator>
);

export default Router;
