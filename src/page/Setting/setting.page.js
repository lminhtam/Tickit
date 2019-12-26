/* eslint-disable react-native/no-inline-styles */
import {Text, Icon, Button} from 'native-base';
import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility.js';

const list = [
  {
    key: 1,
    title: 'Đổi ảnh đại diện',
    navigation: 'ChangeAvatar',
  },
  {
    key: 2,
    title: 'Chỉnh sửa thông tin cá nhân',
    navigation: 'ChangeInformation',
  },
];

export default class SettingPage extends React.Component {
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
            title="Cài đặt"
            isLeftBtnVisible={true}
            onPressBtnLeft={() => this.props.navigation.goBack()}
          />
        </View>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Cabin-Bold',
    fontSize: 18,
    color: 'black',
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
  icon: {
    fontSize: 18,
    alignSelf: 'center',
  },
});
