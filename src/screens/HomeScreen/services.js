import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
              Services
            </Text>
            <TouchableOpacity
              onPress={() => this.props.props.navigation.navigate('Services')}>
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
              onPress={() => this.props.props.navigation.navigate('Classified', { classifiedName: 'Education' })}>
              <View style={styles.cardIcon}>
                <FontAwesome name="book" size={30} color="#6b46c1" />
              </View>
              <Text style={{...styles.cardTxt, color: '#6b46c1', marginTop:5}}>
                Education
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.props.navigation.navigate('Classified', { classifiedName: 'Consultants' })}>
              <View style={styles.cardIcon}>
                <Fontisto name="user-secret" size={30} color="#c53030" />
              </View>
              <Text style={{...styles.cardTxt, color: '#c53030', marginTop:5}}>
                Consultants
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.props.navigation.navigate('Classified', { classifiedName: 'RentHire' })}>
              <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                  name="account-search"
                  size={30}
                  color="#319795"
                />
              </View>
              <Text style={{...styles.cardTxt, color: '#319795', marginTop:5}}>
                Rent & Hire
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.card}}
              onPress={() => this.props.props.navigation.navigate('Classified', { classifiedName: 'HomeServices' })}>
              <View style={styles.cardIcon}>
                <Ionicons name="construct" size={30} color="#dd6b20" />
              </View>
              <Text style={{...styles.cardTxt, color: '#dd6b20'}}>
                Home Services
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
    borderRadius: 100
  },
  cardIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 14,
  },
  cardTxt: {
    width:70,
    alignSelf: 'center',
    // color: '#e32f45',
    fontSize: 12,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
  },
});
