import {Button, Text, Card, CardItem} from 'native-base';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Color from '../../../shared/Color';

export default class ShowRecommendItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.showItem}
        onPress={this.props.onPressItem}>
        <Card>
          <CardItem>
            <View style={{width: '100%', height: 370}}>
              <Image
                source={{uri: this.props.item.card}}
                resizeMode="cover"
                style={{width: '100%', height: '50%'}}
              />
              <View style={{width: '100%'}}>
                <Text style={styles.showName}>{this.props.item.title}</Text>
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
          </CardItem>
        </Card>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
});
