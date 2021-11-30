import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const ProductsNavigator = createStackNavigator();

const ProductsNavMenu = () => {
    return (
        <ProductsNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                headerTitleStyle: {
                    fontSize: 17,
                    fontFamily: 'poppins-bold'
                },
                headerBackTitleStyle: {
                    fontFamily: 'poppins-regular'
                }
            }}>
            <ProductsNavigator.Screen
                name="Products"
                component={ProductsOverviewScreen}
                options={({ navigation }) => {
                    return {
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title="Cart"
                                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                    onPress={() => navigation.navigate('Cart')}
                                />
                            </HeaderButtons>
                        ),
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='Menu'
                                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                    onPress={() => {
                                        navigation.toggleDrawer();
                                    }}
                                />
                            </HeaderButtons>
                        )
                    };
                }}
            />
            <ProductsNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={({ route }) => {
                    const productTitle = route.params.productTitle;
                    return {
                        title: productTitle
                    };
                }}
            />
            <ProductsNavigator.Screen
                name="Cart"
                component={CartScreen}
            />
        </ProductsNavigator.Navigator>
    );
};


// Create a separate stack navigation 
// for orders 
const OrdersNavigator = createStackNavigator();

const OrdersNavMenu = () => {
    return (
        <OrdersNavigator.Navigator
            mode="modal"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                headerTitleStyle: {
                    fontSize: 17,
                    fontFamily: 'poppins-bold'
                },
                headerBackTitleStyle: {
                    fontFamily: 'poppins-regular'
                }
            }}
        >
            <OrdersNavigator.Screen
                name="Orders"
                component={OrdersScreen}
                options={({ navigation }) => {
                    return {
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='Menu'
                                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                    onPress={() => {
                                        navigation.toggleDrawer();
                                    }}
                                />
                            </HeaderButtons>
                        )
                    };
                }}

            />
        </OrdersNavigator.Navigator>
    );
};





// Create a separate stack navigation 
// for userProductsScreen
const AdminNavigator = createStackNavigator();

const AdminNavMenu = () => {
    return (
        <AdminNavigator.Navigator
            mode="modal"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                headerTitleStyle: {
                    fontSize: 17,
                    fontFamily: 'poppins-bold'
                },
                headerBackTitleStyle: {
                    fontFamily: 'poppins-regular'
                }
            }}
        >
            <AdminNavigator.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={({ navigation }) => {
                    return {
                        title: "User Products",
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='User Products'
                                    iconName={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                    onPress={() => {
                                        navigation.toggleDrawer();
                                    }}
                                />
                            </HeaderButtons>
                        ),
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='Add'
                                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                    onPress={() => {
                                        navigation.navigate('EditProduct');
                                    }}
                                />
                            </HeaderButtons>
                        )
                    };
                }}

            />

            <AdminNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={({ route }) => {
                    const productId = route.params.productId;
                    return {
                        title: productId ? "Edit Product" : "Add Product"
                    };
                }}
            />
        </AdminNavigator.Navigator>
    );
};







const ShopNavigator = createDrawerNavigator();

const ShopNavMenu = () => {
    return (
        <NavigationContainer>
            <ShopNavigator.Navigator>
                <ShopNavigator.Screen
                    name="Products"
                    component={ProductsNavMenu}
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                size={23}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        )
                    }}
                />
                <ShopNavigator.Screen
                    name="Orders"
                    component={OrdersNavMenu}
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                size={23}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        )
                    }}
                />
                <ShopNavigator.Screen
                    name="Admin"
                    component={AdminNavMenu}
                    options={{
                        drawerIcon: ({ focused, size }) => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                size={23}
                                color={focused ? '#7cc' : '#ccc'}
                            />
                        )
                    }}
                />
            </ShopNavigator.Navigator>
        </NavigationContainer>
    );
};

export default ShopNavMenu;