
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';


const styles =StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red',
        marginLeft: 20,
        marginRight: 20
    },
    signUpTextContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop:10
    },
    signUpText: {
        fontFamily: "MontserratExtraBold",
         fontSize:20,
        color: '#A6A6A6',
    },
    logoContainer: {
        flex: 1,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    forImages: {
        flex: 1,
        height: 100,
        width: 120,
        alignSelf: 'stretch',
        // marginBottom: 4
    },
    paraContainer: {
        flex: 1,
        //backgroundColor:'blue',
        marginVertical:10,
        flexWrap: 'wrap',
        flexDirection: 'row',
    
      },
      paraText: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20,
        // marginRight: 20
      },
    
      inputFields: {
        flex: 1,
        //backgroundColor:'gray',
        flexDirection: 'row',
        justifyContent: 'center',
    
    
      },
      inputTexts: {
        flex: 1,
        fontFamily: 'MontserratLight',
        color: '#666666',
        // fontSize: 23,
        //marginLeft: 20,
        height: 40,
        //borderColor: 'gray',
        backgroundColor: 'white',
        borderRadius: 2,
        //marginRight: 20,
        paddingLeft: 16,
        opacity:0.3
      },
      errorInput:{
          borderWidth:3,
          borderColor:'red',
      },
      textsStyles: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        // marginLeft: 20
      },
      buttonContainer:{
        flex:2,
        marginTop:10
    },
      accountLinkContainer:{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical:20,
          //backgroundColor:'white',
          //alignItems:'center'
        
      },
      
      accountText:{
        // fontSize:23,
        fontFamily:'MontserratLight',
        color:'#A6A6A6'
      },
      registerText:{
        // fontSize:23,
        fontFamily:'MontserratMedium',
        color:'#FF6200'
      },
      caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      },
      passwrdInstructionContainer:{
          //backgroundColor:'white',
          marginVertical:8
      },
      instructionStyle:{
        fontSize:11,
        fontFamily:'MontserratLight',
        color:'#FF6200'
      },
      passMatchContainer:{
        marginVertical:8,
        alignItems:'center',
      },
      passNotMatchStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
      },
      spinerContainer:{
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        padding: 10
      },
      passMatchStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'green'
      },
      emailExistContainer:{
        marginVertical:8,
        alignItems:'center',
      },
      emailNotExistStyle:{
        fontSize:12,
        fontFamily:'MontserratLight',
        color:'#FF6200'
      }


})

export default styles;