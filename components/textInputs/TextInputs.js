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
            {/* <Text>{this.props.label}</Text>
            <Text>{"\n"}</Text> */}
            <TextInput placeholder={this.props.placeholder} style={styles.inputTextStyle} />
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
    // marginTop:4

  },
  inputTextStyle:{
    flex: 1,
    fontFamily: 'MontserratLight',
    // marginLeft: 20,
    height: 40,
    borderColor: '#1a1a1a',
    backgroundColor: '#808080',
    //backgroundColor: '#1a1a1a',
    borderWidth: 1,
    //marginRight: 20,
    paddingLeft: 16
  }
})  
