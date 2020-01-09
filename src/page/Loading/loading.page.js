import {Spinner} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import Color from '../../shared/Color';
import firebase from 'firebase';
import Ticket from '../../../firebaseConfig';

var flag = true;

export default class LoadingPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Ticket.database()
          .ref()
          .child('users')
          .once('value', snapshot => {
            if (snapshot.hasChild(firebase.auth().currentUser.uid)) {
              this.props.navigation.navigate('ProfileStack');
            } else {
              flag = false;
              firebase.auth().signOut();
            }
          });
      } else {
        if (flag) this.props.navigation.navigate('Login');
        else {
          flag = true;
          this.props.navigation.navigate('SignUp', {isNotHaveAccount: true});
        }
      }
    });
  }

  render() {
    return (
      <View>
        <Spinner color={Color.primaryColor} />
      </View>
    );
  }
}
