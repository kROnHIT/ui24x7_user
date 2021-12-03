import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { registerUser } from '../../redux/actions';
import { Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default Register = props => {
  const isFocused = useIsFocused();
  return isFocused ? <RegisterWrapper {...props} /> : null;
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'test',
      mobile: '9999999998',
      email: 'abc@g.com',
      upi: 'adfefs',
      sponsor: 'UI24X7',
      nameError: '',
      mobileError: '',
      emailError: '',
      upiError: '',
      sponsorError: '',
    };
  }

  componentDidMount() { }

  async showToast(message, length = 1000) {
    this.toast && this.toast.show(message, length);
  }

  sumbit = async () => {
    const { name, mobile, email, upi, sponsor } = this.state;
    let noError = true;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      console.log('Email is Not Correct');
      this.setState({ email: email, emailError: true });
      // noError = false;
      return false;
    }

    if (!name) {
      this.setState({ nameError: true });
      noError = false;
    } else {
      this.setState({ nameError: false });
    }
    if (mobile.length !== 10) {
      this.setState({ mobileError: true });
      noError = false;
    } else {
      this.setState({ mobileError: false });
    }
    if (!email) {
      this.setState({ emailError: true });
      noError = false;
    } else {
      this.setState({ emailError: false });
    }
    if (!upi) {
      this.setState({ upiError: true });
      noError = false;
    } else {
      this.setState({ upiError: false });
    }
    if (!sponsor) {
      this.setState({ sponsorError: true });
      noError = false;
    } else {
      this.setState({ sponsorError: false });
    }
    if (noError) {
      let data = `MOBILE_NUMBER=${mobile}&EMAIL=${email}&LOGIN_NAME=${name}&UPI_ACCOUNT=${upi}&SPONSOR_USERNAME=${sponsor}`;

      this.props.registerUser({
        data: data,
        callback: res => {
          if (res) {
            this.props.navigation.navigate('Splash');
          }
        },
      });
    }
  };

  render() {
    const { auth } = this.props;
    {
      auth && auth.message && auth.message !== ''
        ? this.showToast(auth.message, 1000)
        : null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../../../asset/logo-white.png')}
            style={styles.logo}
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_footer}>Login Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.name}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ name: value })}
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
              onChangeText={value => this.setState({ mobile: value })}
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
              onChangeText={value => this.setState({ email: value })}
              placeholder="E-mail Id..."
              style={styles.text_input}
            />
          </View>
          {this.state.emailError ? (
            <Text style={styles.errorText}>Enter valid e-mail id</Text>
          ) : null}

          <Text style={styles.text_footer}>UPI Number</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.upi}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ upi: value })}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.upiError ? (
            <Text style={styles.errorText}>UPI cannot be blank</Text>
          ) : null}

          <Text style={styles.text_footer}>Sponsor User Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.sponsor}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ sponsor: value })}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.sponsorError ? (
            <Text style={styles.errorText}>Sponsor name cannot be blank</Text>
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
          <Button
            style={[
              styles.submitContainer,
              {
                marginTop: 10,
              },
            ]}
            appearance="outline"
            disabled={auth.loading ? true : false}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            Login
          </Button>
        </Animatable.View>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{ backgroundColor: '#e53e3e' }}
          position="top"
          opacity={1}
          textStyle={{ color: '#FFFFFF' }}
        />
      </View>
    );
  }
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a67d8',
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

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser,
    },
    dispatch,
  );

const RegisterWrapper = connect(mapStateToProps, mapDispatchToProps)(Register);