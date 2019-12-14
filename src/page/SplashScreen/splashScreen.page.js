/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../../shared/Color';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  async componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 1000);
  }
  render() {
    const viewStyles = [
      styles.container,
      styles.textStyles,
      {backgroundColor: Color.primaryColor},
    ];
    return (
      <View style={viewStyles}>
        <Text style={{fontFamily: 'BDPBIRGULA', fontSize: 50, color: 'white'}}>
          TICKET
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});