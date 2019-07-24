import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/EditableProfileStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';
import ImagePicker from 'react-native-image-picker';

const userDefaultPic = require('../icons/profile.png')


const { height } = Dimensions.get('window');

class EditProfileScreen extends React.Component {
    static navigationOptions = (navigation) => {
        return {

            headerStyle: {
                backgroundColor: 'white'

            },
            headerTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailValidate: true,
            password: '',
            passwordValidate: true,
            address: '',
            addressValidate: true,
            addressInstruction: false,
            contactNo: '',
            contactNoValidate: true,
            gender: '',
            psswrdInstruction: false,
            genderValidate: true,
            isLoading: false,
            avatarSource:null
        }
    }

    checkValidation = (text, type) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let mobileNum = /^[0-9]+$/;
        let alpha = /^[a-zA-Z]+$/;
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
                    contactNoValidate: true,
                })
            }
            else {
                this.setState({
                    contactNoValidate: false
                })
            }
        }
        else if (type == 'gender') {
            if (alpha.test(text)) {
                this.setState({
                    genderValidate: true,
                })
            }
            else {
                this.setState({
                    genderValidate: false
                })
            }
        }
    }

    passwordHandleValue = (text) => {
        const { password } = this.state;
        this.setState({
            password: text
        }, () => {
            if (password.length < 4) {
                this.setState({
                    passwordValidate: false,
                    psswrdInstruction: true
                })
            }
            if (password.length >= 4) {
                this.setState({
                    passwordValidate: true,
                    psswrdInstruction: false
                })
            }
            if (password.length > 9) {
                this.setState({
                    passwordValidate: false,
                    psswrdInstruction: true
                })
            }

        })
    }

    addressValueHandle = (text) => {
        const { address } = this.state;
        this.setState({
            address: text
        }, () => {
            if (address.length < 8) {
                this.setState({
                    addressValidate: false,
                    addressInstruction: true
                })
            }
            if (address.length > 8) {
                this.setState({
                    addressValidate: true,
                    addressInstruction: false
                })
            }
        })
    }

 chooseProfilePhoto= async ()=>{
     const options={
        noData: true,
        mediaType: 'photo'
     }
     ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          //const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: response.uri,
          });
        }
      })
 }   

    updateUserProfileFunc = () => {
        const {
            email,
            password,
            address,
            contactNo,
            gender,
            emailValidate,
            passwordValidate,
            addressValidate,
            contactNoValidate,
            genderValidate

        } = this.state;

        if (email == '' || password == '' || address == '' || contactNo == '' || gender == '') {
            Alert.alert('Please Fill All Fields');
            if (passwordValidate != true || emailValidate != true || addressValidate != true || contactNoValidate != true || genderValidate != true) {
                Alert.alert('Please Enter Correct Field');
            }

        }

        else {
            this.setState({ isLoading: true })

            const userObj = {
                email: email,
                address: address,
                contactNo: contactNo,
                gender: gender
            }
            console.log(userObj)


        }
    }


    render() {
        const {
            email,
            password,
            psswrdInstruction,
            passwordValidate,
            address,
            addressValidate,
            addressInstruction,
            contactNo,
            contactNoValidate,
            gender,
            genderValidate,
            isLoading,
            avatarSource

        } = this.state;
        console.log(email);
        console.log(avatarSource)

        return (
            <View style={styles.mainContainer}>

                <ScrollView
                    style={{ flex: 1, backgroundColor: 'white', height: height }}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.profilPicContainer}>
                        <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.chooseProfilePhoto}
                        >
                         {avatarSource == null ? <Image source={userDefaultPic}
                            style={styles.profilPicStyle}
                         />: avatarSource && <Image style={styles.profilPicStyle}/>}
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{this.state.name}</Text>
                        </View>
                        <View style={styles.userTitle}>
                            <Text style={styles.userTitleStyle}>Trainee</Text>
                        </View>
                    </View>

                    <View style={styles.emailContainer}>
                        <Text style={styles.inputLabelsStyle}>Email</Text>
                        <TextInput
                            onChangeText={text => {
                                this.checkValidation(text, 'email'),
                                this.setState({
                                    email: text
                                })
                            }}
                            placeholder="waqas@gmail.com"
                            keyboardType="email-address"
                            placeholderColor="#4f4f4f"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            style={[styles.inputTextStyle, !this.state.emailValidate ? styles.errorInput : null]}
                        />
                    </View>
                    <View style={styles.passwrdContainer}>
                        <Text style={styles.inputLabelsStyle}>Password</Text>
                        <TextInput
                            onChangeText={text => { this.passwordHandleValue(text) }}
                            placeholder="password"
                            secureTextEntry={true}
                            placeholderColor="#4f4f4f"
                            value={password}
                            style={[styles.inputTextStyle, !passwordValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {psswrdInstruction && <View style={styles.passwrdInstructionContainer}>
                        <Text style={styles.instructionStyle}>
                            Password strength is required maximum 9 and greater then 4
                         </Text>
                    </View>}
                    <View style={styles.addressContainer}>
                        <Text style={styles.inputLabelsStyle}>Address</Text>
                        <TextInput
                            onChangeText={text => { this.addressValueHandle(text) }}
                            placeholder="Type here your address..."
                            placeholderColor="#4f4f4f"
                            value={address}
                            style={[styles.inputTextStyle, !addressValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {addressInstruction && <View>
                        <Text style={styles.instructionStyle}>
                            Address length must be minimum 8
                         </Text>
                    </View>}
                    <View style={styles.contactNumberContainer}>
                        <Text style={styles.inputLabelsStyle}>Contact Number</Text>
                        <TextInput
                            onChangeText={text => {
                                this.checkValidation(text, 'mobile'),
                                this.setState({
                                    contactNo: text
                                })
                            }}
                            placeholder="+92-333-1122223"
                            placeholderColor="#4f4f4f"
                            value={contactNo}
                            style={[styles.inputTextStyle, !contactNoValidate ? styles.errorInput : null]}
                        />
                    </View>
                    <View style={styles.genderContainer}>
                        <Text style={styles.inputLabelsStyle}>Gender</Text>
                        <TextInput
                            onChangeText={text => {
                                this.checkValidation(text, 'gender'),
                                this.setState({
                                    gender: text
                                })
                            }}
                            placeholder="Male"
                            placeholderColor="#4f4f4f"
                            value={gender}
                            style={[styles.inputTextStyle, !genderValidate ? styles.errorInput : null]}
                        />
                    </View>
                    {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
                        <ActivityIndicator size='large' color="#FF6200" />
                    </View>}
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn
                            title='Set Up & Use App'
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.updateUserProfileFunc}
                        />
                    </View>

                    <View style={styles.blankContainer}>
                   {avatarSource && <Image style={{height:20,width:20}}/>}
                    </View>
                    
                </ScrollView>
            </View>

        )
    }
}

export default EditProfileScreen;