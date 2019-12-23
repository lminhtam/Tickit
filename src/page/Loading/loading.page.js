import {Spinner} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import Color from '../../shared/Color';
import firebase from 'firebase';

export default class LoadingPage extends React.Component {
  static navigationOptions = {
    header: <View />,
  };

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user =>
        this.props.navigation.navigate(user ? 'Profile' : 'Login'),
      );
  }

  render() {
    return (
      <View>
        <Spinner color={Color.primaryColor} />
      </View>
    );
  }
}
