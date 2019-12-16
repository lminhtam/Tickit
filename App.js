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
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from './src/page/Home/home.page';
import DetailPage from './src/page/Detail/detail.page';

const AppSwitch = createStackNavigator(
  {
    Home: HomePage,
    Detail: DetailPage,
  },
  {
    initialRouteName: 'Detail',
  },
);

const App = createAppContainer(AppSwitch);

export default App;
