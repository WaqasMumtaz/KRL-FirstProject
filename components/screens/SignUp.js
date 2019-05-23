import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import CaloriesSetupBtn from '../buttons/setUpBtn'
import { NavigationEvents } from 'react-navigation';
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

class Signup extends React.Component {
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
        // const { navigate }= this.props.navigation;
        const { goBack ,navigate} = this.props.navigation;

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
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={styles.textsStyles}>Email or phone</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput keyboardType='email-address' placeholder="waqas@gmail.com" style={styles.inputTexts} />
                    </View>
                    {/* <View style={{ flex: 0.5 }}></View> */}
                    <View style={{ flexDirection: 'row',  marginBottom: 10 }}>
                        <Text style={styles.textsStyles}>New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput secureTextEntry={true} placeholder="password" style={styles.inputTexts} />
                    </View>
                    <View style={{ flexDirection: 'row',  marginBottom: 10 }}>
                        <Text style={styles.textsStyles}>Confirm New Password</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <TextInput secureTextEntry={true} placeholder="password" style={styles.inputTexts} />
                    </View>
                    <View style={styles.buttonContainer}>
                    
                    <CaloriesSetupBtn  title='Create Account' onPress={()=>{navigate('Setupscreen1')}}/>
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


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red',
        marginLeft: 20,
        marginRight: 20
    },
    signUpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop:10
    },
    signUpText: {
        fontFamily: "MontserratExtraBold",
         fontSize:20,
        color: '#A6A6A6',
    },
    logoContainer: {
        flex: 1,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    forImages: {
        flex: 1,
        height: 100,
        width: 120,
        alignSelf: 'stretch',
        // marginBottom: 4
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
        // marginLeft: 20,
        // marginRight: 20
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
        //marginLeft: 20,
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#808080',
        borderWidth: 2,
        //marginRight: 20,
        paddingLeft: 16
      },
      textsStyles: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20
      },
      buttonContainer:{
        flex:2,
        marginTop:10
    },
      accountLinkContainer:{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop:20,
          //backgroundColor:'white',
          //alignItems:'center'
        
      },
      
      accountText:{
        // fontSize:23,
        fontFamily:'MontserratLight',
        color:'#A6A6A6'
      },
      registerText:{
        // fontSize:23,
        fontFamily:'MontserratMedium',
        color:'#FF6200'
      }
    
})