import {Button, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Color from '../../../shared/Color';
import {SCREEN_WIDTH} from '../../../shared/ultility';

export default class ShowItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <View style={styles.showItem}>
          <Image
            source={{uri: this.props.item.card}}
            resizeMode="cover"
            style={{width: '100%', height: '40%'}}
          />
          <View style={{width: '100%'}}>
            <Text numberOfLines={2} style={styles.showName}>
              {this.props.item.title}
            </Text>
            <Text style={styles.descriptionText}>
              {this.props.item.category}
            </Text>
            <Text style={styles.dateText}>
              {this.props.item.dateNum} {this.props.item.dateMonth}
            </Text>
            <Button rounded small style={styles.btnStyle}>
              <Text uppercase={false} style={styles.btnText}>
                Đặt vé
              </Text>
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  showName: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 20,
  },
  descriptionText: {
    color: Color.gray,
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  dateText: {
    color: 'black',
    fontFamily: 'Cabin-Italic',
    fontSize: 14,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
  },
  btnStyle: {
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
    marginTop: 16,
  },
  showItem: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 2,
    borderRadius: 5,
    width: SCREEN_WIDTH - 32,
    height: 260,
  },
});
