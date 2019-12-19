/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '../page/Home/home.page';
import SearchPage from '../page/Search/search.page';
import LoginPage from '../page/Login/login.page';
import DetailPage from '../page/Detail/detail.page';
import BookingPage from '../page/Booking/booking.page';
import Color from './Color';
import SignUpPage from '../page/SignUp/signUp.page';
import TicketInformation from '../page/TicketInformation/ticketInformation.page';
import TicketDetailPage from '../page/TicketDetail/ticketDetail.page';
import ReactNavigation from 'react-navigation';

const HomeStack = createStackNavigator(
  {
    Home: HomePage,
    Detail: DetailPage,
    Booking: BookingPage,
    TicketInfo: TicketInformation,
    TicketDetail: TicketDetailPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" type="entypo" size={20} color={tintColor} />
      ),
    },
  },
);

const SearchStack = createStackNavigator(
  {
    Search: SearchPage,
    Detail: DetailPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Search',
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
    SignUp: SignUpPage,
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
