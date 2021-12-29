import React from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  TextInput,
  Linking,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  fetchEmergency,
  serviceEnquiry,
  serviceInformation,
} from '../../redux/actions';
import {Button, Spinner, Divider} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import Header from '../TopHeader';
import ServiceInformation from './ServiceInformation';

const CallIcon = props => <Ionicons name="call" size={16} color={'#3182ce'} />;
const SmsIcon = props => (
  <MaterialIcons name="sms" size={16} color={'#ffffff'} />
);
const EmailIcon = props => (
  <FontAwesome5 name="envelope" size={16} color={'#ffffff'} />
);
const WhatsappIcon = props => (
  <Ionicons name="md-logo-whatsapp" size={16} color={'#3182ce'} />
);
const EnquiryIcon = props => (
  <FontAwesome name="envelope" size={16} color={'#ffffff'} />
);
const MapIcon = props => (
  <Ionicons name="md-location" size={16} color={'#ffffff'} />
);

export default Classified = props => {
  const isFocused = useIsFocused();
  return isFocused ? <ClassifiedWrapper {...props} /> : null;
};

class Classified extends React.Component {
  constructor(props) {
    super(props);
    const {auth} = this.props;
    this.state = {
      enquiryModalVisible: false,
      selectedService: '',
      selectedServiceData: '',
      firstName: auth.user.LOGIN_NAME ? auth.user.LOGIN_NAME : '',
      lastName: '.',
      email: auth.user.EMAIL ? auth.user.EMAIL : '',
      mobile: auth.user.MOBILE_NUMBER ? auth.user.MOBILE_NUMBER : '',
      message: '',
      firstNameError: '',
      emailError: '',
      mobileError: '',
      messageError: '',
      serviceModalVisible: false,
    };
  }

  componentDidMount(){
    const{serviceId} = this.props.route.params;
    console.log('this.props', serviceId);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        <Text>sasasa</Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {fetchEmergency, serviceEnquiry, serviceInformation},
    dispatch,
  );

const ClassifiedWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Classified);

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    // height: height * 0.7,
  },
  cardContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
  },
  centeredView: {
    height: '53%',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  centeredView1: {
    height: '94%',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
  },
  centerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: width * 0.39,
    top: 13,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  centerIcon1: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    textAlign: 'center',
    left: width * 0.1,
    top: 18,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  cardsWrapper: {
    paddingBottom: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    padding: 5,
    // height: height * 0.68,
    borderRadius: 10,
    paddingHorizontal: 20,
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
