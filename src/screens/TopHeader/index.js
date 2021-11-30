import React from 'react';
import { Dimensions, View, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Button, Divider, Layout, Input, TopNavigation, Text } from '@ui-kitten/components';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
export const CloseIcon = () => <FontAwesome name="close" size={18} color={'#cccccc'} />;
let { width, height } = Dimensions.get("window");

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentWillMount() {
        const authUser = await AsyncStorage.getItem('user');
        this.setState({user: JSON.parse(authUser)})
    }

    openProfileModal(visible) {
        this.setState({ profileModal: visible });
    }

    RenderHeaderTitle = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}> Hi,  {this.state.user ? this.state.user.LOGIN_NAME.toUpperCase(): null}</Text>
            </View>
        );
    };

    render() {
        return (
            <View>
                <TopNavigation alignment="center" accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
            </View>
        )
    }
}

export default Header;

const styles = StyleSheet.create({
    centeredView: {
        height: '93%',
        marginTop: 'auto',
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
    },
    modalView: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    logo: {
        padding: 20,
        height: 80,
        width: 220,
        resizeMode: "center",
    },
})