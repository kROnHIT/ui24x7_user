import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from '@react-navigation/native';
import { logoutUser } from "../../redux/actions";
import moment from 'moment'

export default SettingScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <SettingWrapper {...props} /> : null
}
export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    async componentWillMount() {
        const authUser = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(authUser) })
    }

    RenderHeaderTitle = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Home')
                    }
                >
                    <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        // console.log('props', this.props);
        // console.log('state', this.state);
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 214, 204, 0.30)'
                }}>
                <View>
                    <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Setting</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
                </View>
                <View style={{ ...styles.mainScreen, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.fullCard}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{
                                    flex: 1
                                }}>
                                    <Image
                                        source={require('../../../asset/icons/man.png')}
                                        resizeMode='cover'
                                        style={{
                                            alignSelf: 'center',
                                            height: 70,
                                            width: 70,
                                            borderRadius: 50,
                                        }}
                                    />
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={styles.font1}>{this.state.user ? this.state.user.user.name.toUpperCase() : null}</Text>
                                    <Text style={styles.font2}>{this.state.user ? this.state.user.user.email : null}</Text>
                                    <Text style={styles.font2}>{this.state.user ? this.state.user.user.phoneNumber : null}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ ...styles.fullCard, height: 55 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.logoutUser(this.props.navigation)
                                    }
                                    style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10 }}
                                >
                                    <FontAwesome5
                                        name="power-off"
                                        size={20}
                                        color="#ffffff"
                                        style={{ backgroundColor: '#e62e00', padding: 5, borderRadius: 5, marginRight: 20, flex: 0.15 }}
                                    />
                                    <Text style={{ flex: 1, alignSelf: 'center' }}>Logout</Text>
                                    <FontAwesome5
                                        name="angle-right"
                                        size={24}
                                        color="#ccc"
                                        style={{ alignSelf: 'center', flex: 1, textAlign: 'right' }}
                                    />
                                </TouchableOpacity>
                                {/* <Divider/> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            logoutUser
        },
        dispatch
    );

const SettingWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainScreen: {
        width: "90%",
        alignSelf: 'center'
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    fullCard: {
        width: '100%',
        height: 110,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2
    },
    font1: {
        fontSize: 19,
        fontWeight: '700',
        color: '#4d4d4d'
    },
    font2: {
        fontSize: 16,
        color: '#e32f45'
    },
})
