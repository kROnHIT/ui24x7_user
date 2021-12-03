import React from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { fetchEmergency } from '../../redux/actions';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../TopHeader';

export default Classified = props => {
  const isFocused = useIsFocused();
  return isFocused ? <ClassifiedWrapper {...props} /> : null;
};

class Classified extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchEmergencyData();
  }

  fetchEmergencyData = async () => {
    const { auth, classified } = this.props;
    // if (auth.setCity && auth.setCity.length !== 0) {
      let data = `SERVICES_NAME=${this.props.route.params.classifiedName}&STATE_ID=10`;
      await this.props.fetchEmergency(data);
    // }
  }

  emergencyDataList = () => {
    const { auth, classified } = this.props;
    return (
      <View>
        <Text>sdsdsds</Text>
      </View>
    )
  }
  render() {
    console.log('this.props', this.props);
    const { auth, classified } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        <View style={styles.cardsWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 5,
                flex: 1,
                marginLeft: 5,
              }}>
              {this.props.route.params.classifiedName}
            </Text>
          </View>
        </View>
        {auth.setCity && auth.setCity.length !== 0 ? this.emergencyDataList() : (
          <View>
            <Text>Please Select City First</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchEmergency }, dispatch);

const ClassifiedWrapper = connect(mapStateToProps, mapDispatchToProps)(Classified);

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
