import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop:20,
      width:screenWidth,
      height:screenHight
    },
    childContainer:{
      justifyContent:'flex-start',
     // backgroundColor: '#deb887',
      marginHorizontal:20
    },
    heading:{
      flexDirection:'row',
      marginTop:10
      //backgroundColor:'red'
    },
    headingText: {
      fontFamily: "MontserratExtraBold",
      fontSize:17,
      // textAlign: 'center',
      // margin: 10,
      color:'#000000'
    },
    itemsContainer:{
      height:'50%',
      // paddingVertical:15,
      // backgroundColor:'red',
      justifyContent:'space-between',
      marginTop:50
    },
    
    forText: {
      fontFamily: 'MontserratLight',
      fontSize:15
    },
  });

  export default styles;