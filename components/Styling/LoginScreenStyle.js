
import { Alert, StyleSheet,Dimensions,Platform} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles =StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: screenWidth,
        backgroundColor: '#000000'
    
      },
      loginTextContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      textLogin: {
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        // fontSize: 23,
        color: '#A6A6A6',
        marginLeft: 20
      },
      logoContainer: {
        flex: 2,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
      },
      paraContainer: {
        flex: 1,
        //backgroundColor:'blue',
        flexWrap: 'wrap',
        flexDirection: 'row',
    
      },
      paraText: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        marginLeft: 20,
        marginRight: 20
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
        marginLeft: 20,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 2,
        marginRight: 20,
        paddingLeft: 16,
        opacity:0.3
      },
      errorInput:{
        borderWidth:2,
        borderColor:'red',
        borderRadius:2
     },
      loginButtonContainer: {
        flex: 2,
        //backgroundColor:'pink',
        flexDirection: 'row',
        //  alignItems:'flex-start',
        justifyContent: 'center',
      },
      loginButton: {
        fontSize: 16,
        //fontWeight: "bold",
        fontFamily: "MontserratExtraBold",
        backgroundColor: '#FF6200',
        color: '#FFF',
        borderWidth: 2,
        //borderColor: '#FF6200',
        textAlign: 'center',
        borderRadius: 7,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50
    
      },
      forImages: {
        flex: 1,
        height: 100,
        width: 140,
        alignSelf: 'stretch',
        // marginBottom: 4
    
      },
      textsStyles: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
        marginLeft: 20
      },
      resetPassContainer: {
        flex: 2,
        //backgroundColor:'skyblue',
        //  flexDirection:'row',
        //  justifyContent:'flex-start'
    
    
      },
      resetPasswrdTextStyle: {
        fontFamily: 'MontserratMedium',
        color: '#FF6200',
        marginLeft: 20
      },
      btnContainer: {
        flex: 1,
        //backgroundColor: '#794044',
        flexDirection: 'row',
        justifyContent: 'center'
      },
      accountText: {
        // fontSize:23,
        fontFamily: 'MontserratLight',
        color: '#A6A6A6'
      },
      registerText: {
        // fontSize:23,
        fontFamily: 'MontserratMedium',
        color: '#FF6200',
        
      },
      passwrdInstructionContainer:{
        //backgroundColor:'white',
        marginVertical:8,
        marginHorizontal:20
    },
    instructionStyle:{
      fontSize:11,
      fontFamily:'MontserratLight',
      color:'#FF6200'
    },
    
})

export default styles;