import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { phone_validate, loginWithPassword, verifyOtp, registerUser } from "../../redux/actions";
import { Button } from '@ui-kitten/components';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Toast, { DURATION } from 'react-native-easy-toast';
import { useIsFocused } from '@react-navigation/native';

export default LoginScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <LoginWrapper {...props} /> : null
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            otp: '',
            password: '',
            name: '',
            email: '',
            isUserExit: false,
            otpVerify: false,
        };
    }

    componentDidMount() {
        const { mobileNumber } = this.props.route.params;
        if (mobileNumber) {
            this.setState({ mobileNumber: mobileNumber })
        }
    }

    async showToast(message, length = 1000) {
        this.toast && this.toast.show(message, length);
    }

    sumbit = async () => {
        const { otpVerify } = this.state;
        if (otpVerify) {
            const { name, email, mobileNumber, password } = this.state;
            if (name && mobileNumber && password) {
                let data = {
                    'email': email,
                    'phoneNumber': mobileNumber,
                    'password': password,
                    'countryCode': '+91',
                    'name': name,
                    'phoneVerified': true,
                    'emailVerified': true
                }

                this.props.registerUser({
                    data,
                    callback: (res) => {
                        if (res) {
                            this.props.navigation.navigate('Login', { isRegistered: true })
                        }
                    }
                })
            } else {
                this.showToast(
                    'Pleease fill the form.',
                    1000,
                );
            }
            console.log('aaallllalal', data);
        } else {
            let data = {
                'type': 'MOBILE',
                'reqContactInfo': this.state.mobileNumber,
                'otp': this.state.otp
            }
            this.props.verifyOtp({
                data,
                callback: (res) => {
                    if (res) {
                        this.setState({ otpVerify: true })
                    }
                }
            })
        }
        // this.props.navigation.navigate("Home")
        // if (!this.state.isUserExit) {
        //     if (this.state.mobileNumber && this.state.mobileNumber.length === 10) {
        //         await this.props.phone_validate({
        //             data: this.state.mobileNumber,
        //             callback: () => {
        //                 this.setState({ isUserExit: true })
        //             }
        //         })
        //     } else {
        //         console.log('10 digit');
        //         this.showToast(
        //             'Enteer 10 digit mobile number',
        //             1000,
        //         );
        //     }
        // }

        // if (this.state.isUserExit) {
        //     if (this.state.password !== '') {
        //         await this.props.loginWithPassword({
        //, registerUser             mobile: this.state.mobileNumber,
        //             password: this.state.password,
        //             navigation: this.props.navigation,
        //         })
        //     } else {
        //         // console.log("error", "enter password");
        //         this.showToast(
        //             'Enteer password',
        //             1000,
        //         );
        //     }
        // }
    }
    render() {
        console.log('prosp', this.props);

        const { auth } = this.props;

        return (
            <View>
                <View style={{ marginTop: 130, alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../../asset/logo.png")} />
                    <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>Apna Gate</Text>
                </View>
                <View style={{ padding: 10, borderRadius: 10, shadowColor: '#ccc' }}>
                    <Text>Mobile Number</Text>
                    <TextInput
                        value={this.state.mobileNumber}
                        placeholder="Phone Number"
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={(value) => this.setState({ mobileNumber: value })}
                    />

                    {this.state.otpVerify === false ? (
                        <View>
                            <Text>OTP</Text>
                            <TextInput
                                value={this.state.otp}
                                placeholder="OTP"
                                style={styles.input}
                                keyboardType='numeric'
                                onChangeText={(value) => this.setState({ otp: value })}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text>Password</Text>
                            <TextInput
                                value={this.state.password}
                                placeholder="Password"
                                style={styles.input}
                                keyboardType='numeric'
                                onChangeText={(value) => this.setState({ password: value })}
                            />
                            <Text>Name</Text>
                            <TextInput
                                value={this.state.name}
                                placeholder="Name"
                                style={styles.input}
                                keyboardType='numeric'
                                onChangeText={(value) => this.setState({ name: value })}
                            />
                            <Text>Email</Text>
                            <TextInput
                                value={this.state.email}
                                placeholder="Email"
                                style={styles.input}
                                keyboardType='numeric'
                                onChangeText={(value) => this.setState({ email: value })}
                            />
                        </View>
                    )}

                    <Button style={[
                        styles.submitContainer, {
                            backgroundColor: `${auth.loading ? '#800022' : '#FF1654'}`
                        }
                    ]}
                        onPress={() => { this.sumbit() }}
                        disabled={auth.loading ? true : false}
                    >
                        {/* {this.state.otpVerify ? 'Register' : 'Verify'} */}
                        {auth.loading ? 'Loading...' : this.state.otpVerify ? 'Register' : 'Verify'}
                    </Button>
                    {/* </TouchableOpacity> */}
                </View>
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: 'red' }}
                    position='center'
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
        borderColor: '#e32f45',
        borderRadius: 5,
        height: 40,
        marginBottom: 5
    }
});


const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            phone_validate,
            loginWithPassword,
            verifyOtp,
            registerUser,
        },
        dispatch
    );

const LoginWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);