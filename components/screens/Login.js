import React from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Styling/LoginScreenStyle';
import HttpUtilsFile from '../Services/HttpUtils';
import firebase from '../../Config/Firebase';
import OverlayLoader from '../Loader/OverlaySpinner';
import 'firebase/firestore';
const db = firebase.database();

const { height } = Dimensions.get('window');
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValidate: true,
      password: '',
      passwrdValidate: true,
      psswrdInstruction: false,
      isLoading: false,
      passwordNotMatch: '',
      psswrdNotMatchShow: false,
      emailAndPasswrd: false

    }
    this.checkUserLogin()
  }

  checkUserLogin= async ()=>{
    const { navigate } = this.props.navigation;
    this.setState({
      isLoading: true
    })
    const getData = await AsyncStorage.getItem("currentUser");
          // const parsForm = JSON.parse(getData)
          // console.log('current user data >>>',parsForm)
          if(getData){
            this.setState({
              isLoading: false
            })
           navigate('BottomTabe')
          }
          else {
            this.setState({
              isLoading: false
            })
            navigate('Login')
          }
  }
  

  loginFunc = async () => {
    const { navigate } = this.props.navigation;
    const { email, password, emailValidate, passwrdValidate } = this.state;
    if (email == '' || password == '') {
      Alert.alert('Please Fill All Fields')
      if (emailValidate !== true || passwrdValidate !== true) {
        Alert.alert('Fill Correct Fields')
      }
    }
    else {
      this.setState({
        isLoading: true
      })
      const userObj = {
        email: email,
        password: password,
        // type:'trainny'
      }
      try {
        let dataUser = await HttpUtilsFile.post('signin', userObj)
        let getUserCode = dataUser.code;
        let userWrong = dataUser.Match;
        let userMsg = dataUser.msg;
        if (getUserCode) {
          await AsyncStorage.setItem('currentUser', JSON.stringify(dataUser));
          console.log('dataUser >>>', dataUser);
          if (dataUser.profile[0]) {
            let myProfile = dataUser.profile[0];
            myProfile.type = dataUser.type;
            AsyncStorage.setItem('myProfile', JSON.stringify(myProfile));
          }
          else {
            let myProfile = {};
            myProfile.name = dataUser.name;
            myProfile.email = dataUser.email;
            myProfile.userId = dataUser._id;
            myProfile.type = dataUser.type;
            AsyncStorage.setItem('myProfile', JSON.stringify(myProfile));
          }
          if (dataUser.trainnerProfileData[0]) {
            let opponentData = dataUser.trainnerProfileData;
            opponentData[0].type = "Coach";
            AsyncStorage.setItem('opponentProfile', JSON.stringify(opponentData));
          }
          else if (dataUser.trainnyProfiledata.length >= 0) {
            // let opponentData = dataUser.trainnyProfiledata;
            let traineeName = dataUser.assignTrainny;
            let traineeIds = dataUser.tainnyId;
            let traineeDataArr = [];
            let finalDataTrainee = [];
            for (let i = 0; i < traineeName.length; i++) {
              let traineesData = {}
              traineesData["name"] = traineeName[i];
              traineesData['userId'] = traineeIds[i];
              traineesData['type'] = "Trainee";
              traineeDataArr.push(traineesData)
            }
            console.log(traineeDataArr , 'traineeDataArr')
            AsyncStorage.setItem('opponentProfile', JSON.stringify(traineeDataArr));
            // let openentData = []
            // opponentData.map((opponent, key) => {
            //   opponent.map((ele, key) => {
            //     openentData.push(ele)
            //   })
            // })

            console.log(finalDataTrainee, 'finalDataTrainee')


          }

          db.ref(`users/`).push(dataUser)
          this.setState({
            isLoading: false
          }, () => navigate('BottomTabe'))

        }
        if (userWrong == false) {
          this.setState({
            isLoading: false,
            psswrdNotMatchShow: true,
            passwordNotMatch: userMsg,
            // emailAndPasswrd: true,

          })
          setTimeout(() => {
            this.setState({
              psswrdNotMatchShow: false
            })
          }, 5000)

        }

      }
      catch (error) {
        console.log(error)
        this.setState({
          isLoading: false,
          // emailAndPasswrd: true,
        })
        setTimeout(() => {
          this.setState({
            emailAndPasswrd: false
          })
        }, 5000)
      }
      this.setState({
        email: '',
        password: ''
      })
    }
  }

  checkValidateFunc = (text, type) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (type === 'email') {
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

  passwordHandle = (text) => {
    this.setState({
      password: text
    }, () => {
      const { password } = this.state;
      if (password.length < 4) {
        this.setState({
          passwrdValidate: false,
          psswrdInstruction: true
        })

      }
      else if (password.length >= 4) {
        this.setState({
          passwrdValidate: true,
          psswrdInstruction: false
        })
      }


    })
  }
  render() {
    const { navigate } = this.props.navigation;
    const { email, password, psswrdInstruction, isLoading, passwordNotMatch, psswrdNotMatchShow, emailAndPasswrd } = this.state;
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
        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
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
            style={[styles.inputTexts, !this.state.emailValidate ? styles.errorInput : null]}
          />
        </View>
        <View style={{ flex: 0.5 }}></View>
        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
          <Text style={styles.textsStyles}>Password</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput
            onChangeText={(text) => this.passwordHandle(text)}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#A6A6A6"
            value={password}
            style={[styles.inputTexts, !this.state.passwrdValidate ? styles.errorInput : null]} />
        </View>
        {/* {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
          <ActivityIndicator size='large' color="#FF6200" />
        </View>} */}
        {isLoading ? <OverlayLoader /> : null}
        {psswrdNotMatchShow ? <View style={styles.passMatchContainer}>
          <Text style={styles.passNotMatchStyle}>
            {passwordNotMatch}
          </Text>
        </View> : null}
        {emailAndPasswrd ?
          <View style={styles.passMatchContainer}>
            <Text style={styles.passNotMatchStyle}>
              Email and password not match
         </Text>
          </View> : null}

        {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
          <Text style={styles.instructionStyle}>
            Password strength is required maximum 9 and greater then 4
            </Text>
        </View>}
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={styles.loginButtonContainer} onPress={this.loginFunc}>
            <Text style={styles.loginButton}>Log In</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', marginTop: 35, marginBottom: 12 }}>
          <TouchableOpacity style={styles.resetPassContainer} onPress={() => { navigate('ResetpasswordScreen') }} >
            <Text style={styles.resetPasswrdTextStyle}>Forgot password ? </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={styles.btnContainer}>
          <Text style={styles.accountText}>Don't have account?</Text>
          <TouchableOpacity onPress={() => { navigate('Signup') }}><Text style={styles.registerText}>Register here.</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}></View>
      </ScrollView>
    );
  }
}

export default Login;




