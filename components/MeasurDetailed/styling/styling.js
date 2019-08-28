import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer:{
       // flex:1,
        //backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        //flexDirection:'row',
        //marginTop:
        
    },
    cardContainer:{
        //height:310,
        //borderWidth:3,
        //borderColor:'black',
        width:335,
        borderRadius:5,
        backgroundColor:'black',
        // paddingHorizontal:10,
        // paddingVertical:8
        padding:15
    },
    dateWithCancelIcon:{
        flexDirection:'row',
        justifyContent:'space-between'

    },
    iconStyle:{
        height:18,

    },
    borderLineStyle:{
        borderBottomWidth: 0.7, 
        borderColor: '#a6a6a6',
         width: 100 
    }
})

export default styles;