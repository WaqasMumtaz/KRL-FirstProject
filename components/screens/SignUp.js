import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import CaloriesSetupBtn from '../buttons/setUpBtn'
//import { NavigationEvents } from 'react-navigation';
import styles from '../Styling/SignUpStyle';
import HttpUtilsFile from '../Services/HttpUtils';
console.log(HttpUtilsFile);
// const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

class Signup extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            nameValidate:true,
            email:'',
            emailValidate:true,
            mobile:'',
            mobileValidate:true,
            newPasswrd:'',
            passwrdValidate:true,
            cnfrmPasswrd:'',
            cnfrmPasswrdValidate:true,
            psswrdInstruction:false,
            passNotMatch:false
        }
    }

    signUpFunction= async ()=>{
        const {name,email,mobile,newPasswrd,cnfrmPasswrd,nameValidate,emailValidate,mobileValidate,passwrdValidate,cnfrmPasswrdValidate}=this.state;
        if(name ===''|| email ===''|| mobile ===''|| newPasswrd ===''|| cnfrmPasswrd ===''){
           alert('Please Fill All Fields');
        }
        else if(newPasswrd !== cnfrmPasswrd){
              this.setState({
                passNotMatch:true
              }) 
            if(newPasswrd === cnfrmPasswrd){
                this.setState({
                    passNotMatch:false
                  })
            } 

        }
        // else if(newPasswrd === cnfrmPasswrd){
        //     this.setState({
        //         passNotMatch:false
        //       })
        // }
        else if (nameValidate !== true || emailValidate !== true || mobileValidate !== true || passwrdValidate !== true || cnfrmPasswrdValidate !== true){
               alert('Please Enter Correct Field')
        }
        else {
            const userObj ={
                name:name,
                email:email,
                mobileNo:mobile,
                password:newPasswrd
            }
            console.log(userObj)
           try {
            let dataUser = await HttpUtilsFile.post('signup',userObj)
            console.log(dataUser)
           } catch (error){
               console.log(error);
           }
           
        }
    }
    checkValidateFunc=(text, type)=>{
      let alpha=/^[a-zA-Z]+$/;
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      let mobileNum=/^[0-9]+$/;
      let passwrd=/^[A-Za-z]\w{7,14}$/;
      if(type === 'username'){
          if(alpha.test(text)){
           this.setState({
               nameValidate:true,
           })
          }
          else {
              this.setState({
                  nameValidate:false
              })
          }
      }
      else if(type === 'email'){
        if(reg.test(text)){
            this.setState({
                emailValidate:true,
            })
           }
           else {
               this.setState({
                   emailValidate:false
               })
           }
      }
      else if(type === 'mobile'){
        if(mobileNum.test(text)){
            this.setState({
                mobileValidate:true,
            })
           }
           else {
               this.setState({
                   mobileValidate:false
               })
           }
      }
      else if(type === 'password'){
          if(passwrd.test(text)){
              this.setState({
                  passwrdValidate:true
              })
          }
          else {
              this.setState({
                  passwrdValidate:false
              })
          }
      }
      else if(type === 'confirm password'){
        if(passwrd.test(text)){
            this.setState({
                cnfrmPasswrdValidate:true
            })
        }
        else {
            this.setState({
                cnfrmPasswrdValidate:false
            })
        }

    }



    }
    
    forFocus=()=>{
     this.setState({psswrdInstruction:true})
    }
    forBlur=()=>{
        this.setState({psswrdInstruction:false})
    }
    
    render() {
        
        const { goBack ,navigate} = this.props.navigation;
        const { name,email,mobile,newPasswrd,cnfrmPasswrd,psswrdInstruction,passNotMatch}=this.state;
        // console.log('New Pass===>>>',newPasswrd , 'Confrm Pass===>>>', cnfrmPasswrd);
        return (

            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.signUpTextContainer}>
                        <Text style={styles.signUpText}>
                            Register
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
                    {/* <View style={{ flex: 0.2 }}></View> */}
                    <View style={{ flexDirection: 'row', marginVertical:8}}>
                        <Text style={styles.textsStyles}>Name</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {this.checkValidateFunc(text, 'username'),this.setState({name:text})}} 
                        placeholder="Name" 
                        placeholderTextColor="#A6A6A6"
                        value={name}
                        style={[styles.inputTexts,!this.state.nameValidate? styles.errorInput:null]} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical:8 }}>
                        <Text style={styles.textsStyles}>Email</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {this.checkValidateFunc(text, 'email'),this.setState({email:text})}} 
                        keyboardType='email-address' placeholder="waqas@gmail.com"
                         placeholderTextColor="#A6A6A6" 
                         autoCapitalize="none" 
                         autoCorrect={false}
                         value={email}
                         style={[styles.inputTexts,!this.state.emailValidate ? styles.errorInput:null]} 
                         />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical:8 }}>
                        <Text style={styles.textsStyles}>Mobile</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {this.checkValidateFunc(text, 'mobile'),this.setState({mobile:text})}} 
                        keyboardType='phone-pad'
                        placeholder="+92-333-444444444" 
                        placeholderTextColor="#A6A6A6"
                        value={mobile} 
                        style={[styles.inputTexts,!this.state.mobileValidate ? styles.errorInput:null]} 
                        />
                    </View>
                    {/* <View style={{ flex: 0.5 }}></View> */}
                    <View style={{ flexDirection: 'row',  marginVertical:8 }}>
                        <Text style={styles.textsStyles}>New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {this.checkValidateFunc(text, 'password'),this.setState({newPasswrd:text})}}
                         secureTextEntry={true}
                        placeholder="new password" 
                        placeholderTextColor="#A6A6A6" 
                        style={[styles.inputTexts,!this.state.passwrdValidate ? styles.errorInput:null]} 
                        onFocus={this.forFocus}
                        onBlur={this.forBlur}
                        />
                    </View>
                   {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                         <Text style={styles.instructionStyle}>
                         Input Password and Submit [7 to 15 characters which contain only characters,
                          numeric digits, underscore and first character must be a letter]
                         </Text>
                    </View>}
                    <View style={{ flexDirection: 'row',  marginVertical:8 }}>
                        <Text style={styles.textsStyles}>Confirm New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {this.checkValidateFunc(text, 'confirm password'),
                        this.setState({cnfrmPasswrd:text})}} 
                        secureTextEntry={true}
                        placeholder="confirm password" 
                        placeholderTextColor="#A6A6A6" 
                        style={[styles.inputTexts,!this.state.cnfrmPasswrdValidate ? styles.errorInput:null]}
                        />
                    </View>
                    {passNotMatch &&<View style={styles.passNotMatchContainer}>
                       <Text style={styles.passNotMatchStyle}>
                          Password Not Match
                       </Text>
                    </View>}
                    <View style={styles.buttonContainer}>
                    <CaloriesSetupBtn  title='Create Account' 
                    onPress={this.signUpFunction} 
                    caloriesBtnStyle={styles.caloriesBtnStyle}
                    />
                     </View>
                     <View style={{flex:2}}></View>
                     <View style={styles.accountLinkContainer}>
                         {/* <View style={{flex:0.5,flexDirection:'row',justifyContent:'center',marginTop:10}}> */}
                              <Text style={styles.accountText}>Already have an account?</Text>
                                 <TouchableOpacity onPress={()=>{goBack()}}><Text style={styles.registerText}>Sign in here.</Text></TouchableOpacity>
                               {/* </View> */}
                     </View>
                     <View style={{flex:3}}></View>
                     
                </View>
            </ScrollView>

        )
    }
}

export default Signup;


