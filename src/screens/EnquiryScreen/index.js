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
import { Button } from '@ui-kitten/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../TopHeader';
import { enquiry } from '../../redux/actions';
import Toast, { DURATION } from 'react-native-easy-toast';

export default Home = props => {
  const isFocused = useIsFocused();
  return isFocused ? <HomeWrapper {...props} /> : null;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      message: '',
      services: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      mobileError: '',
      messageError: '',
      servicesError: '',
    };
  }

  async showToast(message, length = 1000) {
    this.toast && this.toast.show(message, length);
  }

  sumbit = async () => {
    const { firstName, lastName, email, mobile, message, services } = this.state;
    let noError = true;

    if (!firstName) {
      this.setState({ firstNameError: true });
      noError = false;
    } else {
      this.setState({ firstNameError: false });
    }
    if (!lastName) {
      this.setState({ lastNameError: true });
      noError = false;
    } else {
      this.setState({ lastNameError: false });
    }
    if (!email) {
      this.setState({ emailError: true });
      noError = false;
    } else {
      this.setState({ emailError: false });
    }
    if (!mobile) {
      this.setState({ mobileError: true });
      noError = false;
    } else {
      this.setState({ mobileError: false });
    }
    if (!message) {
      this.setState({ messageError: true });
      noError = false;
    } else {
      this.setState({ messageError: false });
    }
    if (!services) {
      this.setState({ servicesError: true });
      noError = false;
    } else {
      this.setState({ servicesError: false });
    }
    if (noError) {
      // let data = `STUDENT_NAME=${name}&MOBILE_NUMBER=${mobile}&EMAIL_ID=${email}`;
      let data = `FIRST_NAME=${firstName}&LAST_NAME=${lastName}&EMAIL_ADDRESS=${email}&MOBILE_NUMBER=${mobile}&MESSAGE=${message}&SERVICES_NAME=${services}`;

      this.props.enquiry({
        data: data,
        callback: (res) => {
          if (res) {
            this.setState({
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              message: '',
              services: ''
            })
            this.showToast(res.Message, 1000);
          }
        },
      });
    } else {
      this.showToast('Pleease fill the form.', 1000);
    }
  };

  render() {
    const { auth } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        <View style={styles.cardsWrapper}>
          <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.firstName}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ firstName: value })}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.firstNameError ? (
            <Text style={styles.errorText}>First name cannot be blank</Text>
          ) : null}

          <Text style={styles.text_footer}>Last Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.lastName}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ lastName: value })}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.lastNameError ? (
            <Text style={styles.errorText}>Last  name cannot be blank</Text>
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

          <Text style={styles.text_footer}>Message</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.message}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ message: value })}
              placeholder="Message..."
              style={styles.text_input}
            />
          </View>
          {this.state.messageError ? (
            <Text style={styles.errorText}>Message cannot be blank</Text>
          ) : null}

          <Text style={styles.text_footer}>Service</Text>
          <View style={styles.action}>
            <FontAwesome name="gear" size={18} color={'#05357a'} />
            <TextInput
              value={this.state.services}
              placeholderTextColor="#707070"
              onChangeText={value => this.setState({ services: value })}
              placeholder="Student Name..."
              style={styles.text_input}
            />
          </View>
          {this.state.servicesError ? (
            <Text style={styles.errorText}>Services cannot be blank</Text>
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
            Submit
          </Button>
        </View>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{ backgroundColor: '#5a67d8' }}
          position="top"
          opacity={1}
          textStyle={{ color: '#FFFFFF' }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => bindActionCreators({ enquiry }, dispatch);

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);

const { height } = Dimensions.get('screen');
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
