/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import AppContainer from './components/navigation/MainNavigate'
//import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
//import {TabNavigator,createAppContainer} from 'react-navigation';
import BottomTabe from './components/navigation/tabNav';
//import DrawerNav from './components/navigation/DrawerNav';
// import Login from './components/screens/Login';
// import Signup from './components/screens/SignUp';
// import Dashboard from './components/screens/Dashboard';


// const MainNavigator= createBottomTabNavigator({
//   Login: {screen: Login},
//   Signup:{screen:Signup},
//   Dashboard:{screen:Dashboard}

  
// });

//  const App = createAppContainer(MainNavigator);
 

// export default App;


class App extends Component {
 render() {
    return <BottomTabe/>
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
