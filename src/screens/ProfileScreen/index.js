import React from 'react';
import { Dimensions, View, Image, SafeAreaView, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Spinner } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Vehicle from './Vehicle';
import FamilyMember from './familyMember';
import DailyHelp from './dailyHelp';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');

export default Profile = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <ProfileWrapper {...props} /> : null
}

class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
        console.log('propsssss', this.props);
        const{auth} = this.props
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: 'rgba(255, 214, 204, 0.30)'
            }}>
                <View>
                    <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Profile</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
                </View>
                <View style={{ ...styles.mainScreen, marginTop: 20 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
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
                                        <Text style={styles.font1}>{auth.user.user.name}</Text>
                                        <Text style={styles.font2}>{auth.user.user.phoneNumber}</Text>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 25 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome5 style={{ borderWidth: 1, borderRadius: 50, paddingTop: 6, paddingHorizontal: 5, paddingBottom: 3, borderColor: '#808080' }} name="location-arrow" size={8} color="#808080" />
                                        <Text style={{ ...styles.font1, fontSize: 16, marginLeft: 10 }}>Share My Address</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <FamilyMember />
                        <Vehicle />
                        <DailyHelp /> 
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

// export default ProfileScreen;
const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            
        },
        dispatch
    );

const ProfileWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainScreen: {
        width: "90%",
        alignSelf: 'center',
        height: height-200
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
        height: 150,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2
    },
    font1: {
        fontSize: 19
    },
    font2: {
        fontSize: 16,
        color: '#e32f45'
    },
    font3: {
        fontSize: 17
    },
    font4: {
        fontSize: 15,
        color: '#e32f45'
    },
    normalCard: {
        width: '40%',
        height: 170,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 5,
        alignItems: 'stretch'
    },
    modalView: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    lightColor: {
        // color: "#666666",
        fontSize: 17,
    },
    input: {
        paddingVertical: 2,
        color: "#1D2029",
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#e32f45',
        borderRadius: 5,
        height: 40,
    },
    errorText: {
        fontSize: 15,
        color: '#e32f45'
    },
})