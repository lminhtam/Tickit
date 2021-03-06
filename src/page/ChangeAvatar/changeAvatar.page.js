/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import firebase from 'firebase';
import CustomModal from '../../shared/component/customModal';
import RNFetchBlob from 'rn-fetch-blob';
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
      hasNotChanged: false,
    };
  }

  uploadImage = (uri, mime = 'application/octet-stream') => {
    if (uri == firebase.auth().currentUser.photoURL) {
      this.setState({hasNotChanged: true});
      return;
    }
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;

    Ticket.storage()
      .ref(firebase.auth().currentUser.uid)
      .child(this.state.imgName)
      .getDownloadURL()
      .then(value => {
        this.setState({isDone: true});
        firebase.auth().currentUser.updateProfile({photoURL: value});
      })
      .catch(async error => {
        const imageRef = await Ticket.storage()
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
            this.setState({isDone: true});
            firebase.auth().currentUser.updateProfile({photoURL: url});
          })
          .catch(error => this.setState({isError: true}));
      });
  };

  getImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        this.setState({isError: true});
      } else {
        this.setState({imgURL: response.uri, imgName: response.fileName});
      }
    });
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
            isModalVisible={this.state.hasNotChanged}
            isSuccess={false}
            text="Bạn chưa tải ảnh mới lên. Nhấn quay lại để tải ảnh mới."
            btnText="Quay lại"
            onPressBtn={() => this.setState({hasNotChanged: false})}
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
