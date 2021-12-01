import React from 'react';
import {
  Dimensions,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
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
import {getState, getCity} from '../../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default Header = props => {
  const isFocused = useIsFocused();
  return isFocused ? <HeaderWrapper {...props} /> : null;
};

export const CloseIcon = () => (
  <FontAwesome name="close" size={18} color={'#cccccc'} />
);
let {width, height} = Dimensions.get('window');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateModalVisible: false,
      cityModalVisible: false,
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
    console.log('nav', this.props);
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.props.props.navigation.navigate('Profile')}>
          <Image
            source={require('../../../asset/icons/man.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  openStateLocation = visible => {
    this.setState({stateModalVisible: visible}, () => {
      this.props.getState();
    });
  };

  openCityModal = STATE_ID => {
    this.setState({stateModalVisible: false, cityModalVisible: true}, () => {
      this.props.getCity(STATE_ID);
    });
  };

  stateList = () => {
    const {state} = this.props.auth;
    if (state) {
      let stateListDate = state.map((value, key) => {
        return (
          <TouchableOpacity onPress={() => this.openCityModal(value.STATE_ID)}>
            <View style={{height: 30, marginBottom: 5}}>
              <Text category="h6" style={{}}>
                {value.STATE_NAME}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView
          style={{paddingHorizontal: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {stateListDate}
        </ScrollView>
      );
    }
  };

  cityList = () => {
    const {city} = this.props.auth;
    if (city) {
      let cityListDate = city.map((value, key) => {
        return (
          <TouchableOpacity
          // onPress={() => this.openCityModal(value.STATE_ID)}
          >
            <View style={{height: 30, marginBottom: 5}}>
              <Text category="h6" style={{}}>
                {value.CITY_NAME}
              </Text>
            </View>
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView
          style={{paddingHorizontal: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {cityListDate}
        </ScrollView>
      );
    }
  };

  closeCityModal = () => {
    this.setState({cityModalVisible: false});
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
              <Ionicons name="location-outline" size={15} color="#ffffff" />
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
              {this.stateList()}
            </View>
          </Modal>

          <Modal
            useNativeDriver={true}
            animationType="slide"
            transparent={true}
            visible={this.state.cityModalVisible}>
            <View style={styles.centeredView}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={{alignSelf: 'center', color: '#fff'}}
                  appearance="ghost"
                  size="medium"
                  onPress={() => {
                    this.closeCityModal();
                  }}>
                  X
                </Button>
                <View style={styles.centerIcon}>
                  <Text>Select City</Text>
                </View>
              </View>
              {this.cityList()}
            </View>
          </Modal>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({getState, getCity}, dispatch);

const HeaderWrapper = connect(mapStateToProps, mapDispatchToProps)(Header);

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
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
});
