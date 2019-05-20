import * as React from 'react';
import {createDrawerNavigator,createAppContainer} from 'react-navigation';
import Options from '../screens/Options';
// import Login from '../screens/Login';
// import Signup from '../screens/SignUp';
// import Dashboard from '../screens/Dashboard';

const MainNavigator=  createDrawerNavigator({
    Options:{screen:Options}
    // Login: {screen: Login},
    // Signup:{screen:Signup},
    // Dashboard:{screen:Dashboard}
  
    
  });
  
const DrawerNav = createAppContainer(MainNavigator);
   
  export default DrawerNav;

// const MainNavigator= createBottomTabNavigator({
//     Login: {screen: Login},
//     Signup:{screen:Signup},
//     Dashboard:{screen:Dashboard}
  
    
//   });
  
//    const DrawerNav = createAppContainer(MainNavigator);
   
  
//   export default DrawerNav;