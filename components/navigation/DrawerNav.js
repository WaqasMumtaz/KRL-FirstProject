import * as React from 'react';
import {createDrawerNavigator,createAppContainer} from 'react-navigation';
import { Dimensions } from 'react-native';
import Options from '../screens/Options';
import SettingScreen from '../screens/Setting';
// import Login from '../screens/Login';
// import Signup from '../screens/SignUp';
// import Dashboard from '../screens/Dashboard';
const screenWidth=Dimensions.get('window').width;
const DrawerConfig=screenWidth*0.8;

const MainNavigator =  createDrawerNavigator(
  {
  SettingScreen:SettingScreen
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
  
  DrawerConfig

  );
  
const DrawerNav = createAppContainer(MainNavigator);
   
  export default DrawerNav;

// const MainNavigator= createBottomTabNavigator({
//     Login: {screen: Login},
//     Signup:{screen:Signup},
//     Dashboard:{screen:Dashboard}
  
    
//   });
  
//    const DrawerNav = createAppContainer(MainNavigator);
   
  
//   export default DrawerNav;