/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Color from '../../../shared/Color.js';
import ShowItem from '../components/showItem';

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
  {
    title: 'The talent show',
    category: 'Workshop',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    category: 'Workshop',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    category: 'Workshop',
    date: 'October 15',
  },
];

export default class ListTrending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: show,
    };
  }

  renderItem = ({item}) => <ShowItem item={item} onPressItem={this.props.onPressItem}/>;

  render() {
    return (
      <View>
        <Text style={styles.titleTextStyle}>Phổ biến</Text>
        <FlatList
          data={this.state.shows}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    margin: 16,
  },
});
