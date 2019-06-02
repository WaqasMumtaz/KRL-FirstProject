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
        //backgroundColor:'red'
    },
    headingStyle:{
        fontSize:20,
        color:'black',
        fontFamily: "MontserratExtraBold",
    },
    arrowContainer:{
        flex:1,
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
        flex:0.9,
       // backgroundColor:'pink',
        flexDirection:'row',
        
    },
    // inputContainer:{
    //     flex:1,
    //     backgroundColor:'skyblue'
    // }
    inputTextStyle:{
        flex:1,
        fontFamily: 'MontserratLight',
        color: '#666666',
        height:40,
        borderRadius:3,
        backgroundColor:'gray',
        opacity:0.2
    },
    weightListsContainer:{
        flex:14,
        //backgroundColor:'pink',
        flexDirection:'row',
        flexWrap:'wrap',

    },
    weightListOne:{
    //    flex:0.25,
       marginTop:10,
    //    borderWidth:5,
    //    borderColor:'white',
       borderRadius:3,
       width:'100%',
       height:'15%',
       paddingHorizontal:15,
       paddingVertical:10 ,
       backgroundColor:'black'
    },
    weightNumberStyle:{
        color:'#FF6200',
        fontFamily:'MontserratLight'
    },
    weightTextStyle:{
        color:'#a6a6a6',
        fontFamily:'MontserratLight'
    },
    caloriesBtnStyle:{
        flex:3,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      }


})   

export default styles;