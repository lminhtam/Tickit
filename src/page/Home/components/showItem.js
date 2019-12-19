import {Button, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Color from '../../../shared/Color';

export default class ShowItem extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressItem}>
        <View style={styles.showItem}>
          <Image
            source={require('../../../assets/img/talent-show-poster.png')}
          />
          <View style={{marginLeft: 16}}>
            <Text style={styles.showName}>{this.props.item.title}</Text>
            <Text style={styles.descriptionText}>
              {this.props.item.category}
            </Text>
            <Text style={styles.dateText}>{this.props.item.date}</Text>
            <Button
              rounded
              small
              style={styles.btnStyle}>
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
    flexDirection: 'row',
    margin: 16,
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
