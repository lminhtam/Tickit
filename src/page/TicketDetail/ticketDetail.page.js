import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import Color from '../../shared/Color.js';
import QRCode from 'react-native-qrcode-svg';
import CustomHeader from '../../shared/component/customHeader';
import {StackActions} from 'react-navigation';
import Ticket from '../../../firebaseConfig';
import firebase from 'firebase';

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
      user: this.props.navigation.getParam('user'),
      quantity: this.props.navigation.getParam('quantityTicket'),
      qrValue: ' ',
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

    const quantity = this.props.navigation.getParam('quantityTicket');
    let qrValue = data.title + '\n\n';
    for (let i = 0; i < quantity.length; i++) {
      if (quantity[i].quantity > 0)
        qrValue +=
          'Loại: ' +
          quantity[i].type +
          '\nSố lượng: ' +
          quantity[i].quantity.toString() +
          '\n\n';
    }
    qrValue += this.state.user.fullname;
    this.setState({qrValue: qrValue});
  };

  componentDidMount() {
    this.getItem();
  }

  onPressBack = () => {
    if (this.state.used === 'home') this.props.navigation.dispatch(popAction);
    else this.props.navigation.goBack();
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
          <Button rounded block style={styles.bookBtn}>
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
