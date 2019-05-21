import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import AppContainer from '../navigation/MainNavigate';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
class Options extends React.Component{
 static navigationOptions={
      
  }
    render() {
      const { navigate } = this.props.navigation;
      
      
        return (
         
          <View style={styles.container}>
            <View style={styles.childContainer}>
                 <View style={styles.heading}><Text style={styles.headingText}>More Options</Text></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity><Text>Calories Limit</Text></TouchableOpacity></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity><Text>BMI Calculator</Text></TouchableOpacity></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity ><Text>Profile</Text></TouchableOpacity></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity><Text>Payment </Text></TouchableOpacity></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity><Text>Invoices</Text></TouchableOpacity></View>
                 <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity><Text>Settings</Text></TouchableOpacity></View>
            </View>
            
             
            {/* <Button title='Create Account' onPress={()=>navigate('Signup')}/>  */}
             
          </View>
        
        );
      }
}

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:20,
    width:screenWidth,
    height:screenHeight
  },
  childContainer:{
    flex:0.7,
    justifyContent:'flex-start',
   // backgroundColor: '#deb887',
    marginLeft:20,
    marginRight:20,
  },
  heading:{
    flex:1,
    flexDirection:'row',
    marginTop:10
    //backgroundColor:'red'
  },
  headingText: {
    fontFamily: "MontserratExtraBold",
    fontSize:17,
    // textAlign: 'center',
    // margin: 10,
    color:'#000000'
  },
  
  forText: {
    fontFamily: 'MontserratLight',
    fontSize:13.5
  },
});
