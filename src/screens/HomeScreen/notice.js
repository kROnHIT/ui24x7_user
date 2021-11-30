import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Spinner } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNoticeAll } from "./../../redux/actions";
import { PrivateValueStore, useIsFocused } from '@react-navigation/native';
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
            raiseComplainModal: false,
            complainText: '',
            photo: null,
            isLoading: false
        };
    }

    componentDidMount() {
        this.props.fetchNoticeAll(this.props.auth.user.property.objectId);
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

    getNoticeList = () => {
        const { noticeListAll } = this.props.home;

        if (noticeListAll && noticeListAll.length) {
            let complaintList = noticeListAll.map((value, key) => {
                return (
                    <View style={{ flexDirection: 'row', marginBottom: 10, paddingHorizontal: 20 }}>
                        <View style={styles.fullCard}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 }}>
                                <View style={{ flex: 2 }}>
                                    <Text style={styles.font1}>{value.notice}</Text>
                                </View>
                            </View>
                            <Divider />
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                                <Text style={styles.font2}>{moment(value.createdAt).format("llll")}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
            return (
                <ScrollView>
                    <View style={{ marginBottom: 120 }}>
                        {complaintList}
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <Text>You property have notany complain.</Text>
            )
        }
    }

    render() {
        console.log('state', this.props);
        const { loading } = this.props.home;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 214, 204, 0.30)'
                }}>
                <View>
                    <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Complain</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
                </View>
                {loading ? (
                    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center" }} >
                        <Spinner status="primary" style={{ color: "#002440" }} size='giant' />
                    </View>
                ) : (
                    <View style={{ height: 650, marginTop: 20 }}>
                        {this.getNoticeList()}
                    </View>
                )}
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
            fetchNoticeAll
        },
        dispatch
    );

const SettingWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting);

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        right: 20,
        bottom: 95,
        elevation: 0,
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
    fullCard: {
        paddingVertical: 20,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2
    },
    font1: {
        fontSize: 16,
        color: '#4d4d4d',
        fontWeight: '700',
        textAlign: 'justify'
    },
    font2: {
        fontSize: 14,
        color: '#808080'
    }
})