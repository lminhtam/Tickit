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
import LoadingPage from '../page/Loading/loading.page';
import SettingPage from '../page/Setting/setting.page';
import ChangeInformationPage from '../page/ChangeInformation/changeInformation.page';
import ChangeAvatarPage from '../page/ChangeAvatar/changeAvatar.page';
import PaymentPage from '../page/Payment/payment.page';
import LikedShowPage from '../page/LikedShow/likedShow.page';

const BookingStack = createStackNavigator(
  {
    Detail: DetailPage,
    Booking: BookingPage,
    TicketInfo: TicketInformation,
    TicketDetail: TicketDetailPage,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Detail',
  },
);

const HomeSwitch = createSwitchNavigator(
  {
    Home: HomePage,
    BookingStack: BookingStack,
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

const SearchSwitch = createSwitchNavigator(
  {
    Search: SearchPage,
    BookingStackSearch: BookingStack,
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

const LikedShowSwitch = createSwitchNavigator(
  {
    LikedShow: LikedShowPage,
    BookingStackLiked: BookingStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LikedShow',
  },
);

const ProfileStack = createStackNavigator(
  {
    ProfilePage: ProfilePage,
    BookedTicket: BookedTicketPage,
    DetailTicket: TicketDetailPage,
    Setting: SettingPage,
    ChangeInformation: ChangeInformationPage,
    ChangeAvatar: ChangeAvatarPage,
    Payment: PaymentPage,
    LikedShowSwitch: LikedShowSwitch,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ProfilePage',
  },
);

const ProfileSwitch = createSwitchNavigator(
  {
    Loading: LoadingPage,
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
    initialRouteName: 'Loading',
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
    Home: HomeSwitch,
    Profile: ProfileSwitch,
    Search: SearchSwitch,
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
