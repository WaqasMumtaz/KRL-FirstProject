import React from 'react';
import {
    Alert,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator, Image
} from 'react-native';
import CaloriesSetupBtn from '../buttons/setUpBtn'
import styles from '../Styling/SignUpScreenStyle';
import HttpUtilsFile from '../Services/HttpUtils';
import { Dialog } from 'react-native-simple-dialogs';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import firebase from 'react-native-firebase';
//console.log(HttpUtilsFile)
const { height } = Dimensions.get('window');

class Signup extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameValidate: true,
            email: '',
            emailValidate: true,
            mobile: '',
            mobileValidate: true,
            newPasswrd: '',
            passwrdValidate: true,
            cnfrmPasswrd: '',
            cnfrmPasswrdValidate: true,
            psswrdInstruction: false,
            emailNotExist: false,
            passNotMatch: false,
            isLoading: false,
            passMatch: false,

        }
    }
    newPasswrdInputValueHandle = (newPsswrdText) => {
        this.setState({
            newPasswrd: newPsswrdText
        }, () => {
            const { newPasswrd, cnfrmPasswrd } = this.state;
            //console.log(newPasswrd)
            if (newPasswrd.length < 4) {
                this.setState({
                    passwrdValidate: false,
                    psswrdInstruction: true
                })
            }
            if (newPasswrd.length >= 4) {
                this.setState({
                    passwrdValidate: true,
                    psswrdInstruction: false
                })
            }
            if (newPasswrd.length > 9) {
                this.setState({
                    passwrdValidate: false,
                    psswrdInstruction: true
                })
            }

            if (cnfrmPasswrd !== newPasswrd) {
                this.setState({
                    passNotMatch: true,
                    passMatch: false
                })
            }
            if (cnfrmPasswrd == newPasswrd) {
                this.setState({
                    passNotMatch: false,
                    passMatch: true
                })
            }

            if (cnfrmPasswrd == '') {
                this.setState({
                    passNotMatch: false,
                    passMatch: false
                })
            }
        })
    }
    cnfrmPasswrdInputValueHandle = (cnfrmPasswrdText) => {
        this.setState({
            cnfrmPasswrd: cnfrmPasswrdText
        }, () => {
            const { newPasswrd, cnfrmPasswrd } = this.state;
            //console.log(newPasswrd, cnfrmPasswrd)
            if (cnfrmPasswrd.length < 4) {
                this.setState({
                    cnfrmPasswrdValidate: false,

                    // psswrdInstruction:true
                })
            }
            if (cnfrmPasswrd.length >= 4) {
                this.setState({
                    cnfrmPasswrdValidate: true,
                    //    psswrdInstruction:false
                })
            }

            if (cnfrmPasswrd.length > 9) {
                this.setState({
                    cnfrmPasswrdValidate: false,
                    //    psswrdInstruction:true
                })
            }
            if (cnfrmPasswrd != newPasswrd) {
                this.setState({
                    passNotMatch: true,
                    passMatch: false
                })
            }
            if (cnfrmPasswrd == newPasswrd) {
                this.setState({
                    passNotMatch: false,
                    passMatch: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            passMatch: false
                        })
                    }, 5000)

                }
                )
            }


        })
    }


    signUpFunction = async () => {
        const { name, email, mobile, newPasswrd, cnfrmPasswrd, nameValidate, emailValidate, mobileValidate, passwrdValidate, cnfrmPasswrdValidate, isLoading } = this.state;
        if (name == '' || email == '' || mobile == '' || newPasswrd == '' || cnfrmPasswrd == '') {
            alert('Please Fill All Fields');
            if (nameValidate != true || emailValidate != true || mobileValidate != true || passwrdValidate != true || cnfrmPasswrdValidate != true) {
                alert('Please Enter Correct Field');
            }

        }
        else {
            this.setState({ isLoading: true })
            const userObj = {
                name: name,
                email: email,
                mobileNo: mobile,
                password: newPasswrd
            }
            // console.log(userObj)

            try {
                let dataUser = await HttpUtilsFile.post('signup', userObj)
                let signupCode = dataUser.code;
                let getEmails = await HttpUtilsFile.get('getuseremail')
                let emailCode = getEmails.code;
                const emailContents = getEmails.content;
                //console.log(emailContents);
                // console.log(getToken);
                //console.log(getCode)
                if (emailCode) {
                    this.setState({
                        isLoading: false
                    })
                    emailContents.map((item, index) => {
                        //console.log(item)
                        const { email } = this.state;
                        console.log(email)
                        if (email == item) {
                            return (
                                this.setState({
                                    emailNotExist: true
                                })
                            )
                        }
                        else {
                            const { navigate } = this.props.navigation;
                            return (
                                navigate('Setupscreen1')
                            )
                            //return false

                        }

                    })
                    if (signupCode) {
                        this.setState({
                            isLoading: false
                        })
                        const { navigate } = this.props.navigation;
                        navigate('Setupscreen1');
                    }


                }
                else if (!emailCode || !signupCode) {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert('Something Went Wrong')

                }
            } catch (error) {
                console.log(error);
            }
            this.setState({
                name: '',
                email: '',
                mobile: '',
                newPasswrd: '',
                cnfrmPasswrd: '',
                passMatch: false
            })
        }
    }
    checkValidateFunc = (text, type) => {
        let alpha = /^[a-zA-Z]+$/;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let mobileNum = /^[0-9]+$/;
        //let passwrd=/^[A-Za-z]\w{7,14}$/;
        if (type == 'username') {
            if (alpha.test(text)) {
                this.setState({
                    nameValidate: true,
                })
            }
            else {
                this.setState({
                    nameValidate: false
                })
            }
        }
        else if (type == 'email') {
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
        else if (type == 'mobile') {
            if (mobileNum.test(text)) {
                this.setState({
                    mobileValidate: true,
                })
            }
            else {
                this.setState({
                    mobileValidate: false
                })
            }
        }


    }



    render() {
        const { goBack, navigate } = this.props.navigation;
        const {
            name,
            email,
            mobile,
            psswrdInstruction,
            passNotMatch,
            isLoading,
            passMatch,
            emailNotExist
        } = this.state;


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

                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <Text style={styles.textsStyles}>Name</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => { this.checkValidateFunc(text, 'username'),
                           this.setState({ name: text }) }}
                            placeholder="Name"
                            placeholderTextColor="#A6A6A6"
                            value={name}
                            style={[styles.inputTexts, !this.state.nameValidate ? styles.errorInput : null]} />
                    </View>
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
                            //onKeyPress={() => { this.emailGet() }}
                            style={[styles.inputTexts, !this.state.emailValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {emailNotExist && <View style={styles.emailExistContainer}>
                        <Text style={styles.emailNotExistStyle}>
                            Email is already exist
                       </Text>
                    </View>}
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <Text style={styles.textsStyles}>Mobile</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => { this.checkValidateFunc(text, 'mobile'), this.setState({ mobile: text }) }}
                            keyboardType='phone-pad'
                            placeholder="+92-333-444444444"
                            placeholderTextColor="#A6A6A6"
                            value={mobile}
                            style={[styles.inputTexts, !this.state.mobileValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {/* <View style={{ flex: 0.5 }}></View> */}
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <Text style={styles.textsStyles}>New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => this.newPasswrdInputValueHandle(text)}
                            secureTextEntry={true}
                            placeholder="new password"
                            placeholderTextColor="#A6A6A6"
                            value={this.state.newPasswrd}
                            style={[styles.inputTexts, !this.state.passwrdValidate ? styles.errorInput : null]}
                        
                        />
                    </View>
                    {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                        <Text style={styles.instructionStyle}>
                            Password strength is required maximum 9 and greater then 4
                         </Text>
                    </View>}
                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <Text style={styles.textsStyles}>Confirm New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={(text) => this.cnfrmPasswrdInputValueHandle(text)}
                            secureTextEntry={true}
                            placeholder="confirm password"
                            placeholderTextColor="#A6A6A6"
                            value={this.state.cnfrmPasswrd}
                            //onKeyPress={()=>this.cnfrmPasswrdHandle()}
                            style={[styles.inputTexts, !this.state.cnfrmPasswrdValidate ? styles.errorInput : null]}
                        />
                    </View>
                     <View style={styles.passMatchContainer}>
                     {passNotMatch &&<Text style={styles.passNotMatchStyle}>
                            Password Not Match
                       </Text>}
                    </View>
                     <View style={styles.passMatchContainer}>
                     {passMatch &&<Text style={styles.passMatchStyle}>
                            Password Match
                       </Text>}
                    </View>
                    {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
                        <ActivityIndicator size='large' color="#FF6200" />
                    </View>}
                    <View style={styles.buttonContainer}>
                        <CaloriesSetupBtn title='Create Account'
                            onPress={this.signUpFunction}
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                        />
                    </View>
                    <View style={{ flex: 2 }}></View>
                    <View style={styles.accountLinkContainer}>
                        {/* <View style={{flex:0.5,flexDirection:'row',justifyContent:'center',marginTop:10}}> */}
                        <Text style={styles.accountText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => { goBack() }}><Text style={styles.registerText}>Sign in here.</Text></TouchableOpacity>
                        {/* </View> */}
                    </View>
                    <View style={{ flex: 3 }}></View>

                </View>
            </ScrollView>

        )
    }
}

export default Signup;


