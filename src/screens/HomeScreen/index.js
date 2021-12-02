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
import Services from './services';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <Header props={this.props} />
        <View style={styles.searchCard}>
          <View style={styles.action}>
            <FontAwesome name="search" size={20} color={'#5a67d8'} />
            <TextInput
              value={this.state.mobileNumber}
              placeholder="Enter Keyword to Search"
              placeholderTextColor="#AFAFAF"
              style={styles.text_input}
              onChangeText={value => this.setState({mobileNumber: value})}
            />
          </View>
        </View>
        <Emergency props={this.props} />
        <Booking props={this.props} />
        <Travel props={this.props} />
        <Services props={this.props} />
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
    backgroundColor:'#fff',
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
