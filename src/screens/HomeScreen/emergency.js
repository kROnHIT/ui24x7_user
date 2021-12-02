import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default Home = props => {
  const isFocused = useIsFocused();
  return isFocused ? <HomeWrapper {...props} /> : null;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('this.props', this.props);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cardsWrapper}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 5,
                flex: 1,
                marginLeft: 5,
              }}>
              Emergency
            </Text>
            <TouchableOpacity
              onPress={() => this.props.props.navigation.navigate('Emergency')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#5a67d8',
                  marginBottom: 5,
                  textAlign: 'right',
                  marginRight: 5,
                }}>
                Explore
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.navigation.navigate('SecurityAlert')}>
              <View style={styles.cardIcon}>
                <Fontisto name="doctor" size={30} color="#d53f8c" />
              </View>
              <Text style={{...styles.cardTxt, color: '#d53f8c', marginTop: 5}}>
                Doctor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.navigation.navigate('SecurityAlert')}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="hospital" size={30} color="#805ad5" />
              </View>
              <Text style={{...styles.cardTxt, color: '#805ad5', marginTop: 5}}>
                Hospital
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.navigation.navigate('SecurityAlert')}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="ambulance" size={30} color="#5a67d8" />
              </View>
              <Text style={{...styles.cardTxt, color: '#5a67d8', marginTop: 5}}>
                Ambulance
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.navigation.navigate('SecurityAlert')}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="fire-truck"
                  size={30}
                  color="#dd6b20"
                />
              </View>
              <Text style={{...styles.cardTxt, color: '#dd6b20', marginTop: 5}}>
                Fire Brigade
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 5,
    paddingBottom:8
  },
  card: {
    flex: 1,
    height: 85,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  cardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 14,
  },
  cardTxt: {
    width: 70,
    alignSelf: 'center',
    // color: '#e32f45',
    fontSize: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
