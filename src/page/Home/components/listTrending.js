/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../shared/Color';

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

  renderItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.showItem}>
        <Image source={require('../../../assets/img/talent-show-poster.png')} />
        <View style={{marginLeft: 16}}>
          <Text style={styles.showName}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.category}</Text>
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
