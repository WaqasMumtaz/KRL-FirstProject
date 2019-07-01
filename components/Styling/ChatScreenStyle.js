import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      width:screenWidth,
      height:screenHight
    },
    // container:{
    //     flex:1,
    //     marginHorizontal:12,
    //     backgroundColor:'black'
    // },
    scrollContainer:{
        flex: 1, 
        backgroundColor: 'white', 
        height: screenHight,
        marginHorizontal:12 
    },
    container:{
       flex:1,
       justifyContent:'flex-end',
       //backgroundColor:'red',
    },
    textInputContainer:{
        flexDirection:'row',
        
    },
    inputStyle:{
       flex:1,
       height:45,
    //    borderWidth:3,
    //    borderColor:'black',
       marginRight:7,
       borderRadius:3,
       paddingLeft:16,
       backgroundColor:'#e5e5e5',
       color:'#4f4f4f'
    },
    sentBtnContainer:{
        width:45,
        height:45,
        //borderWidth:3,
        //borderColor:'#FF6200',
        borderRadius:45/2,
        backgroundColor:'#FF6200',
        justifyContent:'center',
        alignItems:'center'
    },
    iconStyle:{
        width:20,
        height:25
    },
    orangeMicContainer:{
        width:45,
        height:45,
        //borderWidth:3,
        //borderColor:'#FF6200',
        borderRadius:45/2,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center'
    },
    recordingContainer:{
        height:120,
        borderRadius:5,
        //borderWidth:2,
        backgroundColor:'#e5e5e5',
        marginBottom:30
    }

    


    

    
});

export default styles;
