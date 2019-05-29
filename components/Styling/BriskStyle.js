import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
         //flexDirection:'row',
        //backgroundColor:'red',
        //marginHorizontal:20,
        //justifyContent:'center'
    },
    cardStyle:{
        //flex:,
        // borderWidth:5,
        backgroundColor:'black',
        borderBottomWidth:0,
        //borderColor:'yellow',
        //borderRadius:3,
        height:'20%',
        //width:'100%'
    },
    cardChildOne:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:14,
    },
    iconSize:{
        width:18,
        height:18,
        marginRight:8
    },
    heading:{
        fontFamily: "MontserratExtraBold",
        color:'#FFF',
        marginLeft:12,
        // paddingBottom:15
    },
    imgsIcon:{
        height:18,
        width:18,
        //backgroundColor:'white',
        
    },
    cardChildTwo:{
        //flex:0.5,
        flexDirection:'row',
         //borderWidth:5,
         //borderColor:'red',
        //borderRadius:3,
         height:'25%',
        // width:'100%',
        backgroundColor:'black',
        justifyContent:'space-between',
        //opacity:0.6,
        marginBottom:3
    },
    pickerStyle:{
        width:140,
        height:40,
         color:'white',
          //backgroundColor:'',
          opacity:0.9,
         marginLeft:5 
    },
    labelTextContainer:{
        flexDirection:'row',
        backgroundColor:'black'
    },
    labelTextAmountStyle:{
        marginLeft:'5%',
        fontFamily: 'MontserratLight',
        color: '#A6A6A6',
        marginTop:5
    },
    labelUnitStyle:{
        marginLeft:'30%',
        fontFamily: 'MontserratLight',
        color: '#A6A6A6',
        marginTop:5
    },
    cardChildTwoSiblingContainer:{
        backgroundColor:'white',
        opacity:0.3,
         height: '80%', 
         width: '43%',
          marginTop: 3, 
          flexDirection: 'row',
          alignItems:'center',
          marginLeft:12,
          justifyContent:'center' 
    },
    minusImgContainer:{
        height: 40,
         width: 35, 
         justifyContent: 'center',
          paddingLeft: 5
    },
    inputFieldStyle:{
        height: 40,
        width: '47%', 
        textAlign: 'center',
        color:'white'
    },
    plusImgStyle:{
        height: 40, 
        width: 32, 
        justifyContent: 'center',
    },
    pickerContainer:{
        backgroundColor:'white',
        opacity:0.3, 
        height: '80%', 
        width: '43%', 
        marginTop: 3,
        marginRight:10, 
        flexDirection: 'row',
        alignItems:'center'  
    }
})   

export default styles;