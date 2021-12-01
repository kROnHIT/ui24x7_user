import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {TopNavigation, Text} from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useIsFocused} from '@react-navigation/native';
import {getState, getCity} from '../../redux/actions';
import Header from "../TopHeader"

export default LoginScreen = props => {
  const isFocused = useIsFocused();
  return isFocused ? <LoginWrapper {...props} /> : null;
};


class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {user} = this.props.auth;
    console.log('profile', user);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 214, 204, 0.30)',
        }}>
        <Header props={this.props} />
        <View style={{...styles.mainScreen, marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.fullCard}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Image
                    source={require('../../../asset/icons/man.png')}
                    resizeMode="cover"
                    style={{
                      alignSelf: 'center',
                      height: 60,
                      width: 60,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View style={{flex: 2.5}}>
                  <Text style={styles.font1}>
                    {user ? user.LOGIN_NAME.toUpperCase() : null}
                  </Text>
                  <Text style={styles.font2}>
                    {user ? user.EMAIL : null}
                  </Text>
                  <Text style={styles.font2}>
                    {user ? user.MOBILE_NUMBER : null}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{...styles.fullCard, height: 200, paddingVertical: 10}}>
              <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                <Text style={{...styles.font3, flex: 1}}>Username:</Text>
                <Text style={{...styles.font4, flex: 1.5}}>
                  {user.USERNAME}
                </Text>
              </View>
              <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                <Text style={{...styles.font3, flex: 1}}>Password:</Text>
                <Text style={{...styles.font4, flex: 1.5}}>
                  {user.PASSWORD}
                </Text>
              </View>
              {/* <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                <Text style={{...styles.font3, flex: 1}}>Blood Group:</Text>
                <Text style={{...styles.font4, flex: 1.5}}>
                  {user.USERNAME}
                </Text>
              </View> */}
              <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                <Text style={{...styles.font3, flex: 1}}>Joining Date:</Text>
                <Text style={{...styles.font4, flex: 1.5}}>
                  {user.ENTRY_DATE}
                </Text>
              </View>
              <View
                style={{flex: 1, flexDirection: 'row', paddingHorizontal: 30}}>
                <Text style={{...styles.font3, flex: 1}}>Login Status:</Text>
                <Text style={{...styles.font4, flex: 1.5}}>
                  {user.LOGIN_STATUS === 1 ? 'Active' : 'In-Active'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({getState, getCity}, dispatch);

const LoginWrapper = connect(mapStateToProps, mapDispatchToProps)(Update);

let ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScreen: {
    width: '90%',
    alignSelf: 'center',
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
    height: 110,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: 'rgba(255, 22, 84, 0.24)',
    shadowOffset: {width: 9, height: 9},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 2,
  },
  font1: {
    fontSize: 19,
    fontWeight: '700',
    color: '#4d4d4d',
  },
  font2: {
    fontSize: 16,
    color: '#05357a',
  },
  font3: {
    fontSize: 16,
    color: '#3E3E3E',
    fontWeight: 'bold',
  },
  font4: {
    fontSize: 16,
    color: '#3E3E3E',
  },
});
