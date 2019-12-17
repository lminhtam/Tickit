import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashSreen from '../page/SplashScreen/splashScreen.page';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    SplashSreen: SplashSreen,
    Main: MainTabNavigator,
  }),
);
