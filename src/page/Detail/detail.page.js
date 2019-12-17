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
import StarRating from 'react-native-star-rating';
import {SCREEN_WIDTH} from '../../shared/ultility';

const ticket = [
  {
    title: 'SVIP',
    price: '$39.99',
  },
  {
    title: 'VVIP',
    price: '$19.99',
  },
  {
    title: 'GA',
    price: '$9.99',
  },
];

export default class DetailPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      tickets: ticket,
    };
  }

  renderItem = ({item}) => (
    <View style={styles.ticketItem}>
      <View style={{marginLeft: 16}}>
        <Text style={styles.ticketType}>{item.title}</Text>
        <Text style={styles.ticketPrice}>{item.price}</Text>
      </View>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Chi tiết"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.mainViewStyle}>
          <Image
            source={require('../../assets/img/music-laser.png')}
            resizeMode="stretch"
          />
          <View style={styles.contanier}>
            <View style={styles.nameContainer}>
              <Text style={styles.showName}>Music Laser Show</Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={4}
                fullStarColor={Color.starColor}
                emptyStarColor={Color.starColor}
                starSize={18}
                containerStyle={styles.nameContainer}
                starStyle={{paddingRight: 5}}
              />
            </View>
            <View style={styles.fromContainer}>
              <Text style={styles.fromText}>Từ</Text>
              <Text style={styles.fromPriceText}>$19.99</Text>
            </View>
          </View>
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
          <View style={{margin: 16}}>
            <Text style={styles.sectionText}>Giới thiệu</Text>
            <Text style={styles.introText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum tristique sed nisl ac imperdiet. Ut hendrerit nulla ut
              felis rhoncus mattis. Aliquam erat volutpat.
            </Text>
            <Text style={styles.sectionText}>Giá vé</Text>
            <FlatList
              data={this.state.tickets}
              renderItem={this.renderItem}
              extraData={this.state}
              keyExtractor={item => item.title}
            />
            <Button rounded style={styles.bookBtn}>
              <Text style={styles.bookText} uppercase={false}>
                Đặt vé
              </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'white',
  },
  container: {
    marginBottom: 60,
  },
  fromContainer: {
    alignItems: 'center',
    flex: 1,
  },
  nameContainer: {
    justifyContent: 'flex-start',
    flex: 4,
  },
  contanier: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketType: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
  },
  ticketPrice: {
    color: Color.gray,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  ticketItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  fromText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: 'black',
  },
  fromPriceText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: 'red',
  },
  sectionText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: 'black',
  },
  introText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.introColor,
    marginTop: 8,
    marginBottom: 16,
  },
  bookBtn: {
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: Color.primaryColor,
  },
  bookText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
    color: 'white',
  },
});
