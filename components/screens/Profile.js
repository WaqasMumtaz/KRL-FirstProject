import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView,Dimensions} from 'react-native';
//import AppContainer from '../navigation/MainNavigate';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
class Profile extends React.Component{
  static navigationOptions = {
    title:'Profile',
  };
    render() {
      const { navigate } = this.props.navigation;
      
      
        return (
         
          <View style={styles.container}>
            <Text style={styles.welcome}>Profile Page</Text>
             
            {/* <Button title='Create Account' onPress={()=>navigate('Signup')}/>  */}

          </View>
        
        );
      }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#deb887',
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
