import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import Ticket from '../../../firebaseConfig';
import {formatCurrency} from '../../shared/ultility';

export default class TicketInformationPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      total: 0,
      user: this.props.navigation.getParam('user'),
      quantityTicket: [],
    };
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
    for (let i = 0; i < quantity.length; i++)
      total += Number(quantity[i].price) * quantity[i].quantity;
    await this.setState({total: total});
  };

  componentDidMount() {
    this.getItem();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Đặt vé"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{backgroundColor: '#AC73E480'}}>
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
            style={styles.bookBtn}
            onPress={() =>
              this.props.navigation.navigate('TicketDetail', {
                used: 'home',
                itemIndex: this.props.navigation.getParam('itemIndex'),
                user: this.props.navigation.getParam('user'),
                quantityTicket: this.props.navigation.getParam(
                  'quantityTicket',
                ),
              })
            }>
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
