/* eslint-disable react-native/no-inline-styles */
import {
  Body,
  Header,
  Left,
  Right,
  Title,
  Button,
  Text,
  Form,
  Input,
  Item,
  Label,
} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import {Image, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomHeader from '../../shared/component/customHeader';

export default class LoginPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

  validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('* Vui lòng nhập tên đăng nhập')
      .matches(/^[a-zA-Z0-9]+([_\s\-]?[a-zA-Z0-9])*$/, {
        message: 'Tên đăng nhập không hợp lệ',
      }),
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự',
      }),
  });

  render() {
    return (
      <View>
        <View>
          <CustomHeader title="Đăng nhập" isLeftBtnVisible={false} />
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={this.validationSchema}
            onSubmit={values => this.props.navigation.navigate('Profile')}>
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
                        <Label style={styles.input}>Tên đăng nhập</Label>
                        <Input
                          placeholder="Tên đăng nhập"
                          style={styles.input}
                          onTouchStart={() => setFieldTouched('username')}
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                        />
                      </Item>
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
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
                      <TouchableOpacity>
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
