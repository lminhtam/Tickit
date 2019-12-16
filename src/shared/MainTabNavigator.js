/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '../page/Home/home.page';
import SearchPage from '../page/Search/search.page';
import LoginPage from '../page/Login/login.page';
import Color from './Color';

const HomeStack = createStackNavigator(
  {
    Home: HomePage,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" type="entypo" size={20} color={tintColor} />
      ),
    },
  },
);

const SearchStack = createStackNavigator(
  {
    SearchPage,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="search1" type="antdesign" size={20} color={tintColor} />
      ),
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    Login: LoginPage,
  },
  {
    headerMode: 'float',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon
          name="user-circle"
          type="font-awesome"
          size={20}
          color={tintColor}
        />
      ),
    },
    initialRouteName: 'Login',
  },
);

// const MapsStack = createStackNavigator(
//   {
//     MapsScreen,
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="location-pin" type="entypo" size={20} color={tintColor} />
//       ),
//     },
//   },
// );

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
    Search: SearchStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Color.primaryColor,
      inactiveTintColor: Color.inactiveColor,
      style: {
        backgroundColor: 'white',
      },
      showLabel: false,
    },

    initialRouteName: 'Home',
  },
);

export default MainTabNavigator;
