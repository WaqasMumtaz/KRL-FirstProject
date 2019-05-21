import * as React from 'react';
// import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Resetpassword from '../screens/ResetPasswrd';
import Login from '../screens/Login';
//import TextInputs from '../textInputs/TextInputs';
import Setupscreen from '../screens/SetUpScreen';
//import PickerInput from '../../Picker/PickerInput';
import ConfirmResetPassword from '../screens/CheckResetPasswrd';
import BottomTabe from '../navigation/tabNav';
//import console = require('console');
//import CaloriesSetupBtn from '../buttons/setUpBtn'
//import Resetpassword from '../screens/ResetPasswrd';
// import Dashboard from '../screens/Dashboard';

console.log('hello World')


const MainNavigator= createStackNavigator({
  //Setupscreen:{screen:Setupscreen}, 
  BottomTabe:{screen:BottomTabe,
    navigationOptions:{
          //elevation:0,
          header:null       
    }
  },
  Login: {screen: Login},
  Resetpassword:{screen:Resetpassword},
  Setupscreen:{screen:Setupscreen},
  ConfirmResetPassword:{screen:ConfirmResetPassword},
  
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;


