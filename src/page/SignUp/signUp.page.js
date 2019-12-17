/* eslint-disable react-native/no-inline-styles */
import {Body, Header, Left, Right, Title, Button, Text, Row} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import SignUpForm from './components/signUp.form.js';
import {Image, TouchableOpacity} from 'react-native';

export default class SignUpPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Header
            hasSegment
            iosBarStyle="default"
            androidStatusBarColor={Color.primaryColor}
            style={{backgroundColor: 'white'}}>
            <Left style={{flex: 0.2}} />
            <Body style={{flex: 0.6, alignItems: 'center'}}>
              <Title style={styles.headerText}>Đăng ký</Title>
            </Body>
            <Right style={{flex: 0.2}} />
          </Header>
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <SignUpForm />
          <View style={styles.bottomWrap}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bottomTxt}>Đã có tài khoản?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={[
                    styles.bottomTxt,
                    {color: 'red', fontWeight: '600', marginLeft: 5},
                  ]}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button style={styles.btnStyle}>
            <Text uppercase={false} style={styles.btnText}>
              Đăng ký
            </Text>
          </Button>
          <View style={styles.addButton}>
            <Text style={styles.bottomTxt}>Đăng ký với</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/img/Google.png')}
                  style={{width: 92, height: 64}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/img/Facebook.png')}
                  style={{width: 92, height: 64}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 28,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    lineHeight: 22,
  },
  btnStyle: {
    backgroundColor: Color.primaryColor,
    borderRadius: 25,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 16,
  },
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 16,
  },
  bottomTxt: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    color: 'black',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
