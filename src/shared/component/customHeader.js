import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {Button, Header, Body, Title, Left, Right, Icon} from 'native-base';
import Color from '../../shared/Color.js';

export default class CustomHeader extends React.Component {
  render() {
    return (
      <Header
        iosBarStyle="default"
        androidStatusBarColor={Color.primaryColor}
        style={{backgroundColor: Color.primaryColor}}>
        <Left style={{flex: 0.2}}>
          {false || this.props.isLeftBtnVisible ? (
            <Button transparent onPress={this.props.onPressBtnLeft}>
              <Icon
                name={this.props.leftIconName ? this.props.leftIconName : "keyboard-arrow-left"}
                type="MaterialIcons"
                style={{fontSize: 28}}
              />
            </Button>
          ) : (
            <View />
          )}
        </Left>
        <Body style={styles.bodyStyle}>
          <Title style={styles.headerText}>{this.props.title}</Title>
        </Body>
        <Right style={{flex: 0.2}}>
          {false || this.props.isRightBtnVisible ? (
            <Button transparent onPress={this.props.onPressBtnRight}>
              <Icon
                name={
                  this.props.rightBtnName ? this.props.rightBtnName : 'undo'
                }
                type="MaterialIcons"
                style={{fontSize: 28}}
              />
            </Button>
          ) : (
            <View />
          )}
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontFamily: 'Cabin-SemiBold',
    fontSize: 28,
  },
  bodyStyle: {
    flex: 0.6,
    alignItems: 'center',
  },
});
