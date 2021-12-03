import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/HomeScreen';
import Emergency from '../screens/EmergencyScreen';
import Booking from '../screens/BookingScreen';
import Travel from '../screens/TravelScreen';
import Services from '../screens/ServicesScreen';
import Profile from '../screens/ProfileScreen';
import Login from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';
import Enquiry from '../screens/EnquiryScreen';
import Splash from '../screens/SplashScreen';
import TopHeader from '../screens/TopHeader';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const EmergencyStack = createStackNavigator();
const BookingStack = createStackNavigator();
const TravelStack = createStackNavigator();
const ServicesStack = createStackNavigator();
const LoginStack = createStackNavigator();

const CustomTabButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -40,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#5a67d8',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode={false} initialRouteName={Login}>
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Register" component={Register} />
      <LoginStack.Screen name="Splash" component={Splash} />
    </LoginStack.Navigator>
  );
}

function EmergencyStackScreen() {
  return (
    <EmergencyStack.Navigator headerMode={false}>
      <EmergencyStack.Screen name="Emergency" component={Emergency} />
    </EmergencyStack.Navigator>
  );
}

function BookingStackScreen() {
  return (
    <BookingStack.Navigator headerMode={false}>
      <BookingStack.Screen name="Booking" component={Booking} />
    </BookingStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode={false}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Enquiry" component={Enquiry} />
    </HomeStack.Navigator>
  );
}

function TravelStackScreen() {
  return (
    <TravelStack.Navigator headerMode={false}>
      <TravelStack.Screen name="Travel" component={Travel} />
    </TravelStack.Navigator>
  );
}

function ServicesStackScreen() {
  return (
    <ServicesStack.Navigator headerMode={false}>
      <ServicesStack.Screen name="Services" component={Services} />
    </ServicesStack.Navigator>
  );
}

const TabsScreen = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}>
      <Tabs.Screen
        name="Emergency"
        component={EmergencyStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../asset/icons/emergency.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#5a67d8' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#5a67d8' : '#748c94',
                  fontSize: 12,
                }}>
                Emergency
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Booking"
        component={BookingStackScreen}
        options={({navigation, route}) => ({
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* {console.log("aaa", route)} */}
              <Image
                source={require('../../asset/icons/booking.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#5a67d8' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#5a67d8' : '#748c94',
                  fontSize: 12,
                }}>
                Booking
              </Text>
            </View>
          ),
        })}
      />
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../asset/icons/home.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#ffffff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="Travel"
        component={TravelStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../asset/icons/travel.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#5a67d8' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#5a67d8' : '#748c94',
                  fontSize: 12,
                }}>
                Travel
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Services"
        component={ServicesStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../asset/icons/services.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#5a67d8' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#5a67d8' : '#748c94',
                  fontSize: 12,
                }}>
                Services
              </Text>
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="Splash">
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{
          animationEnabled: false,
        }}
      />
      <RootStack.Screen name="LoginStackScreen" component={LoginStackScreen} />
      <RootStack.Screen name="TopHeader" component={TopHeader} />

      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default () => {
  return <RootStackScreen />;
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
});
