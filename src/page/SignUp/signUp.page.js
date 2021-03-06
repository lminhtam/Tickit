/* eslint-disable react-native/no-inline-styles */
import {Button, Text, Form, Input, Item, Label} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color.js';
import {Image, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomHeader from '../../shared/component/customHeader';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from 'react-native-google-signin';
import Ticket from '../../../firebaseConfig';

export default class SignUpPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isHaveAccount: false,
      isNotHaveAccount:
        false || this.props.navigation.getParam('isNotHaveAccount'),
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '632063081492-rcfmt003oumdinga4u9j4hvhsbdqtje9.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      loginHint: '',
      forceConsentPrompt: true,
      accountName: '',
    });
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
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .matches(/(?=.{8,})/, {
        message: 'Mật khẩu phải gồm 8 kí tự',
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
  });

  setDatabase = async fullname => {
    await firebase
      .auth()
      .currentUser.updateProfile({
        displayName: fullname,
      })
      .then(() => {
        firebase
          .database()
          .ref('users/' + firebase.auth().currentUser.uid + '/profile')
          .set({
            fullname: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
          });
        console.log('chay');
        this.props.navigation.navigate('ProfileStack');
      })
      .catch(error => {});
  };

  handleSignUp = values => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        this.setDatabase(values.fullname);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use')
          this.setState({isHaveAccount: true});
      });
  };

  handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      value => {
        if (value.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken,
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(() => {
                firebase
                  .database()
                  .ref('users/' + firebase.auth().currentUser.uid + '/profile')
                  .set({
                    fullname: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                  });
                this.props.navigation.navigate('ProfileStack');
              })
              .catch(error => {
                if (
                  error.code === 'auth/account-exists-with-different-credential'
                )
                  this.setState({isHaveAccount: true});
              });
          });
        }
      },
    );
  };

  _googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          firebase
            .database()
            .ref('users/' + firebase.auth().currentUser.uid + '/profile')
            .set({
              fullname: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
            });
          this.props.navigation.navigate('ProfileStack');
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // console.log('Cancelled sign up');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({isHaveAccount: true});
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // console.log('Play service is not available');
      } else {
        this.setState({isError: true});
      }
    }
  };

  render() {
    return (
      <View>
        <View>
          <CustomHeader title="Đăng ký" isLeftBtnVisible={false} />
        </View>
        <ScrollView style={styles.mainViewStyle}>
          <CustomModal
            isModalVisible={this.state.isHaveAccount}
            isSuccess={false}
            text="Bạn đã có tài khoản. Vui lòng nhấn nút đăng nhập."
            btnText="Đăng nhập"
            onPressBtn={() => {
              this.setState({isHaveAccount: false});
              this.props.navigation.navigate('Login');
            }}
          />
          <CustomModal
            isModalVisible={this.state.isError}
            isSuccess={false}
            text="Đã có lỗi xảy ra. Vui lòng nhấn quay lại và thử lại."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isError: false})}
          />
          <CustomModal
            isModalVisible={this.state.isNotHaveAccount}
            isSuccess={false}
            text="Bạn chưa có tài khoản. Vui lòng nhấn nút quay lại và đăng ký."
            btnText="Quay lại"
            onPressBtn={() => this.setState({isNotHaveAccount: false})}
          />
          <Formik
            initialValues={{email: '', password: '', fullname: ''}}
            validationSchema={this.validationSchema}
            onSubmit={values => this.handleSignUp(values)}>
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
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        onSubmitEditing={() => {
                          this.focusTheField('email');
                        }}
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
                        blurOnSubmit={false}
                        returnKeyType={'next'}
                        onSubmitEditing={() => {
                          this.focusTheField('password');
                        }}
                        getRef={input => {
                          this.inputs['email'] = input;
                        }}
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
                        getRef={input => {
                          this.inputs['password'] = input;
                        }}
                      />
                    </Item>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </Form>
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
                      Đăng ký
                    </Text>
                  </Button>
                  <View style={styles.addButton}>
                    <Text style={styles.bottomTxt}>Đăng ký với</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity onPress={() => this._googleSignIn()}>
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
  mainViewStyle: {
    backgroundColor: 'white',
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
