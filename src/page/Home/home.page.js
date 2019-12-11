import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Text,
  Button,
  Header,
  Body,
  Title,
  Left,
  Right,
  Segment,
} from 'native-base';
import Color from '../../shared/Color.js';

const show = [
  {
    title: 'The talent show',
    description: 'Description',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    description: 'Description',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    description: 'Description',
    date: 'October 15',
  },
];

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      shows: show,
    };
  }

  renderItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.showItem}>
        <Image source={require('../../assets/img/talent-show-poster.png')} />
        <View style={{marginLeft: 16}}>
          <Text style={styles.showName}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
          <Button rounded small style={styles.btnStyle}>
            <Text uppercase={false} style={styles.btnText}>
              Đặt vé
            </Text>
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView>
        <View>
          <Header
            hasSegment
            iosBarStyle="default"
            androidStatusBarColor={Color.primaryColor}
            style={{backgroundColor: Color.primaryColor}}>
            <Left style={{flex: 0.2}}></Left>
            <Body style={{flex: 0.6, alignItems: 'center'}}>
              <Title style={styles.headerText}>Trang chủ</Title>
            </Body>
            <Right style={{flex: 0.2}}></Right>
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
          <Text style={styles.titleTextStyle}>Dành riêng cho bạn</Text>
          <Text style={styles.titleTextStyle}>Phổ biến</Text>
          <FlatList
            data={this.state.shows}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={item => item.title}
          />
        </ScrollView>
      </SafeAreaView>
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
  },
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-Regular',
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
  },
});
