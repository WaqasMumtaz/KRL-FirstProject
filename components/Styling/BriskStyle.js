import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
         //flexDirection:'row',
        backgroundColor:'red',
        marginHorizontal:20,
        justifyContent:'center'
    },
    cardStyle:{
        //flex:1,
        borderWidth:5,
        borderColor:'black',
        borderRadius:3,
        height:'30%',
        width:'100%'
    },
    cardChildOne:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:14,
    },
    iconSize:{
        width:18,
        height:18
    },
    heading:{
        fontFamily: "MontserratExtraBold",
        color:'#FFF'
    },
    imgsIcon:{
        height:18,
        width:18
    },
    cardChildTwo:{
        flexDirection:'row',
        borderWidth:2,
        borderColor:'black',
        borderRadius:3,
        height:'25%',
        width:'100%',
        backgroundColor:'black',
        justifyContent:'space-between'
    },

      
    // },
    // cardChildThree:{
    //     flex:1,
    //     backgroundColor:'white',
        
    // },
    // againCard:{
    //     flexDirection:'row',
    //     borderWidth:2,


    // }
})   

export default styles;