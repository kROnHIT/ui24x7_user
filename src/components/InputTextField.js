import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default class InputTextField extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                <TextInput
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.isSecure}
                    style={styles.input}
                    keyboardType='numeric'
                />
                <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 2,
        color: "#1D2029",
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#e32f45',
        borderRadius: 5,
        height: 40,
    }
});