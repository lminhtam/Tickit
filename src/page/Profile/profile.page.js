/* eslint-disable react-native/no-inline-styles */
import {Text, Icon, Button} from 'native-base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility.js';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';

const list = [
  {
    key: 1,
    title: 'Vé đã đặt',
    navigation: 'BookedTicket',
  },
  {
    key: 2,
    title: 'Đã thích',
    navigation: 'LikedShowSwitch',
  },
  {
    key: 3,
    title: 'Phương thức thanh toán',
    navigation: 'Payment',
  },
  {
    key: 4,
    title: 'Cài đặt',
    navigation: 'Setting',
  },
];

export default class ProfilePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      fullname: 'Chưa có tên',
      email: firebase.auth().currentUser.email,
      imgURL: firebase.auth().currentUser.photoURL,
      isError: false,
    };
  }

  componentDidMount() {
    this.setState({fullname: firebase.auth().currentUser.displayName});
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      const user = firebase.auth().currentUser;
      if (user.email !== this.state.email) this.setState({email: user.email});
      if (user.displayName !== this.state.fullname)
        this.setState({fullname: user.displayName});
      if (user.photoURL !== this.state.imgURL)
        this.setState({imgURL: user.photoURL});
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.navigate('Loading');
    } catch (e) {
      this.setState({isError: true});
    }
  };

  renderItem = ({item}) => {
    const navigation = item.navigation;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(navigation)}>
        <View>
          <View style={styles.listContainer}>
            <Text style={styles.name}>{item.title}</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={styles.icon}
            />
          </View>
          <View style={styles.lineSeperator} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{marginBottom: 60}}>
        <View>
          <CustomHeader title="Trang cá nhân" isLeftBtnVisible={false} />
        </View>
        <ScrollView>
          <CustomModal
            isModalVisible={this.state.isError}
            isSuccess={false}
            text="Đã có lỗi xảy ra. Vui lòng nhấn quay lại và thử lại."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isError: false})}
          />
          <View style={styles.infoContainer}>
            {this.state.imgURL ? (
              <Image
                style={styles.avatar}
                source={{uri: this.state.imgURL}}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={styles.avatar}
                source={require('../../assets/img/no_avatar.png')}
                resizeMode="cover"
              />
            )}
            <View style={{marginLeft: 16}}>
              <Text style={styles.name}>{this.state.fullname}</Text>
              <Text style={styles.email}>{this.state.email}</Text>
            </View>
          </View>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          <Button
            rounded
            block
            style={styles.logOutBtn}
            onPress={() => this.signOutUser()}>
            <Text style={styles.logOutText} uppercase={false}>
              Đăng xuất
            </Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.gray,
  },
  name: {
    fontFamily: 'Cabin-Bold',
    fontSize: 18,
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 16,
  },
  listContainer: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
  },
  lineSeperator: {
    borderWidth: 1,
    borderColor: Color.lightGray,
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',
  },
  logOutBtn: {
    justifyContent: 'center',
    margin: 16,
    backgroundColor: Color.primaryColor,
  },
  logOutText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: 'white',
  },
  icon: {
    fontSize: 18,
    alignSelf: 'center',
  },
  avatar: {
    borderRadius: 50,
    width: 70,
    height: 70,
  },
});
