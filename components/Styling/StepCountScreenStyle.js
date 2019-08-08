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
        backgroundColor:'#FFFFFF',
        marginHorizontal:40
    },
    headingContainer:{
        height:50
    },
    headingStyle:{
        fontFamily: "MontserratExtraBold",
        color: '#000000',
        marginVertical:10
        
    },
    dateContainer:{
        height:50,
        alignItems:'center'
    },
    stepCountContainer:{
         height:200,
         borderWidth:2,
         //borderColor:'#FFFFFF',
         marginHorizontal:30,
         marginTop:20,
         backgroundColor:'#000000',
         flexDirection:'row',
         justifyContent:'space-between',
         borderRadius:4


    },
    progressWhelContainer:{
        marginTop:50,
        marginLeft:20
    },
    stepCountData:{
        marginVertical:25,
        
    },
    graphContainer:{
       marginHorizontal:30,
       borderWidth:2,
       marginTop:20, 
       height:160,
       //borderColor:'white',
       backgroundColor:'#000000',
       borderRadius:4
    }
    
})

export default styles;