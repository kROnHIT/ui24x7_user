import React from 'react';
import {
  Dimensions,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Input,
  TopNavigation,
  Text,
} from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const CloseIcon = () => (
  <FontAwesome name="close" size={18} color={'#cccccc'} />
);
let {width, height} = Dimensions.get('window');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateModalVisible: true,
    };
  }

  async componentWillMount() {
    const authUser = await AsyncStorage.getItem('user');
    this.setState({user: JSON.parse(authUser)});
  }

  RenderHeaderTitle = () => {
    return (
      <TouchableOpacity
        style={{width: 25, alignItems: 'center'}}
        onPress={() => this.props.navigation.navigate('Home')}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    );
  };

  RenderRightTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <FontAwesome5 name="align-left" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  openStateLocation = visible => {
    this.setState({stateModalVisible: visible});
  };

  render() {
    return (
      <View>
        <TopNavigation
          alignment="center"
          title={
            <Text
              onPress={() => this.openStateLocation(true)}
              style={{
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Location{' '}
              <Ionicons name="location-outline" size={20} color="#ffffff" />
            </Text>
          }
          accessoryLeft={this.RenderHeaderTitle}
          accessoryRight={this.RenderRightTitle}
          style={{backgroundColor: '#5a67d8', paddingHorizontal: 20}}
        />

        <Animatable.View animation="fadeInUpBig">
          <Modal
            useNativeDriver={true}
            animationType="slide"
            transparent={true}
            visible={this.state.stateModalVisible}>
            <View style={styles.centeredView}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={{alignSelf: 'center', color: '#fff'}}
                  appearance="ghost"
                  size="medium"
                  onPress={() => {
                    this.openStateLocation(false);
                  }}>
                  X
                </Button>
                <View style={styles.centerIcon}>
                  <Text>Select State</Text>
                </View>
              </View>

              <View style={styles.modalView}>
                <View style={{flexDirection: 'row', marginTop: 50}}>
                  <Text style={styles.lightColor}>
                    Allow my cab to enter in next (in hour)
                  </Text>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Text style={styles.lightColor}>
                    Add last 4-digits of vehicle no
                  </Text>
                </View>
                <View style={{marginBottom: 5}}>
                  <Button
                    style={{
                      backgroundColor: '#e32f45',
                      borderWidth: 0,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      this.sumbitFutureEntry('CAB');
                    }}
                    status="danger">
                    BUTTON
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Animatable.View>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  centeredView: {
    height: '53%',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  modalView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  centerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: width * 0.39,
    top: 13,
    elevation: (Platform.OS === 'android') ? 50 : 0
}
});
