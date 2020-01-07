import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  BackHandler,
} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import Ticket from '../../../firebaseConfig';
import {formatCurrency, generateUID} from '../../shared/ultility';
import firebase from 'firebase';
import ConfirmModal from '../../shared/component/confirmModal';

export default class TicketInformationPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      total: 0,
      totalQuantity: 0,
      user: this.props.navigation.getParam('user'),
      quantityTicket: [],
      confirm: false,
    };
    this.onPressBack = () => {
      this.props.navigation.goBack();
      return true;
    };
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBack);
  }

  getItem = async () => {
    let index = this.props.navigation.getParam('itemIndex');
    let data = {};
    await Ticket.database()
      .ref('shows')
      .child(index)
      .on('value', snapshot => {
        data = snapshot.val();
        this.setState({item: data});
      });

    let quantity = this.props.navigation.getParam('quantityTicket');
    await this.setState({quantityTicket: quantity});

    var total = 0;
    var totalQuantity = 0;
    for (let i = 0; i < quantity.length; i++) {
      total += Number(quantity[i].price) * quantity[i].quantity;
      totalQuantity += quantity[i].quantity;
    }
    await this.setState({total: total, totalQuantity: totalQuantity});
  };

  componentDidMount() {
    this.getItem();
  }

  onPressBookTickets = async () => {
    let today = new Date();
    let todayString =
      today.getDate() +
      '-' +
      (today.getMonth() + 1).toString() +
      '-' +
      today.getFullYear();
    let id = generateUID().toUpperCase();
    await Ticket.database()
      .ref()
      .child(
        'users/' + firebase.auth().currentUser.uid + '/bookedTickets/' + id,
      )
      .set({
        showIndex: this.props.navigation.getParam('itemIndex'),
        showName: this.state.item.title,
        dateBooked: todayString,
        totalPrice: this.state.total,
        totalQuantity: this.state.totalQuantity,
        quantityTicket: this.props.navigation.getParam('quantityTicket'),
        bookedPerson: this.state.user.fullname,
        phoneNumber: this.state.user.phoneNumber,
        personalID: this.state.user.id,
      })
      .then(() => {
        this.setState({confirm: false});
        this.props.navigation.navigate('TicketDetail', {
          ticketId: id,
          used: 'home',
        });
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Đặt vé"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{backgroundColor: '#AC73E480'}}>
          <ConfirmModal
            isModalVisible={this.state.confirm}
            text="Xác nhận thanh toán?"
            btnCancelText="Quay lại"
            onPressCancelBtn={() => this.setState({confirm: false})}
            btnAgreeText="Thanh toán"
            onPressAgreeBtn={() => this.onPressBookTickets()}
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
            <View style={styles.quantitySection}>
              <View style={styles.ticketRow}>
                <View style={styles.typeSection}>
                  <Text style={styles.sectionText}>Loại:</Text>
                </View>
                <View style={styles.priceSection}>
                  <Text style={styles.sectionText}>Số lượng:</Text>
                </View>
              </View>
              <FlatList
                data={this.state.quantityTicket}
                renderItem={({item}) => {
                  if (item.quantity > 0)
                    return (
                      <View style={styles.ticketRow}>
                        <View style={styles.typeSection}>
                          <Text style={styles.detailText}>{item.type}</Text>
                        </View>
                        <View style={styles.priceSection}>
                          <Text style={styles.detailText}>{item.quantity}</Text>
                        </View>
                      </View>
                    );
                }}
                keyExtractor={item => item.type}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.sectionText}>Người đặt vé:</Text>
              <Text style={styles.detailText}>{this.state.user.fullname}</Text>
              <Text style={styles.sectionText}>Tổng cộng:</Text>
              <Text style={styles.priceText}>
                {formatCurrency(this.state.total)}
              </Text>
            </View>
          </View>
          <Button
            rounded
            block
            style={styles.bookBtn}
            onPress={() => this.setState({confirm: true})}>
            <Text style={styles.bookText} uppercase={false}>
              Thanh toán
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
  quantitySection: {
    flexDirection: 'column',
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeSection: {
    alignItems: 'center',
    flex: 2,
  },
  priceSection: {
    alignItems: 'center',
    flex: 1,
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
  sectionText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
    marginTop: 16,
  },
  detailText: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  priceText: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 28,
    color: 'red',
    marginBottom: 16,
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
});
