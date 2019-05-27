import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
//import Resetpassword from './ResetPasswrd';
import SkipButton from '../buttons/buttons';
//import TextInputs from '../textInputs/TextInputs'
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      screenHeight: 0,
    }
  }
  //   onContentSizeChange = (contentHeight, contentWidth) => {
  //     this.setState({ screenHeight: contentHeight })

  // }
  render() {
    const { navigate } = this.props.navigation;
    // const scrollEnabled = this.state.screenHeight > height;
    //const { show } = this.state
    //goToResetPsswrd={ navigate }

    return (

      <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.loginTextContainer}>
          <Text style={styles.textLogin}>
            Login
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../icons/logo.png')} style={styles.forImages} resizeMode='contain' />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.paraContainer}>
          <Text style={styles.paraText}>
            Enter your GetFitAthletic email and password below to login
                 </Text>
        </View>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.textsStyles}>Email or phone</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput keyboardType='email-address' placeholder="waqas@gmail.com" style={styles.inputTexts} />
        </View>
        <View style={{ flex: 0.5 }}></View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
          <Text style={styles.textsStyles}>Password</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput secureTextEntry={true} placeholder="password" style={styles.inputTexts} />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={styles.loginButtonContainer} onPress={() => { navigate('Setupscreen') }}>
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 35, marginBottom: 12 }}>
          <TouchableOpacity style={styles.resetPassContainer} onPress={() => { navigate('Resetpassword') }} >
            <Text style={styles.resetPasswrdTextStyle}>Forgot password ? </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={styles.btnContainer}>
          <Text style={styles.accountText}>Don't have account?</Text>
          <TouchableOpacity onPress={() => { navigate('Signup') }}><Text style={styles.registerText}>Register here.</Text></TouchableOpacity>
          {/* <SkipButton gotToSetUpScreen={navigate} /> */}
        </View>
        <View style={{ flex: 3 }}></View>
      </ScrollView>


    );
  }
}

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: screenWidth,

    backgroundColor: '#000000'

  },
  loginTextContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',

  },
  textLogin: {
    fontSize: 20,
    fontFamily: "MontserratExtraBold",
    // fontSize: 23,
    color: '#A6A6A6',
    marginLeft: 20
  },
  logoContainer: {
    flex: 2,
    //backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  paraContainer: {
    flex: 1,
    //backgroundColor:'blue',
    flexWrap: 'wrap',
    flexDirection: 'row',

  },
  paraText: {
    fontFamily: 'MontserratLight',
    // fontSize: 23,
    color: '#A6A6A6',
    marginLeft: 20,
    marginRight: 20
  },

  inputFields: {
    flex: 1,
    //backgroundColor:'gray',
    flexDirection: 'row',
    justifyContent: 'center',


  },
  inputTexts: {
    flex: 1,
    fontFamily: 'MontserratLight',
    color: '#666666',
    // fontSize: 23,
    marginLeft: 20,
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#808080',
    borderWidth: 2,
    marginRight: 20,
    paddingLeft: 16
  },
  loginButtonContainer: {
    flex: 2,
    //backgroundColor:'pink',
    flexDirection: 'row',
    //  alignItems:'flex-start',
    justifyContent: 'center',
  },
  loginButton: {
    fontSize: 16,
    //fontWeight: "bold",
    fontFamily: "MontserratExtraBold",
    backgroundColor: '#FF6200',
    color: '#FFF',
    borderWidth: 2,
    //borderColor: '#FF6200',
    textAlign: 'center',
    borderRadius: 7,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50

  },
  forImages: {
    flex: 1,
    height: 100,
    width: 140,
    alignSelf: 'stretch',
    // marginBottom: 4

  },
  textsStyles: {
    fontFamily: 'MontserratLight',
    // fontSize: 23,
    color: '#A6A6A6',
    marginLeft: 20
  },
  resetPassContainer: {
    flex: 2,
    //backgroundColor:'skyblue',
    //  flexDirection:'row',
    //  justifyContent:'flex-start'


  },
  resetPasswrdTextStyle: {
    fontFamily: 'MontserratMedium',
    color: '#FF6200',
    marginLeft: 20
  },
  btnContainer: {
    flex: 1,
    //backgroundColor: '#794044',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  accountText: {
    // fontSize:23,
    fontFamily: 'MontserratLight',
    color: '#A6A6A6'
  },
  registerText: {
    // fontSize:23,
    fontFamily: 'MontserratMedium',
    color: '#FF6200',
    
  }


})




