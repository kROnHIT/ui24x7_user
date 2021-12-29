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
import {Button, Spinner, Divider} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

class ServiceInformation extends React.Component {
  constructor(props) {
    super(props);
    const {auth} = this.props;
    this.state = {};
  }

  componentDidMount() {}

  render() {
    console.log('newthis.props', this.props);
    const {info} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={{flex: 1}}>
            <Image
              source={{
                uri: `http://34.131.47.126:8080/PIC_COLLECTION/ayuktasecure/${info.IMAGES}`,
              }}
              style={{
                height: 160,
                width: 130,
              }}
            />
          </View>
          <View style={{flex: 2, paddingVertical: 10}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#4d4d4d',
                marginBottom: 3,
              }}>
              {info.NAME}
            </Text>
            {info && info.TAG_LINE ? (
              <Text
                style={{
                  fontSize: 12,
                  color: '#4d4d4d',
                  fontWeight: '600',
                  marginBottom: 3,
                }}>
                {info.TAG_LINE}
              </Text>
            ) : null}
            {info && info.ADDRESS ? (
              <Text style={{fontSize: 12, color: '#4d4d4d', marginBottom: 3}}>
                {info.ADDRESS}
              </Text>
            ) : null}
            <Text style={{fontSize: 12, color: '#4d4d4d'}}>
              {info.MOBILE_NUMBER}
            </Text>
            {info && info.EMAIL_ID && info.EMAIL_ID !== 'NA' ? (
              <Text style={{fontSize: 12, color: '#4d4d4d'}}>
                {info.EMAIL_ID}
              </Text>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              {info.IS_VERIFIED === 1 ? (
                <Image
                  source={require('../../../asset/icons/verified.png')}
                  resizeMode="contain"
                  style={{
                    width: 55,
                    marginRight: 5,
                  }}
                />
              ) : null}
              {info.IS_TRUSTED === 1 ? (
                <Image
                  source={require('../../../asset/icons/trusted.png')}
                  resizeMode="contain"
                  style={{
                    width: 55,
                    marginRight: 5,
                  }}
                />
              ) : null}
              {info.IS_UI24X7 === 1 ? (
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
          </View>
        </View>
        {/* <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => {
                Linking.openURL(`tel:${info.MOBILE_NUMBER}`);
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
                Linking.openURL(`sms:${info.MOBILE_NUMBER}`);
              }}
              style={{flex: 1, marginHorizontal: 2}}
              size="tiny"
              status="primary"
              accessoryLeft={SmsIcon}>
              SMS
            </Button>
            <Button
              onPress={() => {
                Linking.openURL(`mailto:${info.EMAIL_ID}`);
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
                  `whatsapp://send?text=hello&phone=${info.WHATSAPP_NUMBER}`,
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
              onPress={() => this.openEnquiryModalToggle(info)}
              style={{flex: 1, marginHorizontal: 2}}
              size="tiny"
              status="primary"
              accessoryLeft={EnquiryIcon}>
              Enquiry
            </Button>
            <Button
              onPress={() => {
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${info.ADDRESS}`,
                );
              }}
              style={{flex: 1, marginHorizontal: 2}}
              size="tiny"
              status="primary"
              accessoryLeft={MapIcon}>
              Map
            </Button>
          </View>
        </View> */}
      </SafeAreaView>
    );
  }
}

export default ServiceInformation;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    // flexDirection: 'row',
    // flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
  },
});
