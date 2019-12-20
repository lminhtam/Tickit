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
import {FlatList} from 'react-native-gesture-handler';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 0,
      filter: 'Tất cả',
      category: [
        {
          id: 0,
          title: 'Tất cả',
          status: true,
        },
        {
          id: 1,
          title: 'Âm nhạc',
          status: false,
        },
        {
          id: 2,
          title: 'Workshop',
          status: false,
        },
        {
          id: 3,
          title: 'Hài kịch',
          status: false,
        },
      ],
    };
  }

  onPressCategory = index => {
    let category = this.state.category;
    category[index].status = true;
    category[this.state.activeCategory].status = false;
    this.setState({
      activeCategory: index,
      category: category,
      filter: category[index].title,
    });
  };

  renderCategory = ({item, index}) => (
    <Button
      rounded
      onPress={() => this.onPressCategory(index)}
      style={[
        styles.segmentBtn,
        {
          backgroundColor: item.status ? Color.inactiveColor : null,
        },
      ]}>
      <Text uppercase={false} style={styles.segmentText}>
        {item.title}
      </Text>
    </Button>
  );

  render() {
    return (
      <View style={{marginBottom: 20}}>
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
            <FlatList
              style={{marginLeft: 16, marginRight: 16}}
              data={this.state.category}
              renderItem={this.renderCategory}
              extraData={this.state}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Segment>
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <ListForYou
            filter={this.state.filter}
            onPressItem={() =>
              this.props.navigation.navigate('Detail', {
                used: 'Home',
              })
            }
          />
          <ListTrending
            filter={this.state.filter}
            onPressItem={() =>
              this.props.navigation.navigate('Detail', {
                used: 'Home',
              })
            }
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
    marginBottom: 80,
  },
});
