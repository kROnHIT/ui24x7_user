import React from 'react';
import {View, ImageBackground, Image, StyleSheet, Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutUser, checkUser} from '../redux/actions';
import {useIsFocused} from '@react-navigation/native';

export default SplashScreen = props => {
  const isFocused = useIsFocused();
  return isFocused ? <SplashWrapper {...props} /> : null;
};

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      springValue: new Animated.Value(0.3),
      user: null,
    };
  }

  componentDidMount() {
    this.checkUserData();
    this._springAnimation();
  }

  _springAnimation = () => {
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  };

  checkUserData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('user');
      console.log('valueString', valueString);
      const value = JSON.parse(valueString);
      if (value && value !== null) {
        await this.props.checkUser({
          value,
          navigation: this.props.navigation,
          callback: () => {
            this.props.navigation.navigate('App', { screen: 'Home' });
          },
        });
      }
    } catch (error) {}
  };

  render() {
    const {user} = this.state;
    console.log('state', this.state);
    console.log('lklklklklk', this.props);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Text
          style={{
            fontSize: 32,
            fontWeight: '600',
            width: '100%',
            textAlign: 'center',
            transform: [{scale: this.state.springValue}],
          }}>
          UI24x7
        </Animated.Text>
        {this.props.navigation.navigate('LoginStackScreen')}
        {/* {user === null
          ? this.props.navigation.navigate('Splash')
          : user ? this.props.navigation.navigate('App')
            : this.props.navigation.navigate('LoginStackScreen')
        } */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkUser,
      logoutUser,
    },
    dispatch,
  );

const SplashWrapper = connect(mapStateToProps, mapDispatchToProps)(Splash);
