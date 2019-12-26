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

export default class ChangeInformationPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEmailError: false,
      isError: false,
      isDone: false,
    };
  }

  validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Email hiện tại không hợp lệ')
      .required('* Vui lòng nhập email'),
    // password: yup
    //   .string()
    //   .required('* Vui lòng nhập mật khẩu')
    //   .matches(/(?=.{8,})/, {
    //     message: 'Mật khẩu phải gồm 8 kí tự',
    //   }),
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
  });

  handleUpdate = async values => {
    const user = firebase.auth().currentUser;
    if (user.displayName !== values.fullname || user.email !== values.email) {
      await firebase
        .auth()
        .currentUser.updateProfile({
          displayName: values.fullname,
        })
        .then(value =>
          firebase
            .auth()
            .currentUser.updateEmail(values.email)
            .then(value => this.setState({isDone: true}))
            .catch(error => this.setState({isEmailError: true})),
        )
        .catch(error => this.setState({isError: true}));
    }
  };

  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={{backgroundColor: 'white'}}>
        <View>
          <CustomHeader
            title="Thông tin cá nhân"
            isLeftBtnVisible={true}
            onPressBtnLeft={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <CustomModal
            isModalVisible={this.state.isEmailError}
            isSuccess={false}
            text="Email bạn vừa nhập đã được sử dụng. Vui lòng nhấn quay lại và sử dụng email khác."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isEmailError: false})}
          />
          <CustomModal
            isModalVisible={this.state.isError}
            isSuccess={false}
            text="Đã có lỗi xảy ra. Vui lòng nhấn quay lại và thử lại."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isError: false})}
          />
          <CustomModal
            isModalVisible={this.state.isDone}
            isSuccess={true}
            text="Đã đổi thông tin thành công."
            btnText="Quay lại"
            onPressBtn={() => {
              this.setState({isDone: false});
              this.props.navigation.goBack();
            }}
          />
          <Formik
            initialValues={{
              email: user.email,
              password: '',
              fullname: user.displayName,
            }}
            validationSchema={this.validationSchema}
            onSubmit={values => this.handleUpdate(values)}>
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
                  <Form style={{marginRight: 16}}>
                    <Item floatingLabel>
                      <Label style={styles.input}>Họ và tên</Label>
                      <Input
                        placeholder="Họ và tên"
                        style={styles.input}
                        onTouchStart={() => setFieldTouched('fullname')}
                        onChangeText={handleChange('fullname')}
                        onBlur={handleBlur('fullname')}
                        value={values.fullname}
                      />
                    </Item>
                    {touched.fullname && errors.fullname && (
                      <Text style={styles.errorText}>{errors.fullname}</Text>
                    )}
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
                    {/* <Item floatingLabel>
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
                    )} */}
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
                      Lưu thay đổi
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
