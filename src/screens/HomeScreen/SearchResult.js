import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../TopHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button, Spinner, Divider} from '@ui-kitten/components';
import {searchService} from '../../redux/actions';

export default Home = props => {
  const isFocused = useIsFocused();
  return isFocused ? <HomeWrapper {...props} /> : null;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {keyboard, stateId} = this.props.route.params;
    let data = `DATA=${keyboard}&STATE_ID=${stateId}`;
    console.log('ljlkjlk', data);
    this.props.searchService(data);
  }

  searchResult = () => {
    const {searchResult} = this.props.classified;
    if (searchResult && searchResult.length !== 0) {
      let resultList = searchResult.map((value, key) => {
        return (
          <View style={{padding: 15}}>
            <Text style={{color: '#2E2E2E', fontSize: 16, fontWeight: '700'}}>
              {value.NAME}
            </Text>
            <Text style={{color: '#747474', fontSize: 14, fontWeight: '600', marginBottom:5}}>
              {value.SERVICES_NAME}
            </Text>
            <Divider />
          </View>
        );
      });
      return resultList;
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
  render() {
    console.log('ppropspss', this.props);
    const {keyboard, stateId} = this.props.route.params;
    const {classified} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header props={this.props} />
        {classified.loading ? (
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner status="primary" style={{color: '#002440'}} size="giant" />
          </View>
        ) : (
          this.searchResult()
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({searchService}, dispatch);

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
