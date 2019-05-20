import * as React from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import Chatscreen from '../screens/Chat';
import Reportscreen from '../screens/Reports';
import Homescreen from '../screens/Home';
import Options from '../screens/Options';
//import { tsPropertySignature } from '@babel/types';
//import DrawerNav from '../navigation/DrawerNav';

const MainNavigator = createMaterialTopTabNavigator({
  // Login: {screen: Login,
  // navigationOptions:{
  //   tabBarLabel:<Image source={require('../icons/login.png')} style={{width: 26, height: 26}}/>,
  //   showIcon:true,  
  // tabBarIcon: ({ tintColor }) => (  
  //     <View>  
  //         <Icon style={[{color: tintColor}]} size={25} name={'Login'}/>  
  //     </View>),  
  // }
  // },
  Homescreen: {
    screen: Homescreen,
    navigationOptions: {
      tabBarLabel: <Image source={require('../icons/home-active.png')} style={{ width: 26, height: 26 }} />,
      showLabel: true,
    
    }
  },
  Chatscreen:{screen:Chatscreen,
  navigationOptions:{
    tabBarLabel:<Image source={require('../icons/chat-active.png')} style={{ width: 26, height: 26 }}/>,
    showIcon:true,
    
  }
},
Reportscreen: {
    screen: Reportscreen,
    navigationOptions: {
      tabBarLabel: <Image source={require('../icons/reports-active.png')} style={{ width: 26, height: 26 }} />,
      showIcon: true,
    }
  },
  Options: {
    screen: Options,
    navigationOptions: {
      header:{
        style:{
          elevation:0
        }
      },
      tabBarLabel: <Image source={require('../icons/more-active.png')} style={{ width: 26, height: 26 }} /> ,
      showIcon: true,
      
    },
  }
},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor:'#FFF',
      activeBackgroundColor: "#FFF",
      //inactiveTintColor:'white',
      inactiveTintColor: '#FFF',
      //inactiveTintColor: 'white',
      tabStyle:{
        backgroundColor:'white',
        // inactiveBackgroundColor:'white'
      },

      labelStyle: {
        fontSize: 12,
        padding: 2
      }
    }
  }
);

const BottomTabe = createAppContainer(MainNavigator);


export default BottomTabe;

