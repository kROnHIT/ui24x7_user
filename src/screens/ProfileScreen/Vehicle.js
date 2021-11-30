import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Input } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addVehicle, fetchVehicle } from "./../../redux/actions";
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
export default FamilyScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <FamilyWrapper {...props} /> : null
}

export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

class FamilyMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleModal: false,
            vehicleName: '',
            vehicleNumber: '',
            vehicleNameError: false,
            vehicleNumberError: false,
        };
    }

    componentDidMount() {
        const { user } = this.props.auth.user
        this.props.fetchVehicle(user.objectId);
    }

    addVehicleModal(visible) {
        this.setState({ vehicleModal: visible });
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    submitFamilyMember = async () => {
        let noError = true;
        const { vehicleName, vehicleNumber } = this.state
        const { auth } = this.props
        
        if (!vehicleName) {
            this.setState({ vehicleNameError: true })
            noError = false;
        } else {
            this.setState({ vehicleNameError: false })
        }
        if (!vehicleNumber) {
            this.setState({ vehicleNumberError: true })
            noError = false;
        } else {
            this.setState({ vehicleNumberError: false })
        }

        if (noError) {
            console.log('ssss');
            await this.props.addVehicle({
                vehicleNumber: vehicleNumber,
                vehicleName: vehicleName,
                propertyId: auth.user.property.objectId,
                callback: (res) => {
                    if (res) {
                        this.setState({ vehicleModal: false })
                    }
                }
            })
        } else {
            console.log('error', this.state);
        }
    }

    getFamilyMemberList = () => {
        const { familyVehicleList } = this.props.profile;
        if (familyVehicleList) {
            let familyMemberData = familyVehicleList.map((list, key) => {
                return (
                    <View style={styles.normalCard}>
                        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                            <View style={{
                                // flex: 1
                            }}>
                                <Image
                                    source={require('../../../asset/icons/vehicle.png')}
                                    resizeMode='cover'
                                    style={{
                                        alignSelf: 'center',
                                        height: 60,
                                        width: 60,
                                        borderRadius: 50,
                                        marginTop: 10,
                                    }}
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Text style={styles.font3}>{list.vehicleName}</Text>
                                <Text style={styles.font4}>{list.vehicleNumber}</Text>
                            </View>
                        </View>
                        {/* <Divider />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                <FontAwesome5 style={{ borderWidth: 1, borderRadius: 50, paddingTop: 6, paddingHorizontal: 5, paddingBottom: 3, borderColor: '#808080' }} name="location-arrow" size={8} color="#808080" />
                                <FontAwesome5 style={{ borderWidth: 1, borderRadius: 50, paddingTop: 6, paddingHorizontal: 5, paddingBottom: 3, borderColor: '#808080' }} name="location-arrow" size={8} color="#808080" />
                            </View>
                        </View> */}
                    </View>
                )
            });

            return (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                >
                    {familyMemberData}
                </ScrollView>
            )
        }
    }

    render() {
        // console.log('props', this.props);
        return (
            <View>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={styles.container}>MY VEHICLE</Text>
                    <TouchableOpacity onPress={() => this.addVehicleModal(true)} >
                        <Text style={{ ...styles.container, textAlign: 'right', color: '#e32f45' }}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {this.getFamilyMemberList()}
                </View>



                <Animatable.View animation="fadeInUpBig">
                    <Modal
                        useNativeDriver={true}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.vehicleModal}
                    >
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                                        this.addVehicleModal(!this.state.vehicleModal);
                                    }}>X</Button>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                    <Text style={styles.lightColor}>Vehicle Name</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.vehicleName}
                                        placeholder="Enter Vehicle Name"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ vehicleName: value })}
                                    />
                                    {this.state.vehicleNameError ? (<Text style={styles.errorText}>Vehicle Name cannot be blank</Text>) : null}
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.lightColor}>Vehicle Number</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.vehicleNumber}
                                        placeholder="Enter Vehicle Number"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ vehicleNumber: value })}
                                    />
                                    {this.state.vehicleNumberError ? (<Text style={styles.errorText}>Vehicle number cannot be blank</Text>) : null}
                                </View>

                                <View style={{ marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.submitFamilyMember()} >
                                        <Text
                                            style={{
                                                backgroundColor: '#e32f45',
                                                borderWidth: 0,
                                                marginTop: 10,
                                                color: '#ffffff',
                                                paddingVertical: 13,
                                                textAlign: 'center'
                                            }}
                                            status="danger"
                                        >
                                            BUTTON
                                    </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Animatable.View>
            </View>
        )
    }
}

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
        // width: '40%',
        paddingHorizontal: 17,
        height: 130,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        marginHorizontal: 2
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

const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addVehicle,
            fetchVehicle
        },
        dispatch
    );

const FamilyWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(FamilyMember);