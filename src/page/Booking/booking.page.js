import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';

import {Text, Button, Input} from 'native-base';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility';
import {Formik} from 'formik';
import * as yup from 'yup';
import firebase from 'firebase';

export default class BookingPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
  }

  focusTheField = id => {
    this.inputs[id]._root.focus();
  };
  inputs = {};

  validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Email hiện tại không hợp lệ')
      .required('* Vui lòng nhập email'),
    phoneNumber: yup
      .string()
      .required('* Vui lòng nhập số điện thoại')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
        message: 'Số điện thoại không hợp lệ',
      }),
    fullname: yup
      .string()
      .trim()
      .required('* Vui lòng nhập họ và tên')
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: 'Họ tên không hợp lệ',
        },
      ),
    id: yup
      .string()
      .required('* Vui lòng nhập CMND/CCCD')
      .matches(/^([0-9]{9}|[0-9]{12})$/, {
        message: 'CMND/CCCD không hợp lệ',
      }),
  });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          title="Đặt vé"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        <ScrollView
          style={{backgroundColor: 'white'}}
          contentContainerStyle={styles.mainViewStyle}>
          <Formik
            initialValues={{
              fullname: firebase.auth().currentUser.displayName,
              phoneNumber: '',
              email: firebase.auth().currentUser.email,
              id: '',
            }}
            validationSchema={this.validationSchema}
            onSubmit={values => {
              this.props.navigation.navigate('TicketInfo', {
                user: values,
                quantityTicket: this.props.navigation.getParam(
                  'ticketQuantity',
                ),
                itemIndex: this.props.navigation.getParam('itemIndex'),
              });
            }}>
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
                  <Input
                    style={styles.infoItem}
                    placeholder="Họ và tên"
                    onTouchStart={() => setFieldTouched('fullname')}
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusTheField('phoneNumber');
                    }}
                  />
                  {touched.fullname && errors.fullname && (
                    <Text style={styles.errorText}>{errors.fullname}</Text>
                  )}
                  <Input
                    style={styles.infoItem}
                    placeholder="Số điện thoại"
                    onTouchStart={() => setFieldTouched('phoneNumber')}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusTheField('email');
                    }}
                    getRef={input => {
                      this.inputs['phoneNumber'] = input;
                    }}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                  <Input
                    style={styles.infoItem}
                    placeholder="Email"
                    onTouchStart={() => setFieldTouched('email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    blurOnSubmit={false}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusTheField('id');
                    }}
                    getRef={input => {
                      this.inputs['email'] = input;
                    }}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <Input
                    style={styles.infoItem}
                    placeholder="CMND"
                    onTouchStart={() => setFieldTouched('id')}
                    onChangeText={handleChange('id')}
                    onBlur={handleBlur('id')}
                    value={values.id}
                    getRef={input => {
                      this.inputs['id'] = input;
                    }}
                  />
                  {touched.id && errors.id && (
                    <Text style={styles.errorText}>{errors.id}</Text>
                  )}
                  <Button
                    rounded
                    block
                    disabled={!isValid}
                    style={[
                      styles.bookBtn,
                      {
                        backgroundColor: isValid
                          ? Color.primaryColor
                          : Color.gray,
                      },
                    ]}
                    onPress={handleSubmit}>
                    <Text uppercase={false} style={styles.bookText}>
                      Tiếp tục
                    </Text>
                  </Button>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'white',
  },
  container: {
    marginBottom: 60,
  },
  infoItem: {
    flex: 1,
    margin: 16,
    paddingLeft: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
    backgroundColor: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
  },
  bookBtn: {
    margin: 16,
    justifyContent: 'center',
  },
  bookText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Cabin-Regular',
    fontSize: 12,
    marginLeft: 16,
  },
});
