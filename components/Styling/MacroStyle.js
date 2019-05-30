import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        width:screenWidth,
        height:screenHight,
        //backgroundColor:'red'
    },
    childContainer:{
        flex:1,
        marginHorizontal:20,
        //backgroundColor:'green'
    },
    headingContainer:{
        flex:0.5,
        height:'6%',
        backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'black',
        fontFamily: "MontserratExtraBold",
    },
    textContainer:{
        flex:0.5,
        height:'8%',
        backgroundColor:'green',
        marginTop:25
    },
    textStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight'
    },
    dateBirth:{
        flex:0.5,
        height:'4%',
        backgroundColor:'pink',
        marginTop:10
    },
    inputContainer:{
        flex:0.5,
        //height:'10%',
        flexDirection:'row',
        flexWrap:'wrap'
        //backgroundColor:'orange'
    },
    inputStyle:{
        flex:1,
        height:40,
        borderRadius:3,
        backgroundColor:'#DCDCDC',
        //opacity:0.4
    },
    genderContainer:{
        flex:1,
        //backgroundColor:'yellow',
        flexDirection:'row'
    }
})

export default styles;