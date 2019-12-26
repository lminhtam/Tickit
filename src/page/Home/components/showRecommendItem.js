import {Button, Text, Card, CardItem, Icon} from 'native-base';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Color from '../../../shared/Color';

export default class ShowRecommendItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        style={styles.showItem}
        onPress={this.props.onPressItem}>
        <Card>
          <CardItem>
            <View style={{width: '100%', height: 310}}>
              <View style={{width: '100%', height: 150}}>
                <Image
                  source={{uri: item.card}}
                  resizeMode="cover"
                  style={{flex: 1}}
                />
                <TouchableOpacity
                  style={styles.likeBtn}
                  onPress={this.props.onPressLikeBtn}>
                  <Icon
                    name={
                      false || this.props.liked
                        ? 'ios-heart'
                        : 'ios-heart-empty'
                    }
                    type="Ionicons"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <Text numberOfLines={2} style={styles.showName}>
                  {item.title}
                </Text>
                <Text style={styles.descriptionText}>{item.category}</Text>
                <Text style={styles.dateText}>
                  {item.dateNum} Tháng {item.dateMonth} Năm {item.dateYear}
                </Text>
                <Button
                  rounded
                  block
                  style={styles.btnStyle}
                  onPress={this.props.onPressItem}>
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
  likeBtn: {
    width: 24,
    height: 24,
    margin: 16,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Color.primaryColor,
    borderRadius: 50,
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: 20,
    color: 'white',
    position: 'relative',
    bottom: 1,
    right: -4,
  },
});
