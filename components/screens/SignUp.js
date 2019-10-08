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
//import { Dialog } from 'react-native-simple-dialogs';
import OverlayLoader from '../Loader/OverlaySpinner';
import AsyncStorage from '@react-native-community/async-storage';
//import PhoneCode from 'react-phone-code';
import PhoneInput from 'react-native-phone-input'
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
            male: false,
            female: false,
            gender: '',
            date: '',
            time: '',
            lastName: '',
            maleClickedTextStyle: false,
            femaleClickedTextStyle: false,
            pickerData: '',
            countryCod: '',
            mobileNo: '',
            // mobileNoAndCode:countryCod + mobileNo,


        }
    }
    componentDidMount() {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }

        this.setState({
            date: date + '-' + month + '-' + year,
            time: hours + ':' + min + ':' + sec,
            pickerData: this.phone.getPickerData()
        })
        //console.log(this.phone.getCountryCode())
    }

    selectCountry(country) {
        console.log('country >>', country)
        //this.myCountryPicker.open()
        // const allCountries = this.state.pickerData;
        // for(let i in allCountries){
        //     console.log('allCountries >>>',allCountries[i])
        // }
        this.phone.selectCountry(country.iso2)
    }
    // selectCountry = (country) => {
    //     this.phone.selectCountry(country.iso2)
    // }

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
        const { navigate } = this.props.navigation;
        const { name, lastName, email, mobileNo, newPasswrd, cnfrmPasswrd, nameValidate, emailValidate, mobileValidate, passwrdValidate, cnfrmPasswrdValidate, isLoading, gender , emailNotExist} = this.state;
        if (name == '' || lastName == '' || email == '' || mobileNo == '' || newPasswrd == '' || cnfrmPasswrd == '' || gender == '') {
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
                password: newPasswrd,
                lastName: lastName,
                gender: gender,
                mobileNo: mobileNo,
                type: 'trainee'
            }
            console.log(userObj)

            try {
                let getEmails = await HttpUtilsFile.get('getuseremail')
                // console.log('all emails from database >>>', getEmails)
                let emailCode = getEmails.code;
                let signupCode;
                let profileCode;
                const emailContents = getEmails.content;
                if (emailCode == 200) {
                    emailContents.map((item, index) => {
                        // console.log('items >>>', item)
                        const { email } = this.state;
                        // console.log('state email >>>', email)
                        // console.log('user emails >>>', item == email)
                        if (email == item) {
                           // console.log('email match condition true')
                            // return (
                            this.setState({
                                isLoading: false,
                                emailNotExist: true
                            })
                        }
                    })
                }
                if (!emailNotExist) {
                    let dataUser = await HttpUtilsFile.post('signup', userObj)
                    console.log('signup data user >>>', dataUser)
                    let currentUserData = {
                        code: dataUser.code,
                        email: this.state.email,
                        name: this.state.name,
                        lastName: this.state.lastName,
                        token: dataUser.token,
                        mobileNo: mobileNo,
                        _id: dataUser._id
                    }
                    let userObjForProfile = {
                        name: this.state.name,
                        email: this.state.email,
                        lastName: this.state.lastName,
                        mobileNo: mobileNo,
                        time: this.state.time,
                        date: this.state.date,
                        objectId: '',
                        type: userObj.type,
                        userId: dataUser._id
                    }
                    console.log(userObjForProfile, 'userObjForProfile')
                    let userProfile = await HttpUtilsFile.post('profile', userObjForProfile);
                    console.log('new user profile data >>>', userProfile)
                    profileCode = userProfile.code;
                    signupCode = dataUser.code;
                    if (signupCode == 200 && profileCode == 200 && emailCode == 200) {
                        this.setState({
                            isLoading: false,

                        }, () => {
                            console.log('currentUserData >>>', currentUserData);
                            console.log('myProfile data >>>>', userProfile)
                            AsyncStorage.setItem('currentUser', JSON.stringify(currentUserData))
                            AsyncStorage.setItem('myProfile', JSON.stringify(userProfile));
                            const { navigate } = this.props.navigation;
                            navigate('BottomTabe');
                            
                        })
                    }
                }
                if (emailCode != 200 || signupCode != 200 || profileCode != 200) {
                    this.setState({
                        isLoading: false
                    })
                    Alert.alert('Something Went Wrong')

                }

                // console.log(emailContents , 'emails');
                // console.log(getToken);
                //console.log(getCode)
                // if (emailCode) {
                // this.setState({
                //     isLoading: false
                // })


                // else {
                //     // console.log('signup code not available')
                // }
                // if () {
                //     this.setState({
                //         isLoading: false,

                //     }, () => {
                //         //console.log('user profile localstorage data saved >>>', userProfile);

                //     })
                // }
                // else {
                //     // console.log('profile code not available')
                // }

                // }


            } catch (error) {
                console.log(error);
            }
            this.setState({
                name: '',
                lastName: '',
                email: '',
                mobile: '',
                newPasswrd: '',
                cnfrmPasswrd: '',
                gender: '',
                passMatch: false
            })
        }
    }
    checkValidateFunc = (text, type) => {
        let alpha = /^[a-zA-Z]+$/;
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let mobileNum = /^[0-9]+$/;
        let passwrd = /^[A-Za-z]\w{7,14}$/;
        // if (type == 'username') {
        //     if (alpha.test(text)) {
        //         this.setState({
        //             nameValidate: true,
        //         })
        //     }
        //     else {
        //         this.setState({
        //             nameValidate: false
        //         })
        //     }
        // }
        if (type == 'email') {
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
    getGender(gender) {
        if (gender == 'male') {
            this.setState({
                male: true,
                female: false,
                maleClickedTextStyle: true,
                femaleClickedTextStyle: false,
                gender: 'male'
            })
        }
        else if (gender == 'female') {
            this.setState({
                male: false,
                female: true,
                gender: 'female',
                maleClickedTextStyle: false,
                femaleClickedTextStyle: true,
            })
        }
    }

    selectCode(countryTxt) {
        console.log(countryTxt, 'countryTxt')
        console.log(this.state.pickerData, 'picker data')
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
            emailNotExist,
            lastName,
            male,
            female,
            maleClickedTextStyle,
            femaleClickedTextStyle,
        } = this.state;
        console.log(emailNotExist, 'emailNotExist')
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
                        {/* <Text style={styles.textsStyles}>First Name</Text> */}
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {

                            this.setState({ name: text })
                        }}
                            placeholder="First Name"
                            placeholderTextColor="#7e7e7e"
                            value={name}
                            style={[styles.inputTexts, !this.state.nameValidate ? styles.errorInput : null]} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                        {/* <Text style={styles.textsStyles}>Last Name</Text> */}
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => {

                            this.setState({ lastName: text })
                        }}
                            placeholder="Last Name"
                            placeholderTextColor="#7e7e7e"
                            value={lastName}
                            style={[styles.inputTexts, !this.state.nameValidate ? styles.errorInput : null]} />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                        {/* <Text style={styles.textsStyles}>Email</Text> */}
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput
                            onChangeText={text => {
                                this.checkValidateFunc(text, 'email'),
                                    this.setState({ email: text })
                            }}
                            keyboardType='email-address'
                            placeholder="email@gmail.com"
                            placeholderTextColor="#7e7e7e"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            //onKeyPress={() => { this.emailGet() }}
                            style={[styles.inputTexts, !this.state.emailValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {emailNotExist == true ? <View style={styles.emailExistContainer}>
                        <Text style={styles.emailNotExistStyle}>
                            Email is already exist
                       </Text>
                    </View>
                        : null}
                    <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                        {/* <Text style={styles.textsStyles}>Mobile</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        <PhoneInput
                            ref={(ref) => { this.phone = ref; }}
                            //onPressFlag={this.onPressFlag}
                            allowZeroAfterCountryCode={false}
                            onChangePhoneNumber={() =>
                                this.setState({ mobileNo: this.phone.getValue() })
                            }
                            onSelectCountry={() =>
                                //console.log(this.phone.getCountryCode())
                                this.setState({ countryCod: this.phone.getCountryCode() })
                            }
                            value={this.state.mobileNo}
                            //pickerBackgroundColor={'red'}
                            // getPickerData={(res)=>console.log(res)}
                            style={{ flex: 1, height: 40, backgroundColor: 'white', borderRadius: 3 }}

                        />

                        {/* <ModalPickerImage
                            ref={(ref) => { this.myCountryPicker = ref; }}
                            data={this.state.pickerData}s
                            onChange={(country) => { this.selectCountry(country) }}
                            cancelText='Cancel'
                        /> */}


                        {/* <View style={styles.inputFields}>
                            <TextInput onChangeText={text => { this.checkValidateFunc(text, 'mobile'), this.setState({ mobile: text }) }}
                                keyboardType='phone-pad'
                                placeholder="number"
                                placeholderTextColor="#7e7e7e"
                                value={mobile}
                                style={[styles.inputTexts, !this.state.mobileValidate ? styles.errorInput : null]}
                            />
                        </View> */}
                    </View>

                    <Text style={styles.genderTextStyle}>Gender</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={male ? styles.clickedMale : styles.maleTouchableOpacity} onPress={this.getGender.bind(this, 'male')}>
                            <Text style={maleClickedTextStyle ? styles.maleClickedTextStyle : styles.maleTextStyle}>
                                Male
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={female ? styles.clickedFemale : styles.femaleContainer} onPress={this.getGender.bind(this, 'female')}>
                            <Text style={femaleClickedTextStyle ? styles.femaleClickedTextStyle : styles.maleTextStyle}>
                                Female</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ height: 30, marginTop: 3 }}>
                            {genderValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select the gender
                                </Text>
                                : null}
                        </View> */}
                    {/* <View style={{ flex: 0.5 }}></View> */}
                    <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                        {/* <Text style={styles.textsStyles}>New Password</Text> */}
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={text => this.newPasswrdInputValueHandle(text)}
                            secureTextEntry={true}
                            placeholder="new password"
                            placeholderTextColor="#7e7e7e"
                            value={this.state.newPasswrd}
                            style={[styles.inputTexts, !this.state.passwrdValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                        <Text style={styles.instructionStyle}>
                            Password strength is required maximum 9 and greater then 4
                         </Text>
                    </View>}
                    <View style={{ flexDirection: 'row', marginVertical: 8, marginTop: 5 }}>
                        {/* <Text style={styles.textsStyles}>Confirm New Password</Text> */}
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput onChangeText={(text) => this.cnfrmPasswrdInputValueHandle(text)}
                            secureTextEntry={true}
                            placeholder="confirm password"
                            placeholderTextColor="#7e7e7e"
                            value={this.state.cnfrmPasswrd}
                            //onKeyPress={()=>this.cnfrmPasswrdHandle()}
                            style={[styles.inputTexts, !this.state.cnfrmPasswrdValidate ? styles.errorInput : null]}
                        />
                    </View>

                    <View style={styles.passMatchContainer}>
                        {passNotMatch && <Text style={styles.passNotMatchStyle}>
                            Password Not Match
                       </Text>}
                    </View>
                    <View style={styles.passMatchContainer}>
                        {passMatch && <Text style={styles.passMatchStyle}>
                            Password Match
                       </Text>}
                    </View>
                    {/* {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
                        <ActivityIndicator size='large' color="#FF6200" />
                    </View>} */}
                    {isLoading ? <OverlayLoader /> : null}
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


