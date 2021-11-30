import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import DetailScreen from "../screens/DetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createBottomTabNavigator();

// const SplashScreen = () => {
//     setTimeout(() => {
//         navigation.navigate("Home")
//     }, 5000);
//     return(
//         <Text>Loading</Text>
//     )
// }
const CustomTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -40,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)
const Tabs = () => {
    return (
        <Tab.Navigator
        initialRouteName="SplashScreen"
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
                    ...styles.shadow
                }

            }}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/profile.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '748c94',
                                fontSize: 12
                            }}
                        >Profile</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/chat.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '748c94',
                                fontSize: 12
                            }}
                        >Chat</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Detail" component={DetailScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../asset/icons/plus.png')}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: '#ffffff'
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabButton {...props} />
                    )
                }}
            />
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/bell.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '748c94',
                                fontSize: 12
                            }}
                        >Alert</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '748c94',
                                fontSize: 12
                            }}
                        >Action</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

export default Tabs;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7f5df0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 5
    }
})