import * as React from 'react';
import {View, StyleSheet, Modal, Alert} from 'react-native';
import Color from '../Color';
import {Button, Text, Thumbnail} from 'native-base';
import {SCREEN_WIDTH} from '../ultility';

export default class CustomModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalContainer}>
          <Thumbnail
            large
            source={
              this.props.isSuccess
                ? require('../../assets/img/success.png')
                : require('../../assets/img/error.png')
            }
            style={{alignSelf: 'center', marginTop: 16}}
          />
          <Text style={{...styles.noRecom, alignSelf: 'center'}}>
            {this.props.text}
          </Text>
          <Button
            style={styles.applyBtn}
            onPress={this.props.onPressBtn}>
            <Text uppercase={false} style={styles.btnTextStyle}>{this.props.btnText}</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  noRecom: {
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
    margin: 16,
  },
  recomStyle: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  applyBtn: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: SCREEN_WIDTH - 64,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.7,
    shadowRadius: 20,
    marginTop: 150,
  },
});
