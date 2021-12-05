import React from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../TopHeader';

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
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
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
              Travel
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#fff5f7'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Flight' })}>
              <View style={styles.cardIcon}>
                <Entypo name="aircraft" size={35} color="#d53f8c" />
              </View>
              <Text style={{...styles.cardTxt, color: '#d53f8c'}}>Flight</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#faf5ff'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Bus' })}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="bus-alt" size={35} color="#805ad5" />
              </View>
              <Text style={{...styles.cardTxt, color: '#805ad5'}}>Bus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#ebf4ff'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Trains' })}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="train" size={35} color="#5a67d8" />
              </View>
              <Text style={{...styles.cardTxt, color: '#5a67d8'}}>Trains</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#fffaf0'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'CarRentals' })}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="car-side" size={35} color="#dd6b20" />
              </View>
              <Text style={{...styles.cardTxt, color: '#dd6b20'}}>
                Car Rentals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#f0fff4'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'BikeRentals' })}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="motorbike"
                  size={35}
                  color="#38a169"
                />
              </View>
              <Text style={{...styles.cardTxt, color: '#38a169'}}>
                Bike Rentals
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#fff5f7'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Tempo' })}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="truck" size={35} color="#d53f8c" />
              </View>
              <Text style={{...styles.cardTxt, color: '#d53f8c'}}>Tempo</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#ebf8ff'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Hotels' })}>
              <View style={styles.cardIcon}>
                <FontAwesome5 name="hotel" size={35} color="#3182ce" />
              </View>
              <Text style={{...styles.cardTxt, color: '#3182ce'}}>Hotels</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card, backgroundColor: '#fffff0'}}
              onPress={() => this.props.navigation.navigate('Classified', { classifiedName: 'Resorts' })}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons name="water-well" size={35} color="#d69e2e" />
              </View>
              <Text style={{...styles.cardTxt, color: '#d69e2e'}}>Resorts</Text>
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
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 5,
  },
  card: {
    flex: 1,
    width: 80,
    height: 73,
    marginHorizontal: 4,
    borderRadius: 5,
    // alignSelf: 'center',
  },
  cardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  cardTxt: {
    alignSelf: 'center',
    // color: '#e32f45',
    fontSize: 12,
  },
});
