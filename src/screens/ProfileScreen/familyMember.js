import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Input } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addFamilyMember, fetchFamilyMember } from "./../../redux/actions";
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
            familyModal: false,
            familyMemberName: '',
            familyMemberContact: '',
            familyMemberEmail: '',
            familyMemberRelation: '',
            familyMemberNameError: false,
            familyMemberContactError: false,
            familyMemberEmailError: false,
            familyMemberRelationError: false,
        };
    }

    componentDidMount() {
        const { user } = this.props.auth.user
        this.props.fetchFamilyMember(user.objectId);
    }

    addFamilyModal(visible) {
        this.setState({ familyModal: visible });
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    submitFamilyMember = async () => {
        let noError = true;
        const { familyMemberName, familyMemberContact, familyMemberEmail, familyMemberRelation } = this.state
        const { auth } = this.props
        // console.log('usersss', this.state);
        if (familyMemberEmail) {
            if (!this.validateEmail(familyMemberEmail)) {
                this.setState({ familyMemberEmailError: true })
                noError = false;
            } else {
                this.setState({ familyMemberEmailError: false })
            }
        }
        if (!familyMemberName) {
            this.setState({ familyMemberNameError: true })
            noError = false;
        } else {
            this.setState({ familyMemberNameError: false })
        }
        if (!familyMemberContact) {
            this.setState({ familyMemberContactError: true })
            noError = false;
        } else {
            this.setState({ familyMemberContactError: false })
        }
        if (!familyMemberRelation) {
            this.setState({ familyMemberRelationError: true })
            noError = false;
        } else {
            this.setState({ familyMemberRelationError: false })
        }

        if (noError) {
            await this.props.addFamilyMember({
                memberRelation: familyMemberRelation,
                name: familyMemberName,
                contactNumber: familyMemberContact,
                email: familyMemberEmail,
                propertyId: auth.user.property.objectId,
                callback: (res) => {
                    if (res) {
                        this.setState({ familyModal: false })
                    }
                }
            })
        } else {
            console.log('error', this.state);
        }
    }

    getFamilyMemberList = () => {
        const { familyMemberList } = this.props.profile;
        console.log('familyMemberList', familyMemberList);
        if (familyMemberList && familyMemberList.length) {
            let familyMemberData = familyMemberList.map((list, key) => {
                return (
                    <View style={styles.normalCard}>
                        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                            <View style={{
                                // flex: 1
                            }}>
                                <Image
                                    source={require('../../../asset/icons/users.png')}
                                    resizeMode='cover'
                                    style={{
                                        alignSelf: 'center',
                                        height: 60,
                                        width: 60,
                                        borderRadius: 50,
                                        marginTop: 10
                                    }}
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Text style={styles.font3}>{list.name}</Text>
                                <Text style={styles.font4}>{list.contactNumber}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                <FontAwesome5 style={{ borderWidth: 1, borderRadius: 50, paddingTop: 6, paddingHorizontal: 5, paddingBottom: 3, borderColor: '#808080' }} name="location-arrow" size={8} color="#808080" />
                                <FontAwesome5 style={{ borderWidth: 1, borderRadius: 50, paddingTop: 6, paddingHorizontal: 5, paddingBottom: 3, borderColor: '#808080' }} name="location-arrow" size={8} color="#808080" />
                            </View>
                        </View>
                    </View>
                )
            });

            return (
                <ScrollView
                    horizontal={true}
                >
                    {familyMemberData}
                </ScrollView>
            )
        }else{
            return(

                <View style={{...styles.normalCard, width: '100%', height: 100, alignItems:'center', justifyContent:'center'}}>
                <Text>No</Text>
            </View>
        )
        }
    }

    render() {
        // console.log('props', this.props);
        return (
            <View>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Text style={styles.container}>MY FAMILY</Text>
                    <TouchableOpacity onPress={() => this.addFamilyModal(true)} >
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
                        visible={this.state.familyModal}
                    >
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                                        this.addFamilyModal(!this.state.familyModal);
                                    }}>X</Button>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                    <Text style={styles.lightColor}>Full Name</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.familyMemberName}
                                        placeholder="Enter Member Name"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ familyMemberName: value })}
                                    />
                                    {this.state.familyMemberNameError ? (<Text style={styles.errorText}>Name cannot be blank</Text>) : null}
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.lightColor}>Contact Number</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.familyMemberContact}
                                        placeholder="Enter Contact Number"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ familyMemberContact: value })}
                                    />
                                    {this.state.familyMemberContactError ? (<Text style={styles.errorText}>Contact number cannot be blank</Text>) : null}
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.lightColor}>Email ID</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.familyMemberEmail}
                                        placeholder="Enter Email ID"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ familyMemberEmail: value })}
                                    />
                                    {this.state.familyMemberEmailError ? (<Text style={styles.errorText}>Invalid Email ID</Text>) : null}

                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={styles.lightColor}>Relation With</Text>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <TextInput
                                        value={this.state.familyMemberRelation}
                                        placeholder="Enter Your Relation"
                                        style={{ ...styles.input }}
                                        onChangeText={(value) => this.setState({ familyMemberRelation: value })}
                                    />
                                    {this.state.familyMemberRelationError ? (<Text style={styles.errorText}>Relation cannot be blank</Text>) : null}
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
        height: 170,
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
            addFamilyMember,
            fetchFamilyMember
        },
        dispatch
    );

const FamilyWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(FamilyMember);