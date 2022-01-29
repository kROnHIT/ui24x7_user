import React from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../TopHeader';
import Emergency from './emergency';
import Booking from './booking';
import Travel from './travel';
import Toast, {DURATION} from 'react-native-easy-toast';
import Services from './services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {setCity} from '../../redux/actions';

export default Home = props => {
  const isFocused = useIsFocused();
  return isFocused ? <HomeWrapper {...props} /> : null;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchKeyboard: ''};
  }

  componentDidMount() {
    console.log('setCity', this.props.auth.setCity);
    if (this.props.auth.setCity.length === 0) {
      console.log('asdsadsaas', Geolocation);
      // Geolocation.getCurrentPosition(
      //   position => {
      //     const initialPosition = JSON.stringify(position);
      //     console.log(initialPosition);
      //   },
      //   error => Alert.alert('Error', JSON.stringify(error)),
      //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      // );
      Geolocation.getCurrentPosition(position => {
        console.log('position', position);
        Geocoder.geocodePosition({
          // lat: 23.7103367,
          // lng: 86.397799,
          lat: 23.3754286,
          lng: 85.3085613,
          // lat: position.coords.latitude,
          // lng: position.coords.longitude,
        })
          .then(res => {
            console.log('res', res[0]);
            this.props.setCity({city: res[0].subAdminArea, state: res[0].adminArea});
          })
          .catch(err => console.log(err));
      });
    }
  }

  async showToast(message, length = 1000) {
    this.toast && this.toast.show(message, length);
  }

  searchResult = () => {
    const {searchKeyboard} = this.state;
    const {auth} = this.props;

    if (auth.setCity && auth.setCity.CITY_NAME) {
      if (searchKeyboard !== '') {
        this.props.navigation.navigate('SearchResult', {
          keyboard: this.state.searchKeyboard,
          stateId: auth.setCity.STATE_ID,
        });
      } else {
        this.showToast('Please enter to search.', 1000);
      }
    } else {
      this.showToast('Please select city.', 1000);
    }
  };
  render() {
    // console.log('props', this.props);
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        <View style={styles.searchCard}>
          <View style={styles.action}>
            <TextInput
              value={this.state.searchKeyboard}
              placeholder="Enter Keyword to Search"
              placeholderTextColor="#AFAFAF"
              style={styles.text_input}
              onChangeText={value => this.setState({searchKeyboard: value})}
            />
            <TouchableOpacity
              style={{height: '100%', width: 40, alignItems: 'center'}}
              onPress={() => this.searchResult()}>
              <FontAwesome
                name="search"
                size={20}
                color={'#5a67d8'}
                style={{marginTop: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Emergency props={this.props} />
        <Booking props={this.props} />
        <Travel props={this.props} />
        <Services props={this.props} />

        <Toast
          ref={toast => (this.toast = toast)}
          style={{backgroundColor: '#e53e3e'}}
          position="top"
          opacity={1}
          textStyle={{color: '#FFFFFF'}}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => bindActionCreators({setCity}, dispatch);

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchCard: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  action: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D3D1D1',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  text_input: {
    flex: 1,
    paddingLeft: 10,
    color: '#5a67d8',
    fontSize: 17,
  },
});
