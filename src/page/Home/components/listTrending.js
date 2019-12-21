/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Color from '../../../shared/Color';
import ShowItem from '../components/showItem';
import Data from '../../../shared/Data';

export default class ListTrending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: Data,
    };
  }

  checkCategory = value => {
    return (
      value.category === this.props.filter || this.props.filter === 'Tất cả'
    );
  };

  renderItem = ({item}) => (
    <ShowItem item={item} onPressItem={this.props.onPressItem} />
  );

  render() {
    return (
      <View>
        <Text style={styles.titleTextStyle}>Phổ biến</Text>
        {Data.filter(this.checkCategory) &&
        Data.filter(this.checkCategory).length > 0 ? (
          <FlatList
            data={Data.filter(this.checkCategory)}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={item => item.title}
          />
        ) : (
          <Text style={styles.errorText}>Không tìm thấy kết quả phù hợp.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    margin: 16,
  },
  errorText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.gray,
    marginLeft: 16,
    marginRight: 16,
  },
});
