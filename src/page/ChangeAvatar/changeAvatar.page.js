/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import Ticket from '../../../firebaseConfig';
import {SCREEN_WIDTH} from '../../shared/ultility.js';

var options = {
  title: 'Chọn ảnh đại diện',
  cancelButtonTitle: 'Hủy bỏ',
  takePhotoButtonTitle: 'Chụp từ camera',
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class ChangeAvatarPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      imgURL: firebase.auth().currentUser.photoURL,
      imgName: 'default',
      isError: false,
      isDone: false,
    };
  }

  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;

      const imageRef = Ticket.storage()
        .ref(firebase.auth().currentUser.uid)
        .child(this.state.imgName);

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(url => {
          firebase.auth().currentUser.updateProfile({photoURL: url});
          resolve(url);
          console.log(url);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getImage = async () => {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       title: 'Truy cập camera',
    //       message: 'Truy cập camera để lấy ảnh?',
    //       buttonNegative: 'Hủy bỏ',
    //       buttonPositive: 'Cho phép',
    //     },
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        tthis.setState({isError: true});
      } else {
        this.setState({imgURL: response.uri, imgName: response.fileName});
      }
    });
    // } else {
    //   console.log('Camera permission denied');
    // }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View>
          <CustomHeader
            title="Ảnh đại diện"
            isLeftBtnVisible={true}
            onPressBtnLeft={() => this.props.navigation.goBack()}
          />
        </View>
        <ScrollView style={styles.mainViewStyle}>
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
          <View>
            {this.state.imgURL ? (
              <Image
                source={{uri: this.state.imgURL}}
                resizeMode="cover"
                style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}}
              />
            ) : (
              <Image
                source={require('../../assets/img/no_avatar.png')}
                resizeMode="cover"
                style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}}
              />
            )}
            <Button style={styles.btnStyle} onPress={() => this.getImage()}>
              <Text uppercase={false} style={styles.btnText}>
                Tải ảnh lên
              </Text>
            </Button>
            <Button
              style={styles.btnStyle}
              onPress={() => this.uploadImage(this.state.imgURL)}>
              <Text uppercase={false} style={styles.btnText}>
                Lưu thay đổi
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: 'white',
    marginBottom: 60,
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
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
