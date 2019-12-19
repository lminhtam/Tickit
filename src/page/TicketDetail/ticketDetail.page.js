import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import Color from '../../shared/Color.js';
import QRCode from 'react-native-qrcode-svg';
import CustomHeader from '../../shared/component/customHeader';
import {StackActions} from 'react-navigation';

const popAction = StackActions.pop({
  n: 4,
});

export default class TicketDetailPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      used: '',
    };
  }

  componentDidMount() {
    let used = this.props.navigation.getParam('used');
    this.setState({used: used});
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
                source={require('../../assets/img/music-laser.png')}
                style={styles.img}
                resizeMode={'cover'}
              />
            </View>
            <Text style={styles.showName}>Music Laser Show</Text>
            <View style={styles.infoContainer}>
              <Icon
                name="location-on"
                type="MaterialIcons"
                style={{fontSize: 14}}
              />
              <Text style={styles.infoText}>Nhà hát Hòa Bình - Quận 10</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name="date-range"
                type="MaterialIcons"
                style={{fontSize: 14}}
              />
              <Text style={styles.infoText}>15/10/2019 - 19:00</Text>
            </View>
            <View style={styles.lineSeperator}></View>
            <View style={styles.qrContainer}>
              <QRCode value="SVIP Steven Black" />
            </View>
          </View>
          <Button rounded style={styles.bookBtn}>
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
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
