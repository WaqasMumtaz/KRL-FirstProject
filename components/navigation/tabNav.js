import * as React from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from 'react-native';
import Login from '../screens/Login';
import Details from '../screens/Details';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';

const MainNavigator= createMaterialTopTabNavigator({
    Login: {screen: Login,
    navigationOptions:{
      tabBarLabel:<Image source={require('../icons/login.png')} style={{width: 26, height: 26}}/>,
      showIcon:true,  
                // tabBarIcon: ({ tintColor }) => (  
                //     <View>  
                //         <Icon style={[{color: tintColor}]} size={25} name={'Login'}/>  
                //     </View>),  
    }
    },
    Dashboard:{screen:Dashboard,
      navigationOptions:{
        tabBarLabel:<Image source={require('../icons/dashboard.png')} style={{width: 26, height: 26}}/>,
        showIcon:true,
        }   
    },
    Details:{screen:Details,
      navigationOptions:{
        tabBarLabel:<Image source={require('../icons/detail.png')} style={{width: 26, height: 26}}/>,
        showIcon:true,
        }
    },
    Profile:{screen:Profile,
      navigationOptions:{
        tabBarLabel:<Image source={require('../icons/dots.png')} style={{width: 26, height: 26}}/>,
        showIcon:true,
        }
    }
    },
      {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
                     activeTintColor: '#f0f0f0',
                     activeBackgroundColor: "#FFF",
                     inactiveTintColor: '#FFF',
                        labelStyle: {
                                 fontSize: 12,
                                 padding: 2
                                 }
                         }
    }     
    );
  
const BottomTabe = createAppContainer(MainNavigator);
   
  
  export default BottomTabe;
  
