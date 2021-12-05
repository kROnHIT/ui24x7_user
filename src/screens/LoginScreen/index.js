import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { loginWithPassword } from '../../redux/actions';
import { Button } from '@ui-kitten/components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Toast, { DURATION } from 'react-native-easy-toast';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default LoginScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <LoginWrapper {...props} /> : null
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isUserExit: false,
        };
    }

    sumbit = async () => {
        if (
            this.state.userName !== '' ?? this.state.password !== ''
        ) {
            await this.props.loginWithPassword({
                userName: this.state.userName,
                password: this.state.password,
                navigation: this.props.navigation,
                callback: a => {
                    this.props.navigation.navigate('Splash');
                    // if (a) {
                    //   this.showToast('Invalid', 1000);
                    // } else {
                    // }
                },
            });
        } else {
            this.showToast('Enter correct phone number', 1000);
        }
    };

    async showToast(message, length = 1000) {
        this.toast && this.toast.show(message, length);
    }

    render() {
        const { auth } = this.props;
        {
            auth && auth.message && auth.message !== ''
                ? this.showToast(auth.message, 1000)
                : null;
        }

        return (
            <View>
                <View style={{ marginTop: 130, alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../../asset/logo.png")} />
                    {/* <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>UI24x7</Text> */}
                </View>
                <View style={{ padding: 10, borderRadius: 10, shadowColor: '#ccc', marginTop:20 }}>
                    <TextInput
                        value={this.state.userName}
                        placeholder="User Name"
                        placeholderTextColor="#707070"
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={(value) => this.setState({ userName: value })}
                    />
                    <TextInput
                        value={this.state.password}
                        placeholder="Password"
                        placeholderTextColor="#707070"
                        style={{ ...styles.input, marginTop: 10 }}
                        onChangeText={(value) => this.setState({ password: value })}
                    />
                    <Button
                        status="primary"
                        style={{ marginTop: 10 }}
                        disabled={auth.loading ? true : false}
                        onPress={() => {
                            this.sumbit();
                        }}>
                        {auth.loading ? 'Loading...' : 'Log-in'}
                    </Button>

                    <Button
                        status="primary"
                        appearance="outline"
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            this.props.navigation.navigate('Register');
                        }}>
                        Register
                    </Button>
                </View>
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: '#5a67d8' }}
                    position='bottom'
                    opacity={0.8}
                    textStyle={{ color: '#FFFFFF' }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10
    },
    text: {
        fontFamily: "Avenir Next",
        color: "#1D2029"
    },
    link: {
        color: "#FF1654",
        fontSize: 14,
        fontWeight: "500"
    },
    submitContainer: {
        // backgroundColor: this.props.auth.loading ? '#cccccc' : '#FF1654',
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 32,
        color: "#FFF",
        borderWidth: 0,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5
    },
    input: {
        paddingVertical: 2,
        color: "#1D2029",
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#667eea',
        borderRadius: 5,
        height: 45,
    }
});


const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            loginWithPassword
        },
        dispatch
    );

const LoginWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);