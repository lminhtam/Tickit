/* eslint-disable react-native/no-inline-styles */
import {Button, Text, Spinner} from 'native-base';
import * as React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import Color from '../../shared/Color';
import SearchBarComponent from './components/searchBar';
import ShowItem from '../Home/components/showItem';
import Ticket from '../../../firebaseConfig';
import CustomModal from '../../shared/component/customModal';
import firebase from 'firebase';

const now = new Date();

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: 0,
      shows: [],
      filterShow: [],
      isLoading: true,
      liked: [],
      isShowModal: false,
    };
  }

  readUserData = async () => {
    let data = [];
    let likedShow = [];
    await Ticket.database()
      .ref()
      .child('shows')
      .once('value', snapshot => {
        data = snapshot.val();
        data = data.filter(this.filterPassShow);
        data.sort(this.sortShowByDate);
      });
    if (firebase.auth().currentUser) {
      await Ticket.database()
        .ref()
        .child('users/' + firebase.auth().currentUser.uid + '/likedShow/liked')
        .on('value', snapshot => {
          likedShow = snapshot.val();
          if (likedShow) this.setState({liked: likedShow});
          else this.setState({liked: []});
        });
    } else this.setState({liked: []});
    await this.setState({
      shows: data,
      filterShow: data,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.readUserData();
    let likedShow = [];
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Ticket.database()
          .ref()
          .child(
            'users/' + firebase.auth().currentUser.uid + '/likedShow/liked',
          )
          .once('value', snapshot => {
            likedShow = snapshot.val();
            if (likedShow) this.setState({liked: likedShow});
            else this.setState({liked: []});
          });
      } else this.setState({liked: []});
    });
  }

  onPressLikeBtn = async index => {
    if (firebase.auth().currentUser) {
      let likedShow = this.state.liked;
      let pos = likedShow.indexOf(index);
      if (pos !== -1) {
        likedShow.splice(pos, 1);
      } else likedShow.push(index);
      await this.setState({liked: likedShow});
      await Ticket.database()
        .ref()
        .child('users/' + firebase.auth().currentUser.uid + '/likedShow')
        .set({liked: this.state.liked});
    } else this.setState({isShowModal: true});
  };

  filterShow = item => {
    return (
      item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
      item.category.toLowerCase().includes(this.state.search.toLowerCase())
    );
  };

  filterPassShow = item => {
    let aDate = new Date(
      Number(item.dateYear),
      Number(item.dateMonth) - 1,
      Number(item.dateNum),
    );
    return aDate.getTime() > now.getTime();
  };

  SearchFilterFunction = async text => {
    await this.setState({search: text});
    this.setState({filterShow: this.state.shows.filter(this.filterShow)});
  };

  sortShowByDate = (a, b) => {
    let aDate = new Date(
      Number(a.dateYear),
      Number(a.dateMonth) - 1,
      Number(a.dateNum),
    );
    let bDate = new Date(
      Number(b.dateYear),
      Number(b.dateMonth) - 1,
      Number(b.dateNum),
    );
    return aDate.getTime() - bDate.getTime();
  };

  sortByRating = (a, b) => {
    return b.rating.localeCompare(a.rating);
  };

  onSelect = data => {
    if (this.state.sort === data) return;
    this.setState({sort: data});
    if (data === 0) {
      this.setState({filterShow: this.state.shows.sort(this.sortShowByDate)});
    } else if (data === 1) {
      this.setState({filterShow: this.state.shows.sort(this.sortByRating)});
    }
  };

  renderItem = ({item}) => {
    return (
      <ShowItem
        item={item}
        liked={this.state.liked.indexOf(item.id) !== -1}
        onPressItem={() => {
          this.props.navigation.navigate('Detail', {
            index: item.id,
          });
        }}
        onPressLikeBtn={() => this.onPressLikeBtn(item.id)}
      />
    );
  };

  render() {
    if (this.state.isLoading) return <Spinner color={Color.primaryColor} />;
    return (
      <View style={styles.viewStyle}>
        <SearchBarComponent
          onChangeText={text => this.SearchFilterFunction(text)}
          placeholder="Nhập tên sự kiện"
          value={this.state.search}
          onPressFilter={() =>
            this.props.navigation.navigate('Filter', {
              onSelect: this.onSelect,
              sort: this.state.sort,
            })
          }
        />
        <CustomModal
          isModalVisible={this.state.isShowModal}
          isSuccess={false}
          text="Bạn chưa đăng nhập. Để nhấn nút 'Yêu thích', vui lòng đăng nhập."
          btnText="Đăng nhập"
          onPressBtn={() => {
            this.setState({isShowModal: false});
            this.props.navigation.navigate('Login');
          }}
        />
        {this.state.filterShow && this.state.filterShow.length > 0 ? (
          <FlatList
            data={this.state.filterShow}
            renderItem={this.renderItem}
            enableEmptySections={true}
            style={{marginTop: 10}}
            keyExtractor={index => index.toString()}
          />
        ) : (
          <Text style={styles.notFound}>Không tìm thấy kết quả phù hợp.</Text>
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
