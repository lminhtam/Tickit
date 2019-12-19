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
    this.state = {
      category: [
        {
          id: 1,
          title: 'Âm nhạc',
        },
        {
          id: 2,
          title: 'Workshop',
        },
        {
          id: 3,
          title: 'Hài kịch',
        },
      ],
    };
  }

  _itemChoose(item) {
    alert(item.title);
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
          <ListForYou
            onPressItem={() => this.props.navigation.navigate('Detail')}
          />
          <ListTrending
            onPressItem={() => this.props.navigation.navigate('Detail')}
          />
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
    backgroundColor: Color.inactiveColor,
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
    marginBottom: 60,
  },
});
