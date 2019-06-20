import React from 'react';
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        flex:1,
        marginHorizontal:20,
        // width:screenWidth,
        // height:screenHight,
        //backgroundColor:'red'
    },
    headerIcon:{
        height:18,
        width:18
    },
    headerIconContainer:{
        marginRight:30,
        marginBottom:8
    },
    headingContainer:{
        // flex:0.25,
        //height:'7%',
        //backgroundColor:'pink'
    },
    headingStyle:{
        fontSize:20,
        color:'#4f4f4f',
        fontFamily: "MontserratExtraBold",
    },
    profilPicStyle:{
        width: 150,
        height: 150, 
        borderRadius: 150/2
    },
    profilPicContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop:15,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    nameContainer:{
        // borderWidth:2,
        // borderColor:'red',
        marginTop:15,
        padding:5,
    },
    nameStyle:{
         fontFamily:'MontserratMedium',
        // fontFamily: 'MontserratLight',
        color:'black'
    },
    userTitle:{
        // borderWidth:2,
        // borderColor:'green',
        justifyContent:'center',
        alignItems:'center',
        padding:5
    },
    userTitleStyle:{
        fontFamily: 'MontserratLight',
        color:'#4f4f4f',
    },
    inputLabelsStyle:{
        fontFamily: 'MontserratLight',
        color:'#4f4f4f',
    },
    emailContainer:{
        flex:1,
        marginTop:8
    },
    inputTextStyle:{
        flex: 1,
        fontFamily: 'MontserratLight',
        borderRadius:3,
        height: 40,
        backgroundColor: '#e5e5e5',
        paddingLeft: 16,
        marginTop:5,
      },
      passwrdContainer:{
        flex:1,
        marginTop:18
      },
      addressContainer:{
          flex:1,
          marginTop:18
      },
      contactNumberContainer:{
          flex:1,
          marginTop:18
      },
      genderContainer:{
          flex:1,
          marginTop:18
      },
      blankContainer:{
          flex:2,
          marginBottom:30
      },
      btnContainer:{
         flex:2, 
         marginTop:20,
      },
      caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },

})

export default styles;