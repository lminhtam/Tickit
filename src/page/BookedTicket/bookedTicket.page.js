/* eslint-disable react-native/no-inline-styles */
import {Text, Button} from 'native-base';
import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility';

const data = [
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
  {
    no: '1947034',
    name: 'MUSIC SHOW',
    totalPrice: '112$',
    amount: 2,
    date: '05-12-2019',
  },
];

export default class BookedTicketPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('DetailTicket')}>
      <View style={styles.ticketItem}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.noStyle}>No.{item.no}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.noStyle}>
          <Text style={[styles.noStyle, {color: Color.gray}]}>Số lượng: </Text>
          {item.amount}
        </Text>
        <Text style={styles.noStyle}>
          <Text style={[styles.noStyle, {color: Color.gray}]}>Tổng cộng: </Text>
          {item.totalPrice}
        </Text>
        <Button
          small
          rounded
          bordered
          style={styles.btnStyle}
          onPress={() => this.props.navigation.navigate('DetailTicket')}>
          <Text uppercase={false} style={styles.noStyle}>
            Xem chi tiết
          </Text>
        </Button>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{marginBottom: 60}}>
        <CustomHeader
          title="Vé đã đặt"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.no}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'flex-end',
  },
  noStyle: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
  },
  name: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  date: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    color: Color.gray,
  },
  ticketItem: {
    flex: 1,
    padding: 16,
    margin: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
  },
});
