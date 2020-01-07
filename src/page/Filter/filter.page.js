/* eslint-disable react-native/no-inline-styles */
import {Text, ListItem, CheckBox, Body} from 'native-base';
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Color from '../../shared/Color.js';
import CustomHeader from '../../shared/component/customHeader';
import {SCREEN_WIDTH} from '../../shared/ultility';

export default class FilterPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSort: this.props.navigation.getParam('sort'),
      sort: [
        {
          title: 'Ngày diễn ra',
        },
        {
          title: 'Đánh giá',
        },
      ],
    };
  }

  onPressSortItem = index => {
    this.setState({
      activeSort: index,
    });
  };

  goBack = () => {
    const {navigation} = this.props;
    navigation.state.params.onSelect(this.state.activeSort);
    navigation.goBack();
  };

  renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => this.onPressSortItem(index)}
      style={{width: SCREEN_WIDTH - 32}}>
      <View>
        <View style={styles.option}>
          <CheckBox
            checked={this.state.activeSort === index}
            color={Color.primaryColor}
            onPress={() => this.handlePressCheckBox()}
          />
          <Text style={styles.recomStyle}>{item.title}</Text>
        </View>
        <View style={styles.seperator} />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View>
          <CustomHeader
            title="Sắp xếp"
            isLeftBtnVisible={true}
            leftIconName="close"
            onPressBtnLeft={this.goBack}
          />
        </View>
        <Text style={styles.type}>Sắp xếp theo</Text>
        <FlatList
          data={this.state.sort}
          keyExtractor={index => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recomStyle: {
    color: 'black',
    fontFamily: 'Cabin-Regular',
    fontSize: 18,
    marginLeft: 28,
  },
  seperator: {
    width: SCREEN_WIDTH - 32,
    borderColor: Color.gray,
    borderWidth: 0.3,
    marginTop: 8,
    alignSelf: 'center',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  type: {
    fontFamily: 'Cabin-SemiBold',
    fontSize: 20,
    color: 'black',
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
  },
});
