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

  componentDidMount() {
    this.fetchEmergencyData();
  }

  fetchEmergencyData = async () => {
    const {auth, classified} = this.props;
    // if (auth.setCity && auth.setCity.length !== 0) {
    let data = `SERVICES_NAME=${this.props.route.params.classifiedName}&CITY_ID=${auth.setCity.CITY_ID}`;
    await this.props.fetchEmergency(data);
    // }
  };
  openEnquiryModalToggle = item => {
    this.setState({enquiryModalVisible: true, selectedService: item});
  };
  closeEnquiryModalToggle = visible => {
    this.setState({enquiryModalVisible: visible});
  };

  sumbit = () => {
    const {firstName, lastName, email, mobile, message, selectedService} =
      this.state;
    let noError = true;

    if (!firstName) {
      this.setState({firstNameError: true});
      noError = false;
    } else {
      this.setState({firstNameError: false});
    }
    if (!email) {
      this.setState({emailError: true});
      noError = false;
    } else {
      this.setState({emailError: false});
    }
    if (!mobile) {
      this.setState({mobileError: true});
      noError = false;
    } else {
      this.setState({mobileError: false});
    }
    if (!message) {
      this.setState({messageError: true});
      noError = false;
    } else {
      this.setState({messageError: false});
    }

    if (noError) {
      let data = `FIRST_NAME=${firstName}&LAST_NAME=${lastName}&EMAIL_ADDRESS=${email}&MOBILE_NUMBER=${mobile}&MESSAGE=${message}&SERVICES_NAME=${selectedService.SERVICES_NAME}&SERVICES_ID=${selectedService.SERVICES_ID}`;
      this.props.serviceEnquiry({
        data: data,
        callback: res => {
          if (res) {
            this.setState({
              message: '',
              selectedService: '',
              enquiryModalVisible: false,
            });
            this.showToast(res.Message, 1000);
          }
        },
      });
      console.log('data', data);
    }
  };

  async showToast(message, length = 1000) {
    this.toast && this.toast.show(message, length);
  }

  emergencyDataList = () => {
    const {auth, classified} = this.props;
    if (classified.emergencyData && classified.emergencyData.length !== 0) {
      const renderItem = ({item}) => {
        return (
          <TouchableOpacity onPress={() => this.openServiceModalToggle(item)}>
            <View style={styles.cardContainer}>
              <View style={{flex: 1}}>
                <Image
                  source={{
                    uri: `http://34.131.47.126:8080/PIC_COLLECTION/ayuktasecure/${item.IMAGES}`,
                  }}
                  style={{
                    height: '100%',
                    width: '90%',
                  }}
                />
              </View>
              <View style={{flex: 2, paddingVertical: 10}}>
                <Text
                  style={{fontSize: 14, fontWeight: '700', color: '#4d4d4d'}}>
                  {item.NAME}
                </Text>
                {item && item.TAG_LINE ? (
                  <Text
                    style={{fontSize: 12, color: '#4d4d4d', fontWeight: '600'}}>
                    {item.TAG_LINE}
                  </Text>
                ) : null}
                {item && item.ADDRESS ? (
                  <Text style={{fontSize: 12, color: '#4d4d4d'}}>
                    {item.ADDRESS}
                  </Text>
                ) : null}
                <Text style={{fontSize: 12, color: '#4d4d4d'}}>
                  {item.MOBILE_NUMBER}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {item.IS_VERIFIED === 1 ? (
                    <Image
                      source={require('../../../asset/icons/verified.png')}
                      resizeMode="contain"
                      style={{
                        width: 55,
                        marginRight: 5,
                      }}
                    />
                  ) : null}
                  {item.IS_TRUSTED === 1 ? (
                    <Image
                      source={require('../../../asset/icons/trusted.png')}
                      resizeMode="contain"
                      style={{
                        width: 55,
                        marginRight: 5,
                      }}
                    />
                  ) : null}
                  {item.IS_UI24X7 === 1 ? (
                    <Image
                      source={require('../../../asset/icons/ui24x7.png')}
                      resizeMode="contain"
                      style={{
                        width: 55,
                        marginRight: 5,
                      }}
                    />
                  ) : null}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => {
                      Linking.openURL(`tel:${item.MOBILE_NUMBER}`);
                    }}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    appearance="outline"
                    status="info"
                    accessoryLeft={CallIcon}>
                    Call Now
                  </Button>
                  <Button
                    onPress={() => {
                      Linking.openURL(`sms:${item.MOBILE_NUMBER}`);
                    }}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    status="primary"
                    accessoryLeft={SmsIcon}>
                    SMS
                  </Button>
                  <Button
                    onPress={() => {
                      Linking.openURL(`mailto:${item.EMAIL_ID}`);
                    }}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    status="primary"
                    accessoryLeft={EmailIcon}>
                    Email
                  </Button>
                </View>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <Button
                    onPress={() => {
                      Linking.openURL(
                        `whatsapp://send?text=hello&phone=+91${item.WHATSAPP_NUMBER}`,
                      );
                    }}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    appearance="outline"
                    status="info"
                    accessoryLeft={WhatsappIcon}>
                    Whatsapp
                  </Button>
                  <Button
                    onPress={() => this.openEnquiryModalToggle(item)}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    status="primary"
                    accessoryLeft={EnquiryIcon}>
                    Enquiry
                  </Button>
                  <Button
                    onPress={() => {
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${item.ADDRESS}`,
                      );
                    }}
                    style={{flex: 1, marginHorizontal: 2}}
                    size="tiny"
                    status="primary"
                    accessoryLeft={MapIcon}>
                    Map
                  </Button>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

      return (
        <View style={styles.categoryContainer}>
          <FlatList
            data={classified.emergencyData}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            contentContainerStyle={{paddingBottom: 170}}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Image
            source={require('../../../asset/icons/no_data.png')}
            resizeMode="contain"
            style={{
              width: '70%',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 26,
              alignSelf: 'center',
              color: '#000000',
            }}>
            No Data Available
          </Text>
        </View>
      );
    }
  };

  openServiceModalToggle = item => {
    this.setState(
      {serviceModalVisible: true, selectedServiceData: item},
      () => {
        this.props.serviceInformation(item.SERVICES_ID);
      },
    );
  };
  closeServiceModalToggle = visible => {
    this.setState({serviceModalVisible: visible});
  };

  render() {
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    const {auth, classified} = this.props;
    const {selectedServiceData} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />

        {auth.setCity && auth.setCity.length !== 0 ? (
          classified.loading ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner
                status="primary"
                style={{color: '#002440'}}
                size="giant"
              />
            </View>
          ) : (
            this.emergencyDataList()
          )
        ) : (
          <View>
            <Image
              source={require('../../../asset/icons/no_data.png')}
              resizeMode="contain"
              style={{
                width: '70%',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 26,
                alignSelf: 'center',
                color: '#000000',
              }}>
              Select the city first
            </Text>
          </View>
        )}

        <Animatable.View animation="fadeInUpBig">
          <Modal
            useNativeDriver={true}
            animationType="slide"
            transparent={true}
            visible={this.state.enquiryModalVisible}>
            <View style={styles.centeredView}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={{alignSelf: 'center', color: '#fff'}}
                  appearance="ghost"
                  size="medium"
                  onPress={() => {
                    this.closeEnquiryModalToggle(false);
                  }}>
                  X
                </Button>
                <View style={styles.centerIcon}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    Enquiry
                  </Text>
                </View>
              </View>

              <View style={styles.cardsWrapper}>
                <Text style={styles.text_footer}>Name</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" size={18} color={'#05357a'} />
                  <TextInput
                    value={this.state.firstName}
                    placeholderTextColor="#707070"
                    onChangeText={value => this.setState({firstName: value})}
                    placeholder="Name..."
                    style={styles.text_input}
                  />
                </View>
                {this.state.firstNameError ? (
                  <Text style={styles.errorText}>Name cannot be blank</Text>
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

                <Text style={styles.text_footer}>Message</Text>
                <View style={styles.action}>
                  <FontAwesome name="envelope-o" size={18} color={'#05357a'} />
                  <TextInput
                    value={this.state.message}
                    placeholderTextColor="#707070"
                    onChangeText={value => this.setState({message: value})}
                    placeholder="Message..."
                    style={styles.text_input}
                  />
                </View>
                {this.state.messageError ? (
                  <Text style={styles.errorText}>Message cannot be blank</Text>
                ) : null}

                <Button
                  style={{
                    marginTop: 10,
                  }}
                  // disabled={auth.loading ? true : false}
                  onPress={() => {
                    this.sumbit();
                  }}>
                  Submit
                </Button>
              </View>
            </View>
          </Modal>

          <Modal
            useNativeDriver={true}
            animationType="slide"
            transparent={true}
            visible={this.state.serviceModalVisible}>
            <View style={{...styles.centeredView1}}>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={{alignSelf: 'center', color: '#fff'}}
                  appearance="ghost"
                  size="giant"
                  onPress={() => {
                    this.closeServiceModalToggle(false);
                  }}>
                  X
                </Button>
                <View style={styles.centerIcon1}>
                  <Text
                    style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
                    {selectedServiceData && selectedServiceData.SERVICES_NAME}
                  </Text>
                </View>
              </View>
              <Divider />
              {classified.loading ? (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Spinner
                    status="primary"
                    style={{color: '#002440'}}
                    size="giant"
                  />
                </View>
              ) : classified.serviceInformation &&
                classified.serviceInformation !== '' ? (
                <ServiceInformation info={classified.serviceInformation} />
              ) : null}
            </View>
          </Modal>
        </Animatable.View>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{backgroundColor: '#5a67d8'}}
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
