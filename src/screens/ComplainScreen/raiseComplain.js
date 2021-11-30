import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from '@react-navigation/native';
import { logoutUser } from "../../redux/actions";

export default RaiseComplainScreen = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? <RaiseComplainWrapper {...props} /> : null
}
export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

class RaiseComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  RenderHeaderTitle = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Complain')
          }
        >
          <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    // console.log('props', this.props);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 214, 204, 0.30)'
        }}>
        <View>
          <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Raise Complain</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
        </View>
        <View>
          <Text>aaaaaa</Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            // onPress={() => {
            //   props.refreshAction()
            // }}
          >
            <Text style={{
              color: "#ffffff",
              backgroundColor: "#e32f45",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20
            }}>Raise Complain</Text>
          </TouchableOpacity>
        </View>
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

    },
    dispatch
  );

const RaiseComplainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(RaiseComplain);

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    right: 20,
    bottom: 140,
    elevation: 0,
  },
})