import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView,Dimensions} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
class Login extends React.Component{
  
    render() {
      const { navigate } = this.props.navigation;
      
      
        return (
        
          <View style={styles.container}>
            <Text style={styles.welcome}>Login Page</Text>
             
            {/* <Button title='Create Account' onPress={()=>navigate('Signup')}/>  */}

          </View>
          
        );
      }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5f9ea0',
    marginTop:20,
    width:screenWidth,
    height:screenHeight
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#FFF'
  },
  forinputs: {
     height: 40,
    borderColor:'gray',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    borderWidth: 1,
    //  flex:1
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
