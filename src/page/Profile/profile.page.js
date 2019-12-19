/* eslint-disable react-native/no-inline-styles */
import {Text, ListItem, Icon, Button} from 'native-base';
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
import { SCREEN_WIDTH } from '../../shared/ultility.js';

const list = [
  {
    key: 1,
    title: 'Vé đã đặt',
    navigation: 'BookedTicket',
  },
  {
    key: 2,
    title: 'Đã thích',
    navigation: 'BookedTicket',
  },
  {
    key: 3,
    title: 'Phương thức thanh toán',
    navigation: 'BookedTicket',
  },
  {
    key: 4,
    title: 'Cài đặt',
    navigation: 'BookedTicket',
  },
];

export default class ProfilePage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

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
          <CustomHeader
            title="Trang cá nhân"
            isLeftBtnVisible={false}
            isRightBtnVisible={true}
            rightBtnName="search"
          />
        </View>
        <ScrollView>
          <View style={styles.infoContainer}>
            <Image
              style={{borderRadius: 50}}
              source={require('../../assets/img/avatar.png')}
              resizeMode="stretch"
            />
            <View style={{marginLeft: 16}}>
              <Text style={styles.name}>Matilda Brown</Text>
              <Text style={styles.email}>matildabrown@mail.com</Text>
            </View>
          </View>
          <FlatList
            data={list}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          <Button
            rounded
            style={styles.logOutBtn}
            onPress={() => this.props.navigation.navigate('Login')}>
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
});
