import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from '@ui-kitten/components';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
    const {auth} = this.props;
    console.log('this.props', this.props);
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        <View style={styles.cardsWrapper}>
          <Text style={styles.text_footer}>Student Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.name}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({name: value})}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.nameError ? (
            <Text style={styles.errorText}>Name cannot be blank</Text>
          ) : null}

          <Text style={styles.text_footer}>Mobile Number</Text>
          <View style={styles.action}>
            <FontAwesome name="mobile" size={25} color={'#05357a'} />
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              value={this.state.mobile}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({mobile: value})}
              placeholder="Mobile Number..."
              style={styles.text_input}
            />
          </View>
          {this.state.mobileError ? (
            <Text style={styles.errorText}>
              Enter 10 digit valid mobile number
            </Text>
          ) : null}

          <Text style={styles.text_footer}>E-mail Id</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" size={17} color={'#05357a'} />
            <TextInput
              value={this.state.email}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({email: value})}
              placeholder="E-mail Id..."
              style={styles.text_input}
            />
          </View>
          {this.state.emailError ? (
            <Text style={styles.errorText}>Enter valid e-mail id</Text>
          ) : null}

          <Button
            style={[
              styles.submitContainer,
              {
                marginTop: 10,
              },
            ]}
            disabled={auth.loading ? true : false}
            onPress={() => {
              this.sumbit();
            }}>
            Register
          </Button>
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

const {height} = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 5,
    height: height * 0.68,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    resizeMode: 'contain',
  },
  text_header: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
    marginBottom: 2,
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text_input: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    padding: 0,
    height: 35,
  },
  errorText: {
    fontSize: 13,
    color: '#e32f45',
  },
});
