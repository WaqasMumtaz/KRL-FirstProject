import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles =StyleSheet.create({
     mainContainer:{
         flex:1,
         //backgroundColor:'red'
         width:screenWidth
     },
     childContainer:{
         marginHorizontal:20
     },
     headingContainer:{
         height:'20%',
         backgroundColor:'red'
     },
     headingStyle:{
         fontSize:20,
         color:'black',
         fontFaimly:'MontserratExtraBold'
     },
     arrowContainer:{
        height:'10%',
        //backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    forImgs:{
        height:15,
        width:15,
    },
    bodyContainer:{
        flex:1,
        backgroundColor:'green'
    }
    
})

export default styles;