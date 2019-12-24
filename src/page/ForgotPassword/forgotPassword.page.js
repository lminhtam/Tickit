/* eslint-disable react-native/no-inline-styles */
import {Button, Text, Form, Input, Item, Label} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomHeader from '../../shared/component/customHeader';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';

export default class ForgotPasswordPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isNotHaveAccount: false,
    };
  }

  validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Email hiện tại không hợp lệ')
      .required('* Vui lòng nhập email'),
  });

  handlePasswordReset = (values, actions) => {
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(values.email)
        .then(() => this.props.navigation.navigate('Loading'))
        .catch(error => {
          if (error.code === 'auth/user-not-found')
            this.setState({isNotHaveAccount: true});
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View>
        <View>
          <CustomHeader
            title="Quên mật khẩu"
            isLeftBtnVisible={true}
            onPressBtnLeft={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView>
          <CustomModal
            isModalVisible={this.state.isNotHaveAccount}
            isSuccess={false}
            text="Bạn chưa có tài khoản. Vui lòng nhấn nút đăng ký."
            btnText="Đăng ký"
            onPressBtn={() => {
              this.setState({isNotHaveAccount: false});
              this.props.navigation.navigate('SignUp');
            }}
          />
          <Formik
            initialValues={{email: ''}}
            validationSchema={this.validationSchema}
            onSubmit={values => this.handlePasswordReset(values)}>
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
                  <Text style={styles.infoText}>
                    Vui lòng nhập email. Bạn sẽ nhận được được dẫn tạo mật khẩu
                    mới qua email.
                  </Text>
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
                  </Form>
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
                      Gửi
                    </Text>
                  </Button>
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
  input: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
  },
  infoText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: 'black',
    margin: 16,
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
    marginVertical: 30,
    marginHorizontal: 16,
  },
});
