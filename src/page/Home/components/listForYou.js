/* eslint-disable react-native/no-inline-styles */ import {
  Button,
  Card,
  CardItem,
  Text,
} from 'native-base';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Color from '../../../shared/Color';
import {itemWidth, sliderWidth} from '../../../shared/ultility';
const show = [
  {
    title: 'The talent show',
    category: 'Âm nhạc',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    category: 'Hài kịch',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    category: 'Workshop',
    date: 'October 15',
  },
];

export default class ListForYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: show,
    };
  }

  renderItem = ({item}) => (
    <TouchableOpacity style={styles.showItem} onPress={this.props.onPressItem}>
      <CardItem cardBody>
        <Image
          style={{resizeMode: 'cover'}}
          source={require('../../../assets/img/talent-show-poster.png')}
        />
        <View>
          <Text style={styles.showName}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.category}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
          <Button
            rounded
            small
            style={styles.btnStyle}
            onPress={this.props.onPressItem}>
            <Text uppercase={false} style={styles.btnText}>
              Đặt vé
            </Text>
          </Button>
        </View>
      </CardItem>
    </TouchableOpacity>
  );

  render() {
    return (
      <View>
        <Text style={styles.titleTextStyle}>Dành riêng cho bạn</Text>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={show}
          renderItem={this.renderItem}
          layout={'stack'}
          layoutCardOffset={'18'}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 2,
  },
});
