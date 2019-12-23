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
  Spinner,
} from 'native-base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Color from '../../shared/Color.js';
import {FlatList} from 'react-native-gesture-handler';
import ShowItem from './components/showItem';
import ShowRecommendItem from './components/showRecommendItem';
import Ticket from '../../../firebaseConfig';
import {checkCategory} from '../../shared/ultility';
import Carousel from 'react-native-snap-carousel';
import {itemWidth, sliderWidth} from '../../shared/ultility';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shows: [],
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
          title: 'Giải trí',
          status: false,
        },
        {
          id: 2,
          title: 'Khóa học',
          status: false,
        },
        {
          id: 3,
          title: 'Sự kiện khác',
          status: false,
        },
      ],
    };
  }

  readUserData = async () => {
    let data = [];
    await Ticket.database()
      .ref()
      .child('shows')
      .once('value', snapshot => {
        data = snapshot.val();
      });
    await this.setState({shows: data, isLoading: false});
  };

  componentDidMount() {
    this.readUserData();
  }

  onPressCategory = index => {
    let category = this.state.category;
    category[this.state.activeCategory].status = false;
    category[index].status = true;
    this.setState({
      activeCategory: index,
      category: category,
      filter: category[index].title,
    });
  };

  renderCategory = ({item, index}) => (
    <TouchableWithoutFeedback onPress={() => this.onPressCategory(index)}>
      <View
        style={[
          styles.segmentBtn,
          {
            backgroundColor: item.status ? Color.inactiveColor : null,
          },
        ]}>
        <Text uppercase={false} style={styles.segmentText}>
          {item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderItem = ({item}) => {
    const index = this.state.shows.indexOf(item);
    return (
      <ShowItem
        item={item}
        onPressItem={() => {
          this.props.navigation.navigate('Detail', {
            used: 'Home',
            index: index,
          });
        }}
      />
    );
  };

  renderRecommendItem = ({item}) => {
    const index = this.state.shows.indexOf(item);
    return (
      <ShowRecommendItem
        item={item}
        onPressItem={() => {
          this.props.navigation.navigate('Detail', {
            used: 'Home',
            index: index,
          });
        }}
      />
    );
  };

  render() {
    const data = this.state.shows.filter(value =>
      checkCategory(value, this.state.filter),
    );
    const sortData = data.filter(value => value.rating === '5').slice(0, 5);
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
        {this.state.isLoading || !this.state.shows ? (
          <Spinner color={Color.primaryColor} />
        ) : (
          <ScrollView style={styles.mainViewStyle}>
            <View>
              <Text style={styles.titleTextStyle}>Dành riêng cho bạn</Text>
              {data && data.length > 0 ? (
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={sortData}
                  renderItem={this.renderRecommendItem}
                  layout={'stack'}
                  layoutCardOffset={'18'}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                />
              ) : (
                <Text style={styles.errorText}>
                  Hiện chưa có đề xuất phù hợp với bạn.
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.titleTextStyle}>Phổ biến</Text>
              {data && data.length > 0 ? (
                <FlatList
                  data={data}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  keyExtractor={item => item.title}
                  initialNumToRender={10}
                />
              ) : (
                <Text style={styles.errorText}>
                  Không tìm thấy kết quả phù hợp.
                </Text>
              )}
            </View>
          </ScrollView>
        )}
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
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 50,
    margin: 8,
    padding: 8,
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
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    margin: 16,
  },
  errorText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.gray,
    marginLeft: 16,
    marginRight: 16,
  },
});
