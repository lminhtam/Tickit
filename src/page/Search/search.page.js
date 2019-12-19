/* eslint-disable react-native/no-inline-styles */
import {Button, Text} from 'native-base';
import * as React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Color from '../../shared/Color';
import SearchBarComponent from './components/searchBar';
import ShowItem from '../Home/components/showItem';
const show = [
  {
    title: 'Ca nhạc',
    category: 'Âm nhạc',
    date: 'October 15',
  },
  {
    title: 'Trò chơi',
    category: 'Hài kịch',
    date: 'October 15',
  },
  {
    title: 'Jiyeon Lala',
    category: 'Workshop',
    date: 'October 15',
  },
  {
    title: 'Jiyeon haha',
    category: 'Workshop',
    date: 'October 15',
  },
  {
    title: 'Girldf',
    category: 'Workshop',
    date: 'October 15',
  },
  {
    title: 'The talent show',
    category: 'Workshop',
    date: 'October 15',
  },
];

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: '', show: show};
    this.arrayholder = [];
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = show.filter(function(item) {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      show: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({item}) => (
    <ShowItem
      item={item}
      onPressItem={() => this.props.navigation.navigate('DetailEvent')}
    />
  );

  render() {
    return (
      <View style={styles.viewStyle}>
        <SearchBarComponent
          onChangeText={text => this.SearchFilterFunction(text)}
          placeholder="Nhập tên show"
          value={this.state.search}
        />
        <FlatList
          data={this.state.show}
          renderItem={this.renderItem}
          enableEmptySections={true}
          style={{marginTop: 10}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  textStyle: {
    padding: 10,
  },
  titleTextStyle: {
    color: Color.primaryColor,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    margin: 16,
  },
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
