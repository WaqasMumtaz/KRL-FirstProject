import React from 'react';
import {Alert, StyleSheet, Text, View,TextInput,Dimensions,ScrollView,TouchableOpacity} from 'react-native';
import Button from 'apsl-react-native-button';
import TextInputs from '../textInputs/TextInputs'
const screenWidth=Dimensions.get('window').width;
const { height }=Dimensions.get('window');

class Resetpassword extends React.Component{
    static navigationOptions = {
        //title: 'Reset Password',
        headerStyle: {
            backgroundColor: 'black'
          },
        headerTintColor:'white'
      };
    constructor(props){
        super(props)
        this.state={
            screenHeight:0,
        }


    }
    // onContentSizeChange = (contentHeight, contentWidth) => {
    //     this.setState({ screenHeight: contentHeight })
    
    // }
    
    render(){
        //const scrollEnabled = this.state.screenHeight > height;
        const { navigate } = this.props.navigation;
        return(
        
        <ScrollView style={{ flex: 1,backgroundColor:'black',height:height }} contentContainerStyle={{ flexGrow: 1 }} >
                 <View style={styles.resetPasswrdContainer}>
                     <Text style={styles.resetTextStyle}>Reset Password</Text>
                 </View>
                <Text style={styles.textsStyles}>Enter your GetFitAthletic email to reset password</Text>
                <Text style={styles.emailTextStyle}>Email</Text>
                 <View style={styles.inputFields}>
                 {/* <TextInput placeholder="waqas@gmail.com" style={styles.inputTexts}/> */}
                 <TextInputs/>
                 </View>
                 {/* <View style={{flex:1}}></View> */}
                 <View style={styles.btnContainerStyle}>
                 <Button style={styles.btnSizeStyle}><Text style={styles.btnStyle} onPress={()=>{navigate('ConfirmResetPassword')}}>Send Reset Instructions</Text></Button>    
                 </View>
            </ScrollView>
    )
    }
}

export default Resetpassword;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      //backgroundColor:'#000000',
    //   width:screenWidth,
    //   height:height

    },
    resetPasswrdContainer:{
        flex:0.25,
        //flexDirection:'row',
        justifyContent:'flex-start',
        //backgroundColor:'red'
        //backgroundColor:'red'
    },
    resetTextStyle:{
        fontFamily: "MontserratExtraBold",
        fontSize:17,
        color:'white',
        marginLeft:20,
        marginTop:5,
        
    },
    inputFields:{
        flex:0.25,
        // flexDirection:'row',
        justifyContent:'center',
        marginTop:2,
       // backgroundColor:'yellow'
        
        
      },
    
      textsStyles:{
        fontFamily:'MontserratLight',
        color:'white',
        marginLeft:20,
        //backgroundColor:'black',
        marginRight:20
      },
    btnContainerStyle:{
        flex:2,
       // backgroundColor:'gray',
        flexDirection:"row",
        justifyContent:'center',
        marginLeft:25,
        marginRight:25
       
    },
    btnSizeStyle:{
        backgroundColor:'#FF7F50',
        height:40,
        width:230,
        textAlign:'center',
        
    },
    btnStyle:{
        color:'#ffffff',
        fontFamily: "MontserratExtraBold",
        paddingLeft:10,
        paddingRight:10
    },
    emailTextStyle:{
        color:'white',
        marginTop:15,
        fontFamily:'MontserratLight',
        marginLeft:20,       
    }
    

})  