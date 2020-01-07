import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Text, Button, Icon, Spinner} from 'native-base';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import StarRating from 'react-native-star-rating';
import {SCREEN_WIDTH, formatCurrency} from '../../shared/ultility';
import Ticket from '../../../firebaseConfig';
import ReadMore from 'react-native-read-more-text';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';

export default class DetailPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      used: '',
      index: this.props.navigation.getParam('index'),
      item: {price: 0},
      liked: false,
      quantityTicket: [],
      description: '',
      isLoading: true,
      isNotLogin: false,
      cannotBuy: false,
      isShowModal: false,
      isCanBuy: false,
    };
    this.onPressBack = () => {
      this.props.navigation.navigate(this.state.used);
    };
  }

  getItem = async () => {
    let used = this.props.navigation.getParam('used');
    let index = this.props.navigation.getParam('index');
    let data = {};
    let description = {};
    await Ticket.database()
      .ref('shows')
      .child(index)
      .on('value', snapshot => {
        data = snapshot.val();
        let isCanBuy =
          new Date(
            Number(data.dateYear),
            Number(data.dateMonth) - 1,
            Number(data.dateNum),
          ).getTime() > new Date().getTime();
        this.setState({isCanBuy: isCanBuy});
        data.ticket.forEach(this.toNumber);
        let quantity = [];
        quantity = data.ticket.slice();
        quantity.forEach(this.setQuantity);
        this.setState({quantityTicket: quantity, item: data});
      });
    await Ticket.database()
      .ref('showDescription')
      .child(index)
      .on('value', snapshot => {
        description = snapshot.val();
        this.setState({description: description.description});
      });
    if (firebase.auth().currentUser) {
      await Ticket.database()
        .ref()
        .child('users/' + firebase.auth().currentUser.uid + '/likedShow/liked')
        .once('value', snapshot => {
          if (snapshot.exists()) {
            let liked = snapshot.val().indexOf(index) !== -1;
            this.setState({liked: liked});
          }
        });
    }
    await this.setState({
      used: used,
      isLoading: false,
    });
  };

  toNumber = (item, index, arr) => {
    arr[index].quantity = Number(item.quantity);
  };

  setQuantity = (item, index, arr) => {
    arr[index].quantity = 0;
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onPressBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onPressBack);
  }

  componentDidMount() {
    this.getItem();
  }

  onPressMinusBtn = (quantity, index) => {
    let items = this.state.quantityTicket;
    items[index].quantity = quantity - 1;
    this.setState({quantityTicket: items});
  };

  onPressPlusBtn = (quantity, index) => {
    let items = this.state.quantityTicket;
    items[index].quantity = quantity + 1;
    this.setState({quantityTicket: items});
  };

  _renderTruncatedFooter = handlePress => {
    return (
      <Text style={styles.showMoreText} onPress={handlePress}>
        Xem thêm
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={styles.showMoreText} onPress={handlePress}>
        Thu gọn
      </Text>
    );
  };

  _handleTextReady = () => {};

  checkQuantity = (item, index) => {
    return (
      item.quantity <= 0
      // && item.quantity < this.state.item.ticket[index].quantity
    );
  };

  onPressLikeBtn = async () => {
    let likedShow = [];
    if (firebase.auth().currentUser) {
      await Ticket.database()
        .ref()
        .child('users/' + firebase.auth().currentUser.uid + '/likedShow/liked')
        .once('value', snapshot => {
          likedShow = snapshot.val();
          let pos = likedShow.indexOf(this.state.index);
          if (pos !== -1) {
            likedShow.splice(pos, 1);
          } else likedShow.push(this.state.index);
          Ticket.database()
            .ref()
            .child('users/' + firebase.auth().currentUser.uid + '/likedShow')
            .set({liked: likedShow})
            .then(() => this.setState({liked: !this.state.liked}));
        });
    } else this.setState({isShowModal: true});
  };

  onPressBookBtn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!this.state.quantityTicket.every(this.checkQuantity))
          this.props.navigation.navigate('Booking', {
            itemIndex: this.props.navigation.getParam('index'),
            ticketQuantity: this.state.quantityTicket,
          });
        else this.setState({cannotBuy: true});
      } else this.setState({isNotLogin: true});
    });
  };

  renderItem = ({item, index}) => (
    <View style={styles.ticketItem}>
      <View style={{flex: 2}}>
        <Text style={styles.ticketType}>{item.type}</Text>
        <Text style={styles.ticketPrice}>
          {formatCurrency(Number(item.price))}
        </Text>
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={styles.quantityBtn}>
          <TouchableOpacity
            onPress={() => this.onPressMinusBtn(item.quantity, index)}
            disabled={item.quantity <= 0}
            style={[
              styles.btnContainer,
              {
                borderColor:
                  item.quantity > 0 ? Color.primaryColor : Color.gray,
                marginRight: 16,
              },
            ]}>
            <Icon
              style={[
                styles.iconStyle,
                {color: item.quantity > 0 ? Color.primaryColor : Color.gray},
              ]}
              name="minus"
              type="AntDesign"
            />
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <Text style={styles.ticketType}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.onPressPlusBtn(item.quantity, index)}
            disabled={item.quantity >= 2 || !this.state.isCanBuy}
            style={[
              styles.btnContainer,
              {
                borderColor:
                  item.quantity < 2 && this.state.isCanBuy
                    ? Color.primaryColor
                    : Color.gray,
                marginLeft: 16,
              },
            ]}>
            <Icon
              style={[
                styles.iconStyle,
                {
                  color:
                    item.quantity < 2 && this.state.isCanBuy
                      ? Color.primaryColor
                      : Color.gray,
                },
              ]}
              name="plus"
              type="AntDesign"
            />
          </TouchableOpacity>
        </View>
        {!this.state.isCanBuy && (
          <Text style={styles.stopSelling}>Ngừng bán</Text>
        )}
      </View>
    </View>
  );

  render() {
    if (this.state.isLoading) return <Spinner color={Color.primaryColor} />;
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Chi tiết"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.navigate(this.state.used)}
        />
        <ScrollView contentContainerStyle={styles.mainViewStyle}>
          <CustomModal
            isModalVisible={this.state.isNotLogin}
            isSuccess={false}
            text="Bạn chưa đăng nhập. Vui lòng nhấn nút đăng nhập và quay lại đặt vé sau."
            btnText="Đăng nhập"
            onPressBtn={() => {
              this.setState({isNotLogin: false});
              this.props.navigation.navigate('Profile');
            }}
          />
          <CustomModal
            isModalVisible={this.state.isShowModal}
            isSuccess={false}
            text="Bạn chưa đăng nhập. Để nhấn nút 'Yêu thích', vui lòng đăng nhập."
            btnText="Đăng nhập"
            onPressBtn={() => {
              this.setState({isShowModal: false});
              this.props.navigation.navigate('Login');
            }}
          />
          <CustomModal
            isModalVisible={this.state.cannotBuy}
            isSuccess={false}
            text="Đã có lỗi xảy ra trong quá trình mua vé. Vé có thể đã hết hoặc bạn chưa chọn vé cần mua. Nhấn quay lại để trở về."
            btnText="Quay lại"
            onPressBtn={() => this.setState({cannotBuy: false})}
          />
          {this.state.isLoading ? (
            <Spinner color={Color.primaryColor} />
          ) : (
            <View style={{width: SCREEN_WIDTH}}>
              <Image
                source={{uri: this.state.item.card}}
                style={{width: '100%', height: 200}}
                resizeMode="stretch"
              />
              <View style={styles.nameContainer}>
                <Text style={styles.showName}>{this.state.item.title}</Text>
                <View style={styles.starContainer}>
                  <View>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={Number(this.state.item.rating)}
                      fullStarColor={Color.starColor}
                      emptyStarColor={Color.starColor}
                      starSize={18}
                      containerStyle={{justifyContent: 'flex-start'}}
                      starStyle={{paddingRight: 5}}
                    />
                    <Text style={styles.fromText}>
                      Từ{' '}
                      <Text style={styles.fromPriceText}>
                        {formatCurrency(Number(this.state.item.priceFrom))}
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.likeBtn}
                    onPress={() => this.onPressLikeBtn()}>
                    <Icon
                      name={this.state.liked ? 'ios-heart' : 'ios-heart-empty'}
                      type="Ionicons"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
              <View style={{margin: 16}}>
                <Text style={styles.sectionText}>Giới thiệu</Text>
                <ReadMore
                  numberOfLines={5}
                  renderTruncatedFooter={this._renderTruncatedFooter}
                  renderRevealedFooter={this._renderRevealedFooter}
                  onReady={this._handleTextReady}>
                  <Text style={styles.introText}>{this.state.description}</Text>
                </ReadMore>
                <Text style={styles.sectionText}>Giá vé</Text>
                <FlatList
                  data={this.state.quantityTicket}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  keyExtractor={item => item.type}
                />
                <Button
                  rounded
                  disabled={!this.state.isCanBuy}
                  block
                  style={[
                    styles.bookBtn,
                    {
                      backgroundColor: this.state.isCanBuy
                        ? Color.primaryColor
                        : Color.gray,
                    },
                  ]}
                  onPress={() => this.onPressBookBtn()}>
                  <Text style={styles.bookText} uppercase={false}>
                    Đặt vé
                  </Text>
                </Button>
              </View>
            </View>
          )}
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
  nameContainer: {
    justifyContent: 'flex-start',
    margin: 16,
  },
  ticketType: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
  },
  quantityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
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
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
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
    marginRight: 8,
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
  iconStyle: {
    color: Color.primaryColor,
    fontSize: 22,
  },
  quantityBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreText: {
    color: Color.primaryColor,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  likeBtn: {
    width: 30,
    height: 30,
    backgroundColor: Color.primaryColor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopSelling: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: 'red',
  },
});
