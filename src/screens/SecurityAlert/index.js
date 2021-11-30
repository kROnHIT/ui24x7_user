import React from 'react';
import { Dimensions, View, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Button, Divider, Layout, Input, TopNavigation, Text } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addSecurity } from "./../../redux/actions";
import { useIsFocused } from '@react-navigation/native';

const categoryData = [
    {
        name: "FIRE",
        icon: "fire-alt",
    },
    {
        name: "STUCK IN LIFT",
        icon: "building"
    },
    {
        name: "ANIMAL THREAT",
        icon: "cat",
    },
    {
        name: "VISITOR THREAT",
        icon: "walking",
    }
]

export default SecurityScreen = (props) => {
    const isFocused = useIsFocused();
    return isFocused ? <SecurityWrapper {...props} /> : null
}

export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

class Security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'FIRE',
            securityMsg: '',
            user: null
        };
    }

    async componentDidMount() {
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


    mainCategory = () => {
        const { category } = this.state;
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{
                    ...styles.categoryBtn
                }}
                    onPress={() =>
                        this.setState({ category: item.name, securityMsg: '' })
                    }
                >
                    <View style={{
                        backgroundColor: (category == item.name) ? "#e32f45" : "#e6e6e6",
                        borderWidth: (category == item.name) ? 0 : 1,
                        borderColor: '#a6a6a6',
                        ...styles.categoryIcon
                    }}>
                        <FontAwesome5 name={item.icon} size={30} color={category === item.name ? "#ffffff" : "#a6a6a6"} />
                    </View>
                    <Text style={{
                        color: (category == item.name) ? "#e32f45" : "#4d4d4d",
                        ...styles.categoryBtnTxt
                    }}>{item.name}</Text>
                </TouchableOpacity>
            );
        };

        return (
            <View style={styles.categoryContainer}>
                <FlatList
                    data={categoryData}
                    showsHorizontalScrollIndicator={false}
                    // horizontal
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    numColumns={4}
                    columnWrapperStyle={{
                        // flex: 1,
                        justifyContent: "space-around"
                    }}
                />
            </View>
        )
    }

    sumbitSecurity = async () => {
        const {category, securityMsg, user} = this.state
        await this.props.addSecurity({
            alertType: category,
            note: securityMsg,
            raisedBy: user.user.objectId,
            propertyId: user.property.objectId,
        })
    }

    render() {
        // console.log('user', this.state.user);
        // console.log('props', this.props);
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <View>
                    <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Security</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
                </View>
                <View style={styles.mainScreen}>
                    {this.mainCategory()}
                    <Input
                        textStyle={{ minHeight: 100, alignSelf: 'flex-start' }}
                        multiline={true}
                        textAlignVertical='top'
                        placeholder='Please share your location and additional details for effective responce'
                        value={this.state.securityMsg}
                        onChangeText={nextValue => this.setState({ securityMsg: nextValue })}
                    />
                        <Button
                            style={{
                                backgroundColor: '#e32f45',
                                borderWidth: 0,
                                marginTop: 10
                            }}
                            status="danger"
                            accessoryLeft={AlarmIcon}
                            onPress={() => { this.sumbitSecurity() }}
                        >
                            BUTTON
                    </Button>
                </View>
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
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        marginHorizontal: 2,
    },
    categoryIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 13,
        textAlign: 'center'
    },
})


const mapStateToProps = (state) => {
    return { ...state };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addSecurity,
        },
        dispatch
    );

const SecurityWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Security);