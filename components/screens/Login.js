import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
//import Resetpassword from './ResetPasswrd';
//import SkipButton from '../buttons/buttons';
//import TextInputs from '../textInputs/TextInputs'
import styles from '../Styling/LoginScreenStyle';

const { height } = Dimensions.get('window');
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      emailValidate: true,
      password:'',
      passwrdValidate: true,
      psswrdInstruction:false
    }
  }

  loginFunc=async ()=>{
      
  }

  checkValidateFunc=(text, type)=>{
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(type === 'email'){
      if (reg.test(text)) {
        this.setState({
            emailValidate: true,
        })
    }
    else {
        this.setState({
            emailValidate: false
        })
    }
    }
  }

  passwordHandle=(text)=>{
       this.setState({
         password:text
       },()=>{
         const {password}=this.state;
         if(password.length < 4){
          this.setState({
            passwrdValidate: false,
            psswrdInstruction: true
        })
        
         }
         else if(password.length >= 4){
          this.setState({
            passwrdValidate: true,
            psswrdInstruction: false
        })
        }


       })
  }


  render() {
    const { navigate } = this.props.navigation;
    const {email, password,psswrdInstruction} = this.state;

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
        <View style={{ flexDirection: 'row', marginVertical:8 }}>
          <Text style={styles.textsStyles}>Email</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput 
             onChangeText={text => {
              this.checkValidateFunc(text, 'email'),
              this.setState({ email: text })
             }}
             keyboardType='email-address' 
             placeholder="waqas@gmail.com" 
             placeholderTextColor="#A6A6A6"
             autoCapitalize="none"
             autoCorrect={false}
             value={email}
             style={[styles.inputTexts,!this.state.emailValidate ? styles.errorInput : null]} 
          />
        </View>
        <View style={{ flex: 0.5 }}></View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
          <Text style={styles.textsStyles}>Password</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput 
          onChangeText={(text)=>this.passwordHandle(text)}
          secureTextEntry={true} 
          placeholder="password" 
          placeholderTextColor="#A6A6A6"
          value={password}
          style={[styles.inputTexts,!this.state.passwrdValidate ? styles.errorInput : null]} />
        </View>
        {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                        <Text style={styles.instructionStyle}>
                            Password strength is required maximum 9 and greater then 4
                         </Text>
                    </View>}
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




