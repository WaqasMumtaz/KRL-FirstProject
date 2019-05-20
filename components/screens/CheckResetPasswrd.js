import React from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Dimensions, ScrollView, TouchableOpacity,Image } from 'react-native';
//import Button from 'apsl-react-native-button';
import TextInputs from '../textInputs/TextInputs'
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');


class ConfirmResetPassword extends React.Component {
  static navigationOptions = {
    //title: 'Reset Password',
    headerStyle: {
      backgroundColor: 'black'
    },
    headerTintColor: 'white'
  };

  constructor(props) {
    super(props)
    this.state = {

    }


  }

  render() {
    return (
      <ScrollView style={{ flex: 1,backgroundColor:'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.headingStyle}>Set New Password</Text>
          </View>
          <View style={styles.firstPara}>
            <Text style={styles.firstParaStyle}>
              Enter a new password for your GetFitAthletic account .
            </Text>
          </View>
          <Text style={styles.newPasswordText}>New Password</Text>
          <View style={styles.newPasswordField}>
            {/* <Text>For new password input</Text> */}
            
            <TextInput secureTextEntry={true}  placeholder="type new password" style={styles.newPasswordFieldStyle}/>
            {/* <Image source={require('../icons/eyetrue.png')} style={styles.forImg}/> */}
          </View>
          <Text style={styles.newPasswordText}>Retype new password</Text>
          <View style={styles.retypePasswrdField}>
            {/* <Text>For retype new password input</Text> */}

            <TextInput secureTextEntry={true}  placeholder="retype new password" style={styles.newPasswordFieldStyle} underlineColorAndroid="transparent"/>
          </View>
          <View style={styles.instructionCotainer}>
            <Text style={styles.instructionStyle}>The password must be atleast 8 characters long</Text>
          </View>
          <View style={styles.btnContainer}>
            {/* <Text>For Button</Text> */}
            <View style={{flex:1}}></View>
              <TouchableOpacity style={styles.btnStyle}><Text style={{fontFamily: "MontserratExtraBold",color:'white'}}>Reset Password</Text></TouchableOpacity>
              <View style={{flex:1}}></View>
          </View>
        </View>
        
          {/* <Text style={{fontSize:50}}>
            jkajdlkaj;kdjal;kjdla;kjd;lkjaldjalkjdlkajldkjalkjdlkajldkjaldjlajdlkajldkjaaldjlajdlkkajdlkjalkdj
            lajdlkjfalkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjakdl
            kjadklllllllllllllllllllllllllllllllllllllllllllllla
          </Text> */}

      </ScrollView>
    )
  }

}

export default ConfirmResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red'
  },
  heading: {
    flex: 0.3,
   // backgroundColor: 'yellow'
  },
  headingStyle:{
    color: 'white',
    marginLeft: 20,
    fontFamily: "MontserratExtraBold",
    fontSize:17
  },
  firstPara:{
    flex:0.1,
    //backgroundColor:'green'
  },
  firstParaStyle:{
    color: 'white',
    marginLeft: 20,
    fontFamily: 'MontserratLight',
  },
  newPasswordField:{
      flex:0.1,
      //backgroundColor:'pink',
      flexDirection:'row',
      justifyContent:'center',

  },
  newPasswordFieldStyle:{
      flex: 1,
      fontFamily: 'MontserratLight',
      marginLeft: 20,
      height: 40,
      borderColor: 'gray',
      backgroundColor: '#808080',
      borderWidth: 2,
      marginRight: 20,
      paddingLeft: 16,
      marginTop:7,
      
  },
  newPasswordText:{
    color: 'white',
    marginLeft: 20,
    fontFamily: 'MontserratLight',
  },
  retypePasswrdField:{
   flex:0.1,
  // backgroundColor:'blue',
   flexDirection:'row'
  },
  retypePasswrdFieldStyle:{

  },
  retypePasswordText:{
    color: 'white',
    marginLeft: 20,
    fontFamily: 'MontserratLight',
  },
  instructionCotainer:{
       flex:0.1,
       //backgroundColor:'white'
  },
  instructionStyle:{
    color: 'white',
    marginLeft: 20,
    fontFamily: 'MontserratLight',
  },
  btnContainer:{
         flex:0.25,
         //backgroundColor:'black',
         flexDirection:'row'
  },
    btnStyle:{
      flex:2,
      height:40,
      justifyContent:'center',
      backgroundColor: '#FF7F50',
      alignItems:'center',
      borderRadius:5
  },
  forImg:{
    // padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
    backgroundColor:'gray'
  }
})