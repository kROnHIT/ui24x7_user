import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutUser, checkUser} from '../redux/actions';
import {Divider} from '@ui-kitten/components';

class Drawer extends React.Component {
  render() {
    console.log('asdsadsa', this.props);
    const {user} = this.props.auth;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.28,
            paddingTop: 5,
            paddingHorizontal: 20,
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 25,
              color: '#05357a',
              marginTop: 10,
            }}>
            {user && user.LOGIN_NAME}
          </Text>
          <Text style={{fontSize: 16, marginTop: 5, color: '#05357a'}}>
            {user && user.EMAIL}
          </Text>
          <Text style={{fontSize: 14, marginTop: 5, color: '#05357a'}}>
            {user && user.MOBILE_NUMBER}
          </Text>
        </View>

        <View
          style={{
            flex: 0.61,
          }}>
          <Divider />
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="home" size={20} color={'#05357a'} />
              <Text style={styles.title}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="person-circle" size={20} color={'#05357a'} />
              <Text style={styles.title}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Emergency');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="card-account-details"
                size={17}
                color="#05357a"
              />
              <Text style={styles.title}>Emergency</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Booking');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="book" size={18} color={'#05357a'} />
              <Text style={styles.title}>Booking</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Travel');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="book" size={18} color={'#05357a'} />
              <Text style={styles.title}>Travel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Services');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="book" size={18} color={'#05357a'} />
              <Text style={styles.title}>Services</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Enquiry');
              }}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="book" size={18} color={'#05357a'} />
              <Text style={styles.title}>Enquiry</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 0.1,
          }}>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => this.props.logoutUser(this.props.navigation)}
              style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons name="log-out" size={25} color={'#05357a'} />
              <Text style={styles.title}>Logout</Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={{flexDirection: 'row', paddingLeft: 30, marginTop: 5}}>
            <Ionicons
              onPress={() =>
                this.loadInBrowser('https://www.facebook.com/KohaTalent/')
              }
              style={{flex: 1}}
              name="md-logo-facebook"
              size={22}
              color={'#373737'}
            />
            <Ionicons
              onPress={() =>
                this.loadInBrowser('https://twitter.com/KohaTalent/')
              }
              style={{flex: 1}}
              name="md-logo-twitter"
              size={22}
              color={'#373737'}
            />
            <Ionicons
              onPress={() =>
                this.loadInBrowser(
                  'https://www.instagram.com/Koha_scholarship/',
                )
              }
              style={{flex: 1}}
              name="md-logo-instagram"
              size={22}
              color={'#373737'}
            />
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
  bindActionCreators(
    {
      logoutUser,
      checkUser,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
const styles = StyleSheet.create({
  item: {
    paddingVertical: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  title: {
    color: '#05357a',
    fontSize: 14,
    marginLeft: 20,
    fontWeight: '600',
  },
});
