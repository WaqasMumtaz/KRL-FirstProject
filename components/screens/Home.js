import React from 'react';
import { StyleSheet, Text, View,Button,Dimensions} from 'react-native';
//import console = require('console');
//import console = require('console');
import homeIcon from '../icons/home-active.png';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

class Homescreen extends React.Component{
   constructor(props){
     super(props);

   }
  //  onChangeTab=(value)=>{
  //   console.log(value)
  // }
    render() {
      const {navigation}=this.props;
      const routes=navigation;
      console.log(routes);
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Home Screen</Text>
      
          </View>
        );
      }
}

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    width:screenWidth,
    height:screenHeight
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#FFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
