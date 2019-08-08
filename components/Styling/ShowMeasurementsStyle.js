import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        //marginHorizontal:20,
        width:screenWidth,
        height:screenHight,
        //backgroundColor:'red'
    },
    childContainer:{
        flex:1,
        backgroundColor:'black',
        marginHorizontal:20
    },
    headingContainer:{
        height:50
    },
    headingStyle:{
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        color: '#A6A6A6',
        
    },
    cardContainer:{
        //height:250,
        width:160,
        //borderWidth:2,
        //borderColor:'white',
        backgroundColor:'#000000',
        borderRadius:5

    },
    currntDateStyle:{
        color:'#FFFFFF',
        marginVertical:10
    },
    textStyle:{
        color:'#FFFFFF',
       // marginVertical:2,
       
    },
      forBorder:{
        borderTopColor:'#FFFFFF',
        borderTopWidth:1,
        //marginHorizontal:12,
        // marginVertical:5
      }
})

export default styles;