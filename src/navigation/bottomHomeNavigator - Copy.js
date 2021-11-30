import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Home from "../screens/HomeScreen";
import Complain from "../screens/ComplainScreen";
import RaiseComplain from "../screens/ComplainScreen/raiseComplain";
import Profile from "../screens/ProfileScreen";
import Setting from "../screens/SettingScreen";
import SecurityAlert from "../screens/SecurityAlert";
import QuickAction from "../screens/QuickAction";
import Login from "../screens/LoginScreen";
import Register from "../screens/LoginScreen/register";
import Notice from "../screens/HomeScreen/notice";
import Splash from "../screens/SplashScreen";

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ComplainStack = createStackNavigator();
const QuickActionStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingStack = createStackNavigator();
const LoginStack = createStackNavigator();


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

function HomeStackScreen() {
    return (
        <HomeStack.Navigator headerMode={false}>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="SecurityAlert" component={SecurityAlert} />
            <HomeStack.Screen name="QuickAction" component={QuickAction} />
            <HomeStack.Screen name="Complain" component={Complain} />
            <HomeStack.Screen name="Notice" component={Notice} />
        </HomeStack.Navigator>
    )
}

function LoginStackScreen() {
    return (
        <LoginStack.Navigator headerMode={false}
            initialRouteName={Login}
        >
            <LoginStack.Screen name="Login" component={Login} />
            <LoginStack.Screen name="Register" component={Register} />
            <LoginStack.Screen name="Splash" component={Splash} />
        </LoginStack.Navigator>
    )
};

function ComplainStackScreen() {
    return (
        <ComplainStack.Navigator headerMode={false}>
            <ComplainStack.Screen name="Complain" component={Complain} />
            <ComplainStack.Screen name="RaiseComplain" component={RaiseComplain} />
        </ComplainStack.Navigator>
    )
};

function QuickActionStackScreen() {
    return (
        <QuickActionStack.Navigator headerMode={false}>
            <QuickActionStack.Screen name="QuickAction" component={QuickAction} />
        </QuickActionStack.Navigator>
    )
};

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator headerMode={false}>
            <ProfileStack.Screen name="Profile" component={Profile} />
        </ProfileStack.Navigator>
    )
};

function SettingStackScreen() {
    return (
        <SettingStack.Navigator headerMode={false}>
            <SettingStack.Screen name="Setting" component={Setting} />
        </SettingStack.Navigator>
    )
};

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
                    ...styles.shadow
                }

            }}
        >

            <Tabs.Screen name="Home" component={HomeStackScreen}
                options={({ navigation, route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* {console.log("aaa", route)} */}
                            <Image
                                source={require('../../asset/icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text
                                style={{
                                    color: focused ? '#e32f45' : '#748c94',
                                    fontSize: 12
                                }}
                            >{route.name}</Text>
                        </View>
                    )
                })}
            />
            <Tabs.Screen name="ComplainStack" component={ComplainStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/chat.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 12
                            }}
                        >Complain</Text>
                    </View>
                )
            }} />
            <Tabs.Screen name="QuickAction" component={QuickActionStackScreen}
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
            <Tabs.Screen name="Profile" component={ProfileStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/profile.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 12
                            }}
                        >Profile</Text>
                    </View>
                )
            }} />
            <Tabs.Screen name="Setting" component={SettingStackScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../asset/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? '#e32f45' : '#748c94',
                                fontSize: 12
                            }}
                        >Action</Text>
                    </View>
                )
            }} />
        </Tabs.Navigator>
    )
};

const RootStack = createStackNavigator();


const RootStackScreen = () => {
    // let user = null;
    // const [data, setData] = useState();
    // useEffect(() => {
    //     const retrieveData = async () => {
    //         try {
    //             const valueString = await AsyncStorage.getItem('user');
    //             const value = JSON.parse(valueString);
    //             // Other set states
    //             setData(value);
    //         } catch (error) {
    //             setData(null)
    //         }
    //     };
    //     retrieveData();
    // }, [setData]);
    // user = data
    return (
        <RootStack.Navigator
            headerMode="none"
            initialRouteName="Splash"
        >
            <RootStack.Screen
                name="Splash"
                component={Splash}
                options={{
                    animationEnabled: false
                }}
            />
            <RootStack.Screen name="LoginStackScreen" component={LoginStackScreen} />

            <RootStack.Screen
                name="App"
                component={TabsScreen}
                options={{
                    animationEnabled: false
                }}
            />

        </RootStack.Navigator>
    );
};

export default () => {
    return (
        <RootStackScreen />
    );
};




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