import React from 'react';
import { Dimensions, View, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Select, SelectItem, Layout, Input, TopNavigation, Text } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from './component/card'
import * as Animatable from 'react-native-animatable';
import RNPickerSelect from "react-native-picker-select";
import OTPTextView from 'react-native-otp-textinput'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMessageToGuard, addFutureEntry } from "./../../redux/actions";
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
let { width, height } = Dimensions.get("window");

export default QuickActionScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <QuickActionWrapper {...props} /> : null
}

export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

const timeData = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: '8',
        value: '8',
    },
    {
        label: '12',
        value: '12',
    },
    {
        label: '24',
        value: '24',
    },
];

class QuickAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cabModalVisible: false,
            deliveryModalVisible: false,

            futureEntryTimeValue: '1',
            futureEntryVehicleNumber: '',
            futureEntryVisitingType: '',

            messageModalVisible: false,
            messageToGuard: ''
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


    setCabModalVisible(visible) {
        this.setState({ cabModalVisible: visible });
    }
    setDeliveryModalVisible(visible) {
        this.setState({ deliveryModalVisible: visible });
    }
    sumbitFutureEntry = (entryType) => {
        const {futureEntryTimeValue, futureEntryVehicleNumber, futureEntryVisitingType} = this.state;

        let data = {
            entryType: entryType,
            vehicleNo: futureEntryVehicleNumber,
            visitingType: futureEntryVisitingType,
            entryBy: moment().add(futureEntryTimeValue, 'hours').format("llll"),
            propertyId : this.props.auth.user.property.objectId
        }
        console.log('asasasasas', data);
        if(data){
            this.props.addFutureEntry({
                data, 
                callback: (res) => {
                    if (res) {
                        this.setState({ cabModalVisible: false, deliveryModalVisible: false })
                    }
                }
            });
        }
    }


    setMessageModalVisible(visible) {
        this.setState({ messageModalVisible: visible });
    }
    sumbitMessageToGuard = () => {
        const{messageToGuard} = this.state;
        const { auth } = this.props
        if(messageToGuard !== ''){
            this.props.addMessageToGuard({
                messageInfo: messageToGuard,
                propertyId: auth.user.property.objectId,
                callback: (res) => {
                    if (res) {
                        this.setState({ messageModalVisible: false, messageToGuard: '' })
                    }
                }
            })
        }
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Quick Action</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
                </View>



                <View style={{ marginTop: 10, ...styles.mainScreen }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#737373',
                        }}>
                        Allow Future Entry
                    </Text>
                    <View style={styles.categoryContainer}>
                        <Card name='CAB' icon="car-side" refreshAction={() => this.setCabModalVisible(true)} />
                        <Card name='DELIVERY' icon="shipping-fast" refreshAction={() => this.setDeliveryModalVisible(true)} />
                        <Card name='GUEST' icon="people-arrows" refreshAction={() => this.props.changeVendor()} />
                        <Card name='VISITING HELP' icon="cogs" refreshAction={() => this.props.changeVendor()} />
                    </View>
                </View>

                <View style={{ marginTop: 7, ...styles.mainScreen }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#737373',
                        }}>
                        Notify Gate
                    </Text>
                    <View style={styles.categoryContainer}>
                        <Card name='SECURITY ALERT' icon="shield-alt" refreshAction={() => this.props.navigation.navigate('SecurityAlert')} />
                        <Card name='MESSAGE TO GARD' icon="envelope" refreshAction={() => this.setMessageModalVisible(true)} />
                    </View>
                </View>




                <Animatable.View animation="fadeInUpBig">
                    <Modal
                        useNativeDriver={true}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.cabModalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                                    this.setCabModalVisible(!this.state.cabModalVisible);
                                }}>X</Button>
                                <View style={styles.centerIcon}>
                                    <FontAwesome5 name={'car-side'} size={30} color={"#ffffff"} />
                                </View>
                            </View>

                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                                    <Text style={styles.lightColor}>Allow my cab to enter in next (in hour)</Text>
                                </View>

                                <View style={{ marginVertical: 5 }}>
                                    <RNPickerSelect
                                        style={{
                                            iconContainer: {
                                                top: 10,
                                                right: 12,
                                            },
                                            ...pickerSelectStyles
                                        }}
                                        value={this.state.futureEntryTimeValue}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{ label: "Select Hour", value: null }}
                                        onValueChange={(value) => this.setState({ futureEntryTimeValue: value })}
                                        items={timeData}
                                        Icon={() => {
                                            return <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />;
                                        }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    <Text style={styles.lightColor}>Add last 4-digits of vehicle no</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 5 }}>
                                    <OTPTextView
                                        ref={(e) => (this.input1 = e)}
                                        containerStyle={styles.textInputContainer}
                                        textInputStyle={styles.roundedTextInput}
                                        handleTextChange={(text) => this.setState({ futureEntryVehicleNumber: text })}
                                        inputCount={4}
                                        keyboardType="numeric"
                                        tintColor='#e32f45'
                                    />
                                </View>
                                <View style={{ marginBottom: 5 }}>
                                    <Button
                                        style={{
                                            backgroundColor: '#e32f45',
                                            borderWidth: 0,
                                            marginTop: 10
                                        }}
                                        onPress={() => { this.sumbitFutureEntry('CAB') }}
                                        status="danger"
                                        accessoryLeft={AlarmIcon}
                                    >
                                        BUTTON
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    
                    {/* Delivery Modal */}
                    <Modal
                        useNativeDriver={true}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.deliveryModalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                                    this.setDeliveryModalVisible(!this.state.deliveryModalVisible);
                                }}>X</Button>
                                <View style={styles.centerIcon}>
                                    <FontAwesome5 name={'car-side'} size={30} color={"#ffffff"} />
                                </View>
                            </View>

                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                                    <Text style={styles.lightColor}>Allow delivery to enter in next (in hour)</Text>
                                </View>

                                <View style={{ marginVertical: 5 }}>
                                    <RNPickerSelect
                                        style={{
                                            iconContainer: {
                                                top: 10,
                                                right: 12,
                                            },
                                            ...pickerSelectStyles
                                        }}
                                        value={this.state.futureEntryTimeValue}
                                        useNativeAndroidPickerStyle={false}
                                        placeholder={{ label: "Select Hour", value: null }}
                                        onValueChange={(value) => this.setState({ futureEntryTimeValue: value })}
                                        items={timeData}
                                        Icon={() => {
                                            return <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />;
                                        }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    <Text style={styles.lightColor}>Add last 4-digits of vehicle no</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 5 }}>
                                    <OTPTextView
                                        ref={(e) => (this.input1 = e)}
                                        containerStyle={styles.textInputContainer}
                                        textInputStyle={styles.roundedTextInput}
                                        handleTextChange={(text) => this.setState({ futureEntryVehicleNumber: text })}
                                        inputCount={4}
                                        keyboardType="numeric"
                                        tintColor='#e32f45'
                                    />
                                </View>
                                <View style={{ marginBottom: 5 }}>
                                    <Button
                                        style={{
                                            backgroundColor: '#e32f45',
                                            borderWidth: 0,
                                            marginTop: 10
                                        }}
                                        onPress={() => { this.sumbitFutureEntry('DELIVERY') }}
                                        status="danger"
                                        accessoryLeft={AlarmIcon}
                                    >
                                        BUTTON
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        useNativeDriver={true}
                        animationType="slide"
                        transparent={true}
                        visible={this.state.messageModalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                                    this.setMessageModalVisible(!this.state.messageModalVisible);
                                }}>X</Button>
                                <View style={styles.centerIcon}>
                                    <FontAwesome5 name={'envelope'} size={30} color={"#ffffff"} />
                                </View>
                            </View>

                            <View style={styles.modalView}>
                                <View style={{ marginVertical: 5, marginTop: 50 }}>
                                    <Input
                                        textStyle={{ minHeight: 100, alignSelf: 'flex-start' }}
                                        multiline={true}
                                        textAlignVertical='top'
                                        placeholder='Write a message to send to the guard...'
                                        value={this.state.messageToGuard}
                                        onChangeText={nextValue => this.setState({ messageToGuard: nextValue })}
                                    />
                                </View>

                                <View style={{ marginBottom: 5 }}>
                                    <Button
                                        style={{
                                            backgroundColor: '#e32f45',
                                            borderWidth: 0,
                                            marginTop: 10
                                        }}
                                        status="danger"
                                        accessoryLeft={AlarmIcon}
                                        onPress={() => { this.sumbitMessageToGuard() }}
                                    >
                                        BUTTON
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Animatable.View>
            </SafeAreaView>
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
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: 5
    },
    textInputContainer: {
        marginVertical: 15,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 1,
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
        color: "#666666",
        fontSize: 20,
        fontWeight: '700'
    },
    centerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: "#e32f45",
        borderWidth: 2,
        borderColor: '#ffffff',
        position: 'absolute',
        left: width * 0.39,
        top: 5,
        elevation: (Platform.OS === 'android') ? 50 : 0
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e32f45',
        borderRadius: 8,
        color: 'black',
        marginVertical: 15
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e32f45',
        borderRadius: 8,
        color: 'black',
        marginVertical: 15
    },
});



const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addMessageToGuard,
            addFutureEntry,
        },
        dispatch
    );

const QuickActionWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuickAction);