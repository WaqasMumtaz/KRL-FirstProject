import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20,
        //  width:screenWidth,
        //  height:screenHight,
        //backgroundColor:'yellow'
    },
    headingContainer:{
        height:'8%',
        //backgroundColor:'red',
        flexDirection:'row',
        marginTop:15
    
    },
    textStyleOne:{
        color:'black',
        fontFamily: "MontserratExtraBold",
        fontSize:20
    },
    textStyleTwo:{
        color:'black',
        fontFamily: "MontserratExtraBold",
        fontSize:20,
        marginLeft:10
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
        backgroundColor:'skyblue',
        flexDirection:'row'

    },
    cardLeft:{
        flex:1,
        backgroundColor:'yellow',
        marginRight:10,
    },
    cardRight:{
        flex:1,
        backgroundColor:'pink',
        marginLeft:10
    },
    weeklyStepWalk:{
        //borderWidth:2,
        //borderColor:'black',
        backgroundColor:'black',
        borderRadius:3,
        height:220
    },
    weightStatus:{
        borderWidth:2,
        borderColor:'black',
        marginTop:15,
        height:260,
        // marginBottom:

    },
    headingText:{
     marginLeft:12,
     marginTop:12,
     color:'white',
    fontFamily: "MontserratExtraBold",  
    fontSize:20  
    },
    spinerContainer:{
        height:70,
        marginLeft:12,
        marginTop:10
    },
    resultContainer:{
        flexDirection:'row',
    //    height:'6%',
       //backgroundColor:'red',
       marginLeft:14,
       marginTop:8
   },
   statusGraphContainer:{
    marginTop:15
   } ,
   midBox:{
       borderTopWidth:1,
    //    width:15
       marginHorizontal:20
   },
   borderLines1:{
       borderWidth:1,
       height:80,
       width:10,
   }

})

export default styles;