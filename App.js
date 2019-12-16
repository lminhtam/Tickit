// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

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
