/* eslint-disable react-native/no-inline-styles */
import {Text, Button} from 'native-base';
import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility';
import Ticket from '../../../firebaseConfig';
import firebase from 'firebase';
import {formatCurrency} from '../../shared/ultility';

export default class BookedTicketPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      bookedTicket: [],
    };
  }

  getBookedTicket = async () => {
    let data = [];
    await Ticket.database()
      .ref('users')
      .child(firebase.auth().currentUser.uid + '/bookedTickets')
      .on('value', snapshot => {
        data = [];
        if (snapshot.exists()) {
          snapshot.forEach(value => {
            data.push({key: value.key, ...value.val()});
          });
          this.setState({bookedTicket: data});
        } else this.setState({bookedTicket: []});
      });
  };

  componentDidMount() {
    this.getBookedTicket();
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('DetailTicket', {ticketId: item.key})
      }>
      <View style={styles.ticketItem}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.noStyle}>No.{item.key}</Text>
          <Text style={styles.date}>{item.dateBooked}</Text>
        </View>
        <Text style={styles.name}>{item.showName}</Text>
        <Text style={styles.noStyle}>
          <Text style={[styles.noStyle, {color: Color.gray}]}>Số lượng: </Text>
          {item.totalQuantity}
        </Text>
        <Text style={styles.noStyle}>
          <Text style={[styles.noStyle, {color: Color.gray}]}>Tổng cộng: </Text>
          {formatCurrency(item.totalPrice)}
        </Text>
        <Button
          small
          rounded
          bordered
          style={styles.btnStyle}
          onPress={() =>
            this.props.navigation.navigate('DetailTicket', {ticketId: item.key})
          }>
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
        {this.state.bookedTicket && this.state.bookedTicket.length > 0 ? (
          <FlatList
            data={this.state.bookedTicket}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
          />
        ) : (
          <Text style={styles.notFound}>Bạn chưa có vé đã đặt.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    alignSelf: 'flex-end',
    marginTop: 16,
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
  notFound: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.gray,
    alignSelf: 'center',
    marginTop: 16,
  },
});
