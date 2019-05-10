import * as React from 'react';
// import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';




const MainNavigator= createStackNavigator({
  Login: {screen: Login},
  Signup:{screen:Signup},
  Dashboard:{screen:Dashboard},
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;


