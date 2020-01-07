/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import Color from '../../../shared/Color';

class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  updateSearch = value => {
    this.props.onChangeText(value);
    this.setState({searchValue: value});
  };

  render() {
    return (
      <View style={styles.header}>
        <SearchBar
          lightTheme
          round
          placeholder="Nhập tên sự kiện"
          onChangeText={text => this.updateSearch(text)}
          inputContainerStyle={styles.searchbar}
          containerStyle={styles.searchcontainer}
          value={this.state.searchValue}
          inputStyle={styles.inputStyle}
        />
        <Icon
          name="filter"
          type="Feather"
          color="white"
          size={24}
          containerStyle={styles.headerIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Color.primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  searchcontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchbar: {
    borderRadius: 20,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 0,
    shadowColor: 'white',
    fontFamily: 'Cabin-Regular',
    fontSize: 14,
  },
  inputStyle: {
    fontFamily: 'Cabin-Regular',
    color: 'black',
    fontSize: 15,
  },
});
export default SearchBarComponent;
