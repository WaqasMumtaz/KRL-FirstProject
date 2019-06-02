import { Alert, StyleSheet,} from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red'
    },
    childContainer: {
        flex: 1,
        //backgroundColor: 'blue',
        marginLeft: 20,
        marginRight: 20
    },
    headingContainer: {
        flex: 0.5,
        //backgroundColor: 'yellow',
        // marginLeft:20,
        // marginRight:20

    },
    headingStyle: {
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        color: '#A6A6A6',
    },
    paraContainer: {
        flex: 0.25,
        //backgroundColor: 'pink',

    },
    paraStyle: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
    },
    dateOfBirthContainer: {
        flex: 0.3,
        //backgroundColor: 'skyblue',
        marginTop:10,
        justifyContent: 'center',
        flexDirection: 'row'

    },
    genderContainer: {
        flex: 0.5,
        //backgroundColor: 'green',
        marginTop:10,
        flexDirection: 'row',
        

    },
    genderInputStyleMale: {
         flex: 1,
        fontFamily: 'MontserratLight',
        color: '#666666',
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#808080',
        borderWidth: 2,
        marginRight: 20,
        // paddingLeft: 16,
        textAlign:'center'
        
    },
    genderInputStyleFemale: {
        flex: 1,
       fontFamily: 'MontserratLight',
       color: '#666666',
       //marginLeft: 20,
       height: 40,
       borderColor: 'gray',
       backgroundColor: '#808080',
       borderWidth: 2,
       //marginRight: 20,
    //    paddingLeft: 16,
       textAlign:'center'
       
   },
   textsStyle:{
    fontFamily: 'MontserratLight',
    color: '#A6A6A6',
   },
    btnContainer: {
        flex: 0.5,
        //backgroundColor: 'gray'
    },
    reserv: {
        flex: 2,
        //backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20

    },
    caloriesBtnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF6200',
        alignItems:'center',
        borderRadius:5
      }
})

export default styles;