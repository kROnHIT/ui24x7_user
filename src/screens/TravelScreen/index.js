import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useIsFocused} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import {TopNavigation, Text, Divider} from '@ui-kitten/components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default Travel = props => {
  const isFocused = useIsFocused();
  return isFocused ? <TravelWrapper {...props} /> : null;
};

class Travel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  RenderHeaderTitle = () => {
    return (
      <TouchableOpacity
        style={{width: 25, alignItems: 'center'}}
        onPress={() => this.props.navigation.navigate('Home')}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="chevron-left" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    );
  };

  RenderRightTitle = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
          <FontAwesome5 name="align-left" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TopNavigation
            alignment="center"
            title={
              <Text
                style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
                About Us
              </Text>
            }
            accessoryLeft={this.RenderHeaderTitle}
            accessoryRight={this.RenderRightTitle}
            style={{backgroundColor: '#05357a', paddingHorizontal: 20}}
          />
        </View>
        <ScrollView
          style={{paddingHorizontal: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 5}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{...styles.ctext, fontSize: 24, fontWeight: 'bold'}}>
                Welcome to Koha Talent Hunt
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1.4, paddingRight: 10}}>
              <Text
                style={{
                  ...styles.ctext,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  textAlign: 'justify',
                }}>
                The objective of the scheme is to award scholarships to
                meritorious students belonging to economically weaker families
                so as to provide them better opportunities for higher education
                and thus enhance their employability.
              </Text>
              <Text style={{...styles.ctext, textAlign: 'justify'}}>
                The scholarship is to be awarded for studies in India in a
                government or private college/university. It will also cover
                technical and vocational courses in Industrial Training
                Institutes/ Industrial Training Centre.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 214, 204, 0.30)',
  },
  ctext: {
    color: '#3C3C3C',
  },
});
const mapStateToProps = state => {
  return {...state};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const TravelWrapper = connect(mapStateToProps, mapDispatchToProps)(Travel);
