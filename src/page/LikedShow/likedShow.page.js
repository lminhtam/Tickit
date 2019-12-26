/* eslint-disable react-native/no-inline-styles */
import {Text, Spinner} from 'native-base';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color';
import ShowItem from '../Home/components/showItem';
import Ticket from '../../../firebaseConfig';
import CustomHeader from '../../shared/component/customHeader';

export default class LikedShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: [],
      isLoading: true,
    };
  }

  readUserData = async () => {
    let data = [];
    await Ticket.database()
      .ref()
      .child('users/' + firebase.auth().currentUser.uid + '/likedShow')
      .once('value', snapshot => {
        data = snapshot.val();
      });
    await this.setState({show: data});
  };

  componentDidMount() {
    this.readUserData();
    this.setState({isLoading: false});
  }

  renderItem = ({item}) => {
    const index = this.state.show.indexOf(item);
    return (
      <ShowItem
        item={item}
        onPressItem={() =>
          this.props.navigation.navigate('Detail', {
            used: 'LikedShow',
            index: index,
          })
        }
      />
    );
  };

  render() {
    if (this.state.isLoading) return <Spinner color={Color.primaryColor} />;
    return (
      <View style={styles.viewStyle}>
        <CustomHeader
          title="Đã thích"
          isLeftBtnVisible={true}
          onPressBtnLeft={() => this.props.navigation.goBack()}
        />
        {this.state.show && this.state.show.length > 0 ? (
          <FlatList
            data={this.state.show}
            renderItem={this.renderItem}
            enableEmptySections={true}
            style={{marginTop: 10}}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.notFound}>Bạn chưa thích sự kiện nào.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  notFound: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: Color.gray,
    alignSelf: 'center',
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
