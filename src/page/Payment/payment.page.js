/* eslint-disable react-native/no-inline-styles */
import {Text, ListItem, CheckBox, Body} from 'native-base';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility';

export default class PaymentPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDefault: true,
    };
  }

  handlePressCheckBox = () => {
    this.setState({isDefault: !this.state.isDefault});
  };

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View>
          <CustomHeader
            title="Thanh toán"
            isLeftBtnVisible={true}
            onPressBtnLeft={() => this.props.navigation.goBack()}
          />
        </View>
        <Image
          source={require('../../assets/img/Card.png')}
          resizeMode="contain"
          style={{width: '100%'}}
        />
        <ListItem
          onPress={() => this.handlePressCheckBox()}
          style={{width: SCREEN_WIDTH - 32}}
          itemDivider={false}>
          <CheckBox
            checked={this.state.isDefault}
            color={Color.primaryColor}
            onPress={() => this.handlePressCheckBox()}
          />
          <Body>
            <Text style={styles.recomStyle}>Đặt làm phương thức mặc định</Text>
          </Body>
        </ListItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recomStyle: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
  },
});
