import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Picker, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import InputImgsScreen from './InputImgs';
import TextInputs from '../textInputs/TextInputs';
import CaloriesSetupBtn from '../buttons/setUpBtn';
//import PickerInput from '../../Picker/PickerInput'
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');







class Setupscreen extends React.Component {
    static navigationOptions = () => ({

        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    })
    constructor(props) {
        super(props);

        this.state = {
            screenHeight: 0,
            user: ''
        }
        //         onContentSizeChange = (contentHeight, contentWidth) => {
        //             this.setState({ screenHeight: contentHeight })

        // }
        updateUser = (user) => {
            this.setState({ user: user })
        }
    }
    render() {
        //const scrollEnabled = this.state.screenHeight > height;
        const { navigate } = this.props.navigation;
        return (

            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.heading}>
                    <Text style={styles.headingStyle}>Set Up Your App</Text>
                </View>
                <View style={styles.paraGraph}>
                    <Text style={styles.paraGraphStyle}>GetFitAthletic needs the following info to help you with your fitness journey</Text>
                </View>
                {/* <View><Text style={{marginLeft:20}}>Height</Text></View> */}
                <View style={styles.inputFieldOne}>
                    {/* <Text style={styles.inputFieldOneStyle}>Input Fields One</Text> */}

                    <View style={{ flex: 1, marginLeft: 20, marginRight: 16 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Height</Text>
                        <InputImgsScreen iconMinus={require('../icons/minus.png')} 
                        iconPlus={require('../icons/plus.png')} 
                        style={styles.textInputStyleParent} 
                        touchableOpacityOne={styles.touchableOpacityOne}
                        touchableOpacityTwo={styles.touchableOpacityTwo}
                        />
                    </View>
                    {/* <View><Text>Height</Text></View>      */}
                    <View style={{ flex: 1, marginRight: 20 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Unit</Text>
                        <Picker selectedValue={this.state.user} onValueChange={this.updateUser} style={styles.pickerStyle} headerTintColor='white'>
                            <Picker.Item label="Inches" value="inches" />
                            <Picker.Item label="Centimeter" value="centimeter" />
                        </Picker>
                        {/* <PickerInput /> */}
                    </View>
                </View>
                <View style={styles.inputFieldTwo}>
                    {/* <Text style={styles.inputFieldTwoStyle}>Input Fields Two</Text> */}
                    <View style={{ flex: 1, marginLeft: 20, marginRight: 16 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Current Weight</Text>
                        <InputImgsScreen iconMinus={require('../icons/minus.png')}
                         iconPlus={require('../icons/plus.png')}
                          style={styles.textInputStyleParent} 
                          touchableOpacityOne={styles.touchableOpacityOne}
                          touchableOpacityTwo={styles.touchableOpacityTwo}
                          />
                    </View>
                    {/* <View><Text>Height</Text></View>      */}
                    <View style={{ flex: 1, marginRight: 20 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Unit</Text>
                        <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                            <Picker.Item label="KG" value="kg" />
                            {/* <Picker.Item label = "" value = "centimeter" /> */}
                        </Picker>
                        {/* <InputImgsScreen /> */}
                    </View>
                </View>
                <View style={styles.inputFieldThree}>
                    {/* <Text style={styles.inputFieldThreeStyle}>Input Fields Three</Text> */}
                    {/* <Text style={styles.inputFieldTwoStyle}>Input Fields Two</Text> */}
                    <View style={{ flex: 1, marginLeft: 20, marginRight: 16 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Goal Weight</Text>
                        <InputImgsScreen iconMinus={require('../icons/minus.png')} iconPlus={require('../icons/plus.png')} 
                        style={styles.textInputStyleParent}
                        touchableOpacityOne={styles.touchableOpacityOne}
                        touchableOpacityTwo={styles.touchableOpacityTwo}
                        />
                    </View>
                    {/* <View><Text>Height</Text></View>      */}
                    <View style={{ flex: 1, marginRight: 20 }}>
                        <Text style={{ color: 'white', fontFamily: 'MontserratLight' }}>Unit</Text>
                        <Picker selectedValue={this.state.user} onValueChange={this.updateUser} style={styles.pickerStyle}>
                            <Picker.Item label="KG" value="kg" />
                            {/* <Picker.Item label = "" value = "centimeter" /> */}
                        </Picker>
                        {/* <InputImgsScreen /> */}
                    </View>
                </View>
                {/* <Text style={styles.textInputOneStyle}>BMI</Text> */}
                {/* <View style={styles.textInputOne}> */}
                    {/* <TextInputs /> */}
                    {/* <TextInput placeholder="type BMI" style={styles.textInputStyle}/> */}
                {/* </View> */}
                {/* <Text style={styles.textInputTwoStyle}>Daily calories limit</Text>
                <View style={styles.textInputTwo}>
                    
                    <TextInput placeholder="type calories" style={styles.textInputStyle}/>
                </View>
                <View style={styles.lastParaGraph}>
                    <Text style={styles.lastParaGraphStyle}>*This is the daily calories limit as
                    calculated by the app using your BMI. If your coach has set for you another limit ,
                    please enter it please enter it above.
                </Text>
                </View> */}
                <View style={styles.buttonContainer}>
                    {/* <Text style={styles.buttonContainerStyle}>This is Button</Text> */}
                    <CaloriesSetupBtn  title='Last Step' onPress={()=>navigate('LastSetUpScreen')}/>
                </View>
                <View style={{flex:14}}>

                </View>

            </ScrollView>









        )
    }
}

export default Setupscreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: screenWidth,
        backgroundColor: 'black'
        // height: height,
        //  justifyContent:'space-between',
        //  justifyContent:'flex-start'
    },
    // childContainer: {
    //     flex: 4,
    //     backgroundColor: 'black',
    // },
    heading: {
        flex: 3,
        //backgroundColor: 'black'
    },
    headingStyle: {
        fontFamily: "MontserratExtraBold",
         fontSize:20,
         color: '#A6A6A6',
        marginLeft: 20,
        
    },
    paraGraph: {
        flex: 2,
        marginTop: 5
        //backgroundColor: '#8397b3'
    },
    paraGraphStyle: {
        color: 'white',
        marginLeft: 20,
        fontFamily: 'MontserratLight',
    },
    inputFieldOne: {
        flex: 2,
        //backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldOneStyle: {
        color: 'white',
        marginLeft: 20
    },
    inputFieldTwo: {
        flex: 2,
        // backgroundColor: '#7fff8e',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldTwoStyle: {
        color: 'white',
        marginLeft: 20
    },
    inputFieldThree: {
        flex: 2,
        //backgroundColor: '#008080',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldThreeStyle: {
        color: 'white',
        marginLeft: 20
    },
    textInputOne: {
        flex: 3,
        //backgroundColor: '#f8988b',
        justifyContent: 'center',
        flexDirection:'row'
    },
    textInputOneStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20
    },
    textInputStyle:{
        flex: 1,
      fontFamily: 'MontserratLight',
      marginLeft: 20,
      height: 40,
      borderColor: 'gray',
      backgroundColor: '#808080',
      borderWidth: 2,
      marginRight: 20,
      paddingLeft: 16,
      marginTop:7,
    },
    textInputTwo: {
        flex: 3,
        //backgroundColor: '#038ff9',
        justifyContent: 'center',
         flexDirection:'row'
    },
    textInputTwoStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20
    },
    lastParaGraph: {
        flex: 2,
        //backgroundColor: '#ffd39b',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    lastParaGraphStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20,
        marginRight: 20
    },
    buttonContainer: {
        flex: 2,
        //backgroundColor: '#794044',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
    },

    // reserveScreen: {
    //     flex: 2,
    //     backgroundColor: 'white'
    // },
    // scrollViewStyle: {

    // },
    pickerStyle: {
        width: 155,
        height: 40,
        marginTop: 5,
        color: 'white',
        backgroundColor: 'gray'
    },
    textInputStyleParent:{
        flex:1,
        height: 40,
        textAlign: 'center', 
        backgroundColor: 'white',
        opacity:0.3
    },
    touchableOpacityOne:{
        flex: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor:'gray',
        paddingLeft:10,
        height:40 ,
        opacity:0.6
        
        
    },
    touchableOpacityTwo:{
        flex: 1,
        padding: 5, 
        marginVertical: 5,
        alignItems:'flex-end',
        backgroundColor:'gray',
        paddingRight:10,
        marginRight:12,
        height:40 ,
        opacity:0.6
    },
    // touchableOpacityTwo:{
    //     flex: 1,
    //     // padding: 5, 
    //     marginVertical: 5,
    //     alignItems:'flex-end',
    //     backgroundColor:'gray',
    //     height:40 ,
    //     opacity:0.6
    // },
})