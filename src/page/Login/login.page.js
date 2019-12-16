/* eslint-disable react-native/no-inline-styles */
import {Body, Header, Left, Right, Title, Button, Text, Row} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import LoginForm from './components/login.form.js';
import {TouchableOpacity} from 'react-native';

export default class HomePage extends React.Component {
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
            androidStatusBarColor={'white'}
            style={{backgroundColor: 'white'}}>
            <Left style={{flex: 0.2}} />
            <Body style={{flex: 0.6, alignItems: 'center'}}>
              <Title style={styles.headerText}>Đăng nhập</Title>
            </Body>
            <Right style={{flex: 0.2}} />
          </Header>
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <LoginForm />
          <View style={styles.bottomWrap}>
            <TouchableOpacity>
              <Text style={styles.bottomTxt}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bottomTxt}>Chưa có tài khoản?</Text>
              <TouchableOpacity>
                <Text
                  style={[
                    styles.bottomTxt,
                    {color: 'red', fontWeight: '600', marginLeft: 5},
                  ]}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button style={styles.btnStyle}>
            <Text uppercase={false} style={styles.btnText}>
              Đăng nhập
            </Text>
          </Button>
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
    marginVertical: 50,
    marginHorizontal: 16,
  },
  bottomWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  bottomTxt: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    color: 'black',
  },
});
