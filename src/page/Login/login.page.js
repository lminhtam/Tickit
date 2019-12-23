/* eslint-disable react-native/no-inline-styles */
import {Button, Text, Form, Input, Item, Label} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import {Image, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomHeader from '../../shared/component/customHeader';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';

export default class LoginPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isWrongPassword: false,
      isNotHaveAccount: false,
    };
  }

  validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Email hiện tại không hợp lệ')
      .required('* Vui lòng nhập email'),
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự',
      }),
  });

  initUser = token => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        // Some user object has been set up somewhere, build that user here
        console.log(json);
        this.props.navigation.navigate('Profile');
      })
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      value => {
        if (value.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              value.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;
            this.initUser(accessToken);
          });
        }
      },
    );
  };

  handleLogin = values => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => this.props.navigation.navigate('Profile'))
      .catch(error => {
        if (error.code === 'auth/user-not-found')
          this.setState({isNotHaveAccount: true});
        else if (error.code === 'auth/wrong-password')
          this.setState({isWrongPassword: true});
      });
  };

  render() {
    return (
      <View>
        <View>
          <CustomHeader title="Đăng nhập" isLeftBtnVisible={false} />
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <CustomModal
            isModalVisible={this.state.isNotHaveAccount}
            isSuccess={false}
            text="Bạn chưa có tài khoản. Vui lòng nhấn nút đăng ký."
            btnText="Đăng ký"
            onPressBtn={() => this.props.navigation.navigate('SignUp')}
          />
          <CustomModal
            isModalVisible={this.state.isWrongPassword}
            isSuccess={false}
            text="Bạn vừa nhập sai mật khẩu. Nhấn nút quay lại để nhập lại mật khẩu."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isWrongPassword: false})}
          />
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={this.validationSchema}
            onSubmit={values => this.handleLogin(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
              setFieldTouched,
            }) => {
              return (
                <View>
                  <View>
                    <Form style={{marginRight: 16}}>
                      <Item floatingLabel>
                        <Label style={styles.input}>Email</Label>
                        <Input
                          placeholder="Email"
                          style={styles.input}
                          onTouchStart={() => setFieldTouched('email')}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                      </Item>
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                      <Item floatingLabel>
                        <Label style={styles.input}>Mật khẩu</Label>
                        <Input
                          secureTextEntry={true}
                          placeholder="Mật khẩu"
                          style={styles.input}
                          onTouchStart={() => setFieldTouched('password')}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                      </Item>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </Form>
                  </View>
                  <View style={styles.bottomWrap}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ForgotPassword')
                      }>
                      <Text style={styles.bottomTxt}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.bottomTxt}>Chưa có tài khoản?</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('SignUp')
                        }>
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
                  <Button
                    style={[
                      styles.btnStyle,
                      {
                        backgroundColor: isValid
                          ? Color.primaryColor
                          : Color.gray,
                      },
                    ]}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text uppercase={false} style={styles.btnText}>
                      Đăng nhập
                    </Text>
                  </Button>

                  <View style={styles.addButton}>
                    <Text style={styles.bottomTxt}>Đăng nhập bằng</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/img/Google.png')}
                          style={{width: 92, height: 64}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.handleFacebookLogin()}>
                        <Image
                          source={require('../../assets/img/Facebook.png')}
                          style={{width: 92, height: 64}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          </Formik>
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
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    marginLeft: 16,
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
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
