/* eslint-disable react-native/no-inline-styles */
import {
  Body,
  Button,
  Header,
  Left,
  Right,
  Segment,
  Text,
  Title,
} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import ListForYou from './components/listForYou.js';
import ListTrending from './components/listTrending.js';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Header
            hasSegment
            iosBarStyle="default"
            androidStatusBarColor={Color.primaryColor}
            style={{backgroundColor: Color.primaryColor}}>
            <Left style={{flex: 0.2}} />
            <Body style={{flex: 0.6, alignItems: 'center'}}>
              <Title style={styles.headerText}>Trang chủ</Title>
            </Body>
            <Right style={{flex: 0.2}} />
          </Header>
          <Segment style={styles.segmentStyle}>
            <Button rounded active={true} style={styles.segmentBtn}>
              <Text uppercase={false} style={styles.segmentText}>
                Âm nhạc
              </Text>
            </Button>
            <Button rounded active={true} style={styles.segmentBtn}>
              <Text uppercase={false} style={styles.segmentText}>
                Workshop
              </Text>
            </Button>
            <Button rounded active={true} style={styles.segmentBtn}>
              <Text uppercase={false} style={styles.segmentText}>
                Hài kịch
              </Text>
            </Button>
          </Segment>
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <ListForYou />
          <ListTrending />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  segmentStyle: {
    backgroundColor: Color.primaryColor,
    justifyContent: 'space-around',
  },
  segmentBtn: {
    backgroundColor: Color.primaryColor,
    justifyContent: 'space-around',
    borderWidth: 0,
    borderColor: Color.primaryColor,
  },
  segmentText: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 28,
  },
  mainViewStyle: {
    backgroundColor: 'white',
    marginBottom: 100,
  },
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    margin: 16,
  },
  showName: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
  },
  descriptionText: {
    color: Color.gray,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  dateText: {
    color: 'black',
    fontFamily: 'Cabin-Italic',
    fontSize: 14,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  btnStyle: {
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
    marginTop: 16,
  },
  showItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
