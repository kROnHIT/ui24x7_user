import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
    Button,
    Card,
    List,
    StyleService,
    Text,
    useStyleSheet,
    Icon

} from "@ui-kitten/components";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EmptyView = (props) => {
    return (
        <TouchableOpacity style={{
            ...styles.categoryBtn
        }}
        onPress={()=>{
            props.refreshAction()
        }}
        >
            <View style={{
                backgroundColor: "#e32f45",
                borderWidth: 0,
                borderColor: '#a6a6a6',
                ...styles.categoryIcon
            }}>
                <FontAwesome5 name={props.icon} size={30} color={"#ffffff"} />
            </View>
            <Text style={{
                color: "#e32f45",
                ...styles.categoryBtnTxt
            }}>{props.name}</Text>
        </TouchableOpacity>
    );
};

export default EmptyView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        width: '22%',
        marginHorizontal: 5,
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
