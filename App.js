/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomePage from './src/page/Home/home.page';

const AppSwitch = createSwitchNavigator(
  {
    Home: HomePage,
  },
  {
    initialRouteName: 'Home',
  },
);

const App = createAppContainer(AppSwitch);

export default App;
