import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Platform,
} from 'react-native';

import {Text, Button, Header, Body, Title, Left, Right} from 'native-base';
import Color from '../../shared/Color.js';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: <View/>
  };
  render() {
    return (
      <SafeAreaView>
        <Header iosBarStyle='default' androidStatusBarColor={Color.primaryColor} style={{backgroundColor: Color.primaryColor}}>
          <Left style={{flex: 0.2}}></Left>
          <Body style={{flex: 0.6, alignItems:'center'}}>
            <Title>Trang chủ</Title>
          </Body>
          <Right style={{flex: 0.2}}></Right>
        </Header>
      </SafeAreaView>
    );
  }
}
