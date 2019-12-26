import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import Color from '../../shared/Color.js';
import QRCode from 'react-native-qrcode-svg';
import CustomHeader from '../../shared/component/customHeader';
import {StackActions} from 'react-navigation';
import Ticket from '../../../firebaseConfig';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';

const popAction = StackActions.pop({
  n: 3,
});

export default class TicketDetailPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      used: this.props.navigation.getParam('used'),
      item: {},
      qrValue: ' ',
      ticket: {},
      canCancel: true,
      isError: false,
    };
  }

  getItem = async () => {
    let ticketId = this.props.navigation.getParam('ticketId');
    let data = {};
    await Ticket.database()
      .ref('users/' + firebase.auth().currentUser.uid + '/bookedTickets')
      .child(ticketId)
      .once('value', snapshot => {
        data = snapshot.val();
        this.setState({ticket: data});
        const quantity = data.quantityTicket;
        let qrValue = 'ID: ' + ticketId + '\n' + data.showName + '\n\n';
        for (let i = 0; i < quantity.length; i++) {
          if (quantity[i].quantity > 0)
            qrValue +=
              'Loại: ' +
              quantity[i].type +
              '\nSố lượng: ' +
              quantity[i].quantity.toString() +
              '\n\n';
        }
        qrValue += 'Người đặt: ' + data.bookedPerson;
        this.setState({qrValue: qrValue});
      })
      .then(() =>
        Ticket.database()
          .ref('shows')
          .child(data.showIndex)
          .once('value', snapshot => {
            let show = snapshot.val();
            this.setState({item: show});
            let showDay = new Date(
              Number(show.dateYear),
              Number(show.dateMonth) - 1,
              Number(show.dateNum) - 1,
            );
            let canCancel = showDay.getTime() > new Date().getTime();
            this.setState({canCancel: canCancel});
          }),
      )
      .catch(error => this.onPressBack());
  };

  componentDidMount() {
    this.getItem();
  }

  onPressBack = () => {
    if (this.state.used === 'home') this.props.navigation.dispatch(popAction);
    else this.props.navigation.goBack();
  };

  onPressCancel = async () => {
    let ticketId = this.props.navigation.getParam('ticketId');
    await Ticket.database()
      .ref(
        'users/' +
          firebase.auth().currentUser.uid +
          '/bookedTickets/' +
          ticketId,
      )
      .remove(() => this.onPressBack())
      .catch(error => this.setState({isError: true}));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Chi tiết vé"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.onPressBack()}
        />
        <ScrollView style={{backgroundColor: '#AC73E480'}}>
          <CustomModal
            isModalVisible={this.state.isError}
            isSuccess={false}
            text="Đã có lỗi xảy ra. Vui lòng thử lại vào lúc khác"
            btnText="Quay lại"
            onPressBtn={() => this.setState({isError: false})}
          />
          <View style={styles.ticketContainer}>
            <View>
              <Image
                source={{uri: this.state.item.card}}
                style={styles.img}
                resizeMode={'cover'}
              />
            </View>
            <Text style={styles.showName}>{this.state.item.title}</Text>
            <View style={styles.infoContainer}>
              <Icon
                name="location-on"
                type="MaterialIcons"
                style={{fontSize: 14}}
              />
              <Text style={styles.infoText}>{this.state.item.address}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name="date-range"
                type="MaterialIcons"
                style={{fontSize: 14}}
              />
              <Text style={styles.infoText}>{this.state.item.date}</Text>
            </View>
            <View style={styles.lineSeperator}></View>
            <View style={styles.qrContainer}>
              <QRCode value={this.state.qrValue} />
            </View>
          </View>
          <Button
            rounded
            block
            disabled={!this.state.canCancel}
            onPress={() => this.onPressCancel()}
            style={[
              styles.bookBtn,
              {
                backgroundColor: this.state.canCancel
                  ? Color.primaryColor
                  : Color.gray,
              },
            ]}>
            <Text style={styles.bookText} uppercase={false}>
              Hủy vé
            </Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
  img: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    width: '100%',
    height: 200,
  },
  ticketContainer: {
    margin: 28,
    backgroundColor: 'white',
    borderRadius: 9,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 11,
  },
  infoText: {
    fontFamily: 'Cabin-Italic',
    fontSize: 14,
    color: 'black',
    marginLeft: 16,
  },
  showName: {
    fontFamily: 'Cabin-Regular',
    fontSize: 28,
    color: 'black',
    margin: 16,
  },
  bookBtn: {
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    backgroundColor: Color.primaryColor,
  },
  bookText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: 'white',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  lineSeperator: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    margin: 16,
  },
});
