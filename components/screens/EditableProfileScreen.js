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
import HttpUtils from '../Services/HttpUtils';
import { thisExpression } from '@babel/types';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
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
            avatarSource: null,
            date: '',
            time: '',
            userId: '',
            objectId:'',
            male:false,
            female:false
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
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    userId: dataFromLocalStorage._id
                })
            }
        });
    }
    componentWillMount(){
        AsyncStorage.getItem('myProfile').then((value) => {
        if(value){
            let userData = JSON.parse(value);
            this.setState({
                objectId:userData._id
            })
        }
        })
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

    chooseProfilePhoto = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        }
        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                //const source = { uri: response.uri };
                let contentType = response.type
                let res = await RNFS.readFile(response.uri, 'base64')
                let imgBase644 = `data:${contentType};base64,${res}`;
                let apiUrl = 'https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload';
                let data = {
                    "file": imgBase644,
                    "upload_preset": "toh6r3p2",
                }

                fetch(apiUrl, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                }).then(async r => {
                    let data = await r.json()
                    //send image on firebase
                    console.log(data)
                    const source = { uri: data.secure_url }
                    this.setState({
                        avatarSource: source,
                    })
                    return data.secure_url
                }).catch(err => console.log(err))

            }
        })
    }

    updateUserProfileFunc = async () => {
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
            genderValidate,
            avatarSource,
            date,
            time,
            userId,
            objectId,
            name
        } = this.state;
        if (email == '' || password == '' || address == '' || contactNo == '' || gender == '' || name =='') {
            Alert.alert('Please Fill All Fields');
            if (passwordValidate != true || emailValidate != true || addressValidate != true || contactNoValidate != true || genderValidate != true) {
                Alert.alert('Please Enter Correct Field');
            }
        }
        else {
            const userObj = {
                name:name,
                email: email,
                address: address,
                contactNo: contactNo,
                gender: gender,
                image: avatarSource.uri,
                date: date,
                time: time,
                userId: userId,
                objectId:objectId
            }
            console.log(userObj);
            let dataUser = await HttpUtils.post('profile', userObj);
            if(dataUser.code == 200){
            AsyncStorage.setItem('myProfile', JSON.stringify(userObj));

            }

            console.log(dataUser, 'dataUser');
        }
    }
    getGender(gender) {
        if (gender == 'male') {
            this.setState({
                male: true,
                female: false,
                gender: 'male'
            })
        }
        else if (gender == 'female') {
            this.setState({
                male: false,
                female: true,
                gender: 'female'
            })
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
            avatarSource,
            male,
            female,
            name
        } = this.state;
    return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.profilPicContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.chooseProfilePhoto}>
                            {avatarSource ? <Image source={avatarSource} style={styles.profilPicStyle} />
                                :
                                <Image source={userDefaultPic}
                                    style={styles.profilPicStyle}
                                />}
                        </TouchableOpacity>
                        {/* <View style={styles.nameContainer}>
                            <Text style={styles.nameStyle}>{this.state.name}</Text>
                        </View>
                        <View style={styles.userTitle}>
                            <Text style={styles.userTitleStyle}>Trainee</Text>
                        </View> */}
                    </View>
                     <View style={styles.emailContainer}>
                        <Text style={styles.inputLabelsStyle}>Name</Text>
                        <TextInput
                            onChangeText={text => {
                                    this.setState({
                                        name: text
                                    })
                            }}
                            placeholder="Enter your name"
                            placeholderColor="#4f4f4f"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={name}
                            style={[styles.inputTextStyle]}
                        />
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
                            placeholder="Enter your email"
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
                            keyboardType={"numeric"}
                            style={[styles.inputTextStyle, !contactNoValidate ? styles.errorInput : null]}
                        />
                    </View>
                    <View style={styles.genderContainer}>
                        <Text style={styles.inputLabelsStyle}>Gender</Text>
                        <View style={styles.childGender}>
                        <TouchableOpacity style={male ? styles.clickedMale : styles.maleTouchableOpacity} 
                          onPress={this.getGender.bind(this, 'male')}>
                                <Text style={styles.maleTextStyle}>
                                    Male
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={female ? styles.clickedFemale : styles.femaleContainer} 
                            onPress={this.getGender.bind(this, 'female')}>
                                <Text style={styles.maleTextStyle}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {isLoading && <View style={[styles.spinerContainer, styles.horizontal]}>
                        <ActivityIndicator size='large' color="#FF6200" />
                    </View>}
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn
                            title='Edit Profile'
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.updateUserProfileFunc}
                        />
                    </View>

                    <View style={styles.blankContainer}>

                    </View>

                </ScrollView>
            </View>

        )
    }
}

export default EditProfileScreen;
