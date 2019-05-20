import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
//import { Image } from 'react-native';
//import Resetpassword from './ResetPasswrd';
//import SkipButton from '../buttons/buttons'
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

class TextInputs extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
        //  const { navigate } = this.props.navigation;
  return (
    <View style={styles.mainContainer}>
            <TextInput placeholder="waqas@gmail.com" style={styles.inputTextStyle} />
    </View>
  )
}
}

export default TextInputs;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // width: screenWidth,
    // height: screenHeight,
    flexDirection:'row',
    justifyContent:'center',
    marginTop:4

  },
  inputTextStyle:{
    flex: 1,
    fontFamily: 'MontserratLight',
    marginLeft: 20,
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#808080',
    borderWidth: 2,
    marginRight: 20,
    paddingLeft: 16
  }
})  
