import * as React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Color from '../Color';
import {Button, Text} from 'native-base';
import {SCREEN_WIDTH} from '../ultility';

export default class ConfirmModal extends React.Component {
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
          <Text style={{...styles.noRecom, alignSelf: 'center'}}>
            {this.props.text}
          </Text>
          <View style={styles.btnContainer}>
            <Button
              bordered
              color={Color.primaryColor}
              style={styles.cancelBtn}
              onPress={this.props.onPressCancelBtn}>
              <Text uppercase={false} style={styles.btnCancelTextStyle}>
                {this.props.btnCancelText}
              </Text>
            </Button>
            <Button
              style={styles.agreeBtn}
              onPress={this.props.onPressAgreeBtn}>
              <Text uppercase={false} style={styles.btnAgreeTextStyle}>
                {this.props.btnAgreeText}
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  noRecom: {
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    margin: 16,
  },
  recomStyle: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  btnAgreeTextStyle: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  btnCancelTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  agreeBtn: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
  },
  cancelBtn: {
    margin: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: SCREEN_WIDTH - 128,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
