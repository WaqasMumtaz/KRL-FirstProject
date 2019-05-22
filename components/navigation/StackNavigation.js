import * as React from 'react';
// import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Easing ,Animated} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Resetpassword from '../screens/ResetPasswrd';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
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
  Login: {screen: Login},
  Signup:{screen:Signup}, 
  Resetpassword:{screen:Resetpassword},
  Setupscreen:{screen:Setupscreen},
  ConfirmResetPassword:{screen:ConfirmResetPassword},
  BottomTabe:{screen:BottomTabe},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver:true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
           inputRange: [index - 1, index, index + 1],
          // inputRange: [index - 1, index],
          outputRange: [height, 0,2],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
  
  
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;


