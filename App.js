// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// // import HomePage from './src/page/Home/home.page';
// import { AppNavigator }

// const AppSwitch = createSwitchNavigator({
//   Main: MainTabNavigator,
// });

// const App = createAppContainer(AppSwitch);

// export default App;
import React from 'react';
import AppNavigator from './src/shared/AppNavigator';
console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
