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
        //flex:0.5,
        height:'6%',
        //backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'black',
        fontFamily: "MontserratExtraBold",
    },
    arrowContainer:{
        //flex:0.2,
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
        //backgroundColor:'pink',
        marginVertical:25,
        flexDirection:'row'
    },
    bodyChildOne:{
       flex:1,
       //backgroundColor:'yellow',
       flexDirection:'row',
       flexWrap:'wrap'
    },
    bodyChildTwo:{
        flex:1,
        //backgroundColor:'black',
        flexDirection:'row',
       flexWrap:'wrap'
    },
    resultCardLeft:{
    //   borderWidth:5,
    //   borderColor:'white',
      borderRadius:3,
      backgroundColor:'black',
      height:'23%',
      width:'95%'
    },
    resultCardRight:{
        // borderWidth:5,
        // borderColor:'white',
        borderRadius:3,
        backgroundColor:'black',
        height:'23%',
        width:'95%',
        marginLeft:8
      },
    resultText:{
     marginTop:10,
     marginLeft:10,
     color:'#FFF',
    fontFamily:"MontserratExtraBold",
    },
    resultTextAmount:{
     marginTop:16,
     marginLeft:10,
     color:'#FF6200',
     fontFamily:'MontserratLight'
    },
    resultTextUnit:{
        marginLeft:10,
        color:'#a6a6a6',
        fontFamily:'MontserratLight'
    }
})

export default styles;