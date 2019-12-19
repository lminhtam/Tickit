/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Icon} from 'react-native-elements';
import {createSwitchNavigator} from 'react-navigation';
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
import ForgotPasswordPage from '../page/ForgotPassword/forgotPassword.page';
import ProfilePage from '../page/Profile/profile.page';
import BookedTicketPage from '../page/BookedTicket/bookedTicket.page';

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
    DetailEvent: DetailPage,
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

const LoginStack = createStackNavigator(
  {
    LoginPage: LoginPage,
    ForgotPassword: ForgotPasswordPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginPage',
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfilePage: ProfilePage,
    BookedTicket: BookedTicketPage,
    DetailTicket: TicketDetailPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ProfilePage',
  },
);

const ProfileSwitch = createSwitchNavigator(
  {
    Login: LoginStack,
    SignUp: SignUpPage,
    Profile: ProfileStack,
  },
  {
    headerMode: 'none',
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
    Profile: ProfileSwitch,
    Search: SearchStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Color.primaryColor,
      inactiveTintColor: Color.inactiveColor,
      style: {
        backgroundColor: 'white',
        height: 60,
      },
      showLabel: false,
    },

    initialRouteName: 'Home',
  },
);

export default MainTabNavigator;
