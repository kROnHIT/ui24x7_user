import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Input, Spinner } from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addComplain, fetchComplain } from "./../../redux/actions";
import { PrivateValueStore, useIsFocused } from '@react-navigation/native';
import Utils from '../Components/Utils';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment'
import ImageResizer from 'react-native-image-resizer'
import Toast, { DURATION } from 'react-native-easy-toast';
const { width, height } = Dimensions.get('screen');

var ImagePicker = require('react-native-image-picker');
export default SettingScreen = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? <SettingWrapper {...props} /> : null
}
export const AlarmIcon = () => <Ionicons name="radio-sharp" size={20} color={'#ffffff'} />;

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raiseComplainModal: false,
      complainText: '',
      photo: null,
      isLoading: false
    };
  }

  componentDidMount() {
    this.props.fetchComplain(this.props.auth.user.property.objectId);
  }

  RenderHeaderTitle = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        >
          <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  addRaiseComplainModal(visible) {
    this.setState({ raiseComplainModal: visible });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response && response.assets) {
        console.log('looo', response);
        this.setState({ photo: response.assets[0] })
      }
    })
  }

  async showToast(message, length = 1000) {
    this.toast && this.toast.show(message, length);
  }

  uploadImage = async () => {
    const { photo } = this.state;
    if (photo && photo.uri) {
      let fileUri = photo.uri;
      const dirPath = await this.initPhotoDir()
      this.setState({ isLoading: true })
      let destPath = dirPath + `/${moment().unix()}.jpg`
      try {
        let resizeDetails = await ImageResizer.createResizedImage(
          fileUri,
          1024,
          1024,
          'JPEG',
          50,
          0,
          dirPath
        )
        await RNFetchBlob.fs.unlink(fileUri)

        if (Platform.OS === 'android') {
          destPath = resizeDetails.uri
        } else {
          destPath = resizeDetails.path
        }
      } catch (resizeError) {
        console.error('Resize error', resizeError)
        throw resizeError
      }

      try {
        let photoPath = { source: { uri: destPath } }
        let parseFiles = await Utils.uploadFiles([photoPath])
        let imageContent = JSON.parse(JSON.stringify(parseFiles[0]))

        this.setState({ isLoading: false })
        await this.props.addComplain({
          complaint: this.state.complainText,
          imageUrl: imageContent.url,
          propertyId: this.props.auth.user.property.objectId,
          callback: (res) => {
            if (res) {
              this.setState({ raiseComplainModal: false })
            }
          }
        });
        return parseFiles[0]
      } catch (error) {
        console.error('Failed to Upload Image. Error: ' + error)
        this.setState({ isLoading: false })
        throw error
      }
    } else {
      this.showToast(
        'Please select imagee',
        1000,
      );
    }
  }

  initPhotoDir = async () => {
    let dirPath = RNFetchBlob.fs.dirs.DocumentDir
    if (Platform.OS === 'android') {
      dirPath = `${RNFetchBlob.fs.dirs.PictureDir}/myfolder`
      try {
        const dirExist = await RNFetchBlob.fs.isDir(dirPath)
        if (!dirExist) {
          await RNFetchBlob.fs.mkdir(dirPath)
        }
      } catch (dirError) {
        console.warn(dirError)
      }
    }
    dirPath = dirPath + `/${moment().unix()}`
    try {
      const dirExist = await RNFetchBlob.fs.isDir(dirPath)
      if (!dirExist) {
        await RNFetchBlob.fs.mkdir(dirPath)
      }
      this.state.dirPath = dirPath
    } catch (dirError) {
      console.warn(dirError)
    }
    return dirPath
  }

  getComplainList = () => {
    const { complainList } = this.props.complain;

    if (complainList && complainList.length) {
      let complaintList = complainList.map((value, key) => {
        return (
          <View style={{ flexDirection: 'row', marginBottom: 10, paddingHorizontal: 20 }}>
            <View style={styles.fullCard}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingHorizontal: 10 }}>
                <View style={{
                  flex: 1
                }}>
                  <Image
                    source={{ uri: value.imageUrl }}
                    resizeMode='cover'
                    style={{
                      alignSelf: 'center',
                      height: 70,
                      width: 70,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={styles.font1}>{value.complaint}</Text>
                </View>
              </View>
              <Divider />
              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                <Text style={styles.font2}>{moment(value.createdAt).format("llll")}</Text>
              </View>
            </View>
          </View>
        )
      })
      return (
        <ScrollView
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}
        >
          <View style={{marginBottom:80}}>
            {complaintList}
          </View>
        </ScrollView>
      )
    } else {
      return (
        <Text>You property have notany complain.</Text>
      )
    }
  }

  render() {
    console.log('state', this.props);
    const { loading } = this.props.complain
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 214, 204, 0.30)'
        }}>
        <View>
          <TopNavigation alignment="center" title={<Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold' }}>Complain</Text>} accessoryLeft={this.RenderHeaderTitle} style={{ backgroundColor: '#e32f45' }} />
        </View>
        {loading ? (
          <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center" }} >
            <Spinner status="primary" style={{ color: "#002440" }} size='giant' />
          </View>
        ) : (
          <View style={{ height: height - 200, marginTop: 20 }}>
            {this.getComplainList()}
          </View>
        )}

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() =>
              this.addRaiseComplainModal(true)
            }
          >
            <Text style={{
              color: "#ffffff",
              backgroundColor: "#e32f45",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 20
            }}>Raise Complain</Text>
          </TouchableOpacity>
        </View>

        <Animatable.View animation="fadeInUpBig">
          <Modal
            useNativeDriver={true}
            animationType="slide"
            transparent={true}
            visible={this.state.raiseComplainModal}
          >
            <View style={styles.centeredView}>

              <View style={styles.modalView}>
                <View style={{ flexDirection: 'row' }}>
                  <Button style={{ alignSelf: 'center', color: '#fff' }} appearance='ghost' size='medium' onPress={() => {
                    this.addRaiseComplainModal(!this.state.raiseComplainModal);
                  }}>X</Button>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Input
                    textStyle={{ minHeight: 100, alignSelf: 'flex-start' }}
                    multiline={true}
                    textAlignVertical='top'
                    placeholder='Please write the complain in details (Max 1000)'
                    value={this.state.complainText}
                    onChangeText={nextValue => this.setState({ complainText: nextValue })}
                  />
                  {this.state.nameError ? (<Text style={styles.errorText}>Complain field cannot be blank</Text>) : null}
                </View>



                <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                  <Text style={{ flex: 1, fontWeight: '700', color: '#e32f45' }} onPress={this.handleChoosePhoto}>
                    <Ionicons name="document-attach" size={20} color={'#e32f45'} />
                    Attach Photo
                  </Text>
                  {this.state.photo && (
                    <View style={{ flex: 1 }}>
                      <Image
                        source={{ uri: this.state.photo.uri }}
                        style={{ width: 30, height: 30 }}
                      />
                    </View>
                  )}
                </View>



                <View style={{ marginBottom: 5 }}>
                  <TouchableOpacity
                    disabled={this.state.isLoading || this.props.complain.loading ? true : false}
                    // disabled={true}
                    onPress={this.uploadImage}
                  >
                    <Text
                      style={{
                        // backgroundColor: '#e32f45',
                        backgroundColor: `${this.state.isLoading || this.props.complain.loading ? '#800022' : '#FF1654'}`,
                        borderWidth: 0,
                        marginTop: 10,
                        color: '#ffffff',
                        paddingVertical: 13,
                        textAlign: 'center'
                      }}
                      status="danger"
                    >
                      BUTTON
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Animatable.View>

        <Toast
          ref={(toast) => this.toast = toast}
          style={{ backgroundColor: 'red' }}
          position='center'
          opacity={0.8}
          textStyle={{ color: '#FFFFFF' }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addComplain,
      fetchComplain
    },
    dispatch
  );

const SettingWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    right: 20,
    bottom: 95,
    elevation: 0,
  },


  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
    alignItems: 'stretch'
  },
  modalView: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20
  },
  lightColor: {
    // color: "#666666",
    fontSize: 17,
  },
  input: {
    paddingVertical: 2,
    color: "#1D2029",
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e32f45',
    borderRadius: 5,
    height: 40,
  },
  errorText: {
    fontSize: 15,
    color: '#e32f45'
  },
  fullCard: {
    paddingVertical: 20,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: "rgba(255, 22, 84, 0.24)",
    shadowOffset: { width: 9, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 2
  },
  font1: {
    fontSize: 16,
    color: '#4d4d4d',
    fontWeight: '700',
    textAlign: 'justify'
  },
  font2: {
    fontSize: 14,
    color: '#808080'
  }
})