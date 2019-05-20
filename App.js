
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppContainer from './components/navigation/StackNavigation';
//import InputImgsScreen from './components/screens/InputImgs';
//import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
//import {TabNavigator,createAppContainer} from 'react-navigation';
//import BottomTabe from './components/navigation/tabNav';
//import DrawerNav from './components/navigation/DrawerNav';


class App extends Component {
 render() {
    return <AppContainer/>
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
