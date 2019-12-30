/* eslint-disable react-native/no-inline-styles */
import {Text, Spinner} from 'native-base';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color';
import ShowItem from '../Home/components/showItem';
import Ticket from '../../../firebaseConfig';
import CustomHeader from '../../shared/component/customHeader';
import firebase from 'firebase';

export default class LikedShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: [],
      isLoading: true,
      liked: [],
    };
  }

  readUserData = async () => {
    let data = [];
    let shows = [];
    await Ticket.database()
      .ref()
      .child('users/' + firebase.auth().currentUser.uid + '/likedShow/liked')
      .on('value', snapshot => {
        data = snapshot.val();
        if (data) {
          this.setState({liked: data});
          shows = [];
          for (let i = 0; i < data.length; i++) {
            Ticket.database()
              .ref('shows')
              .child(data[i].toString())
              .once('value', snapshot => {
                shows.push(snapshot.val());
                this.setState({show: shows});
              });
          }
        } else this.setState({liked: [], show: []});
      });
    this.setState({isLoading: false});
  };

  componentDidMount() {
    this.readUserData();
  }

  onPressLikeBtn = async index => {
    console.log(this.state.show);
    console.log(index);
    let likedShow = this.state.liked;
    let pos = likedShow.indexOf(index);
    console.log(pos);
    if (pos !== -1) {
      likedShow.splice(pos, 1);
    } else likedShow.push(index);
    console.log(likedShow);
    await Ticket.database()
      .ref()
      .child('users/' + firebase.auth().currentUser.uid + '/likedShow')
      .set({liked: likedShow})
      .then(() => this.setState({liked: likedShow}));
  };

  renderItem = ({item, index}) => {
    return (
      <ShowItem
        item={item}
        liked={true}
        onPressItem={() =>
          this.props.navigation.navigate('Detail', {
            used: 'LikedShow',
            index: this.state.liked[index],
          })
        }
        onPressLikeBtn={() => this.onPressLikeBtn(this.state.liked[index])}
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
          onPressBtnLeft={() => this.props.navigation.navigate('ProfilePage')}
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
