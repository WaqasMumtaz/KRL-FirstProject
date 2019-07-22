import React from 'react';
import { Alert, StyleSheet,Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight =Dimensions.get('window').height;



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: screenWidth,
        backgroundColor: 'black'
        // height: height,
        //  justifyContent:'space-between',
        //  justifyContent:'flex-start'
    },
    // childContainer: {
    //     flex: 4,
    //     backgroundColor: 'black',
    // },
    heading: {
        flex: 3,
        //backgroundColor: 'black'
    },
    headingStyle: {
        fontFamily: "MontserratExtraBold",
        fontSize: 20,
        color: '#A6A6A6',
        marginLeft: 20,

    },
    paraGraph: {
        flex: 2,
        marginTop: 5
        //backgroundColor: '#8397b3'
    },
    paraGraphStyle: {
        color: 'white',
        marginLeft: 20,
        fontFamily: 'MontserratLight',
    },
    inputFieldOne: {
        flex: 2,
        //backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldOneStyle: {
        color: 'white',
        marginLeft: 20
    },
    inputFieldTwo: {
        flex: 2,
        // backgroundColor: '#7fff8e',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldTwoStyle: {
        color: 'white',
        marginLeft: 20
    },
    inputFieldThree: {
        flex: 2,
        //backgroundColor: '#008080',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputFieldThreeStyle: {
        color: 'white',
        marginLeft: 20
    },
    textInputOne: {
        flex: 3,
        //backgroundColor: '#f8988b',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textInputOneStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20
    },
    textInputStyle: {
        flex: 1,
        fontFamily: 'MontserratLight',
        marginLeft: 20,
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#808080',
        borderWidth: 2,
        marginRight: 20,
        paddingLeft: 16,
        marginTop: 7,
    },
    textInputTwo: {
        flex: 3,
        //backgroundColor: '#038ff9',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textInputTwoStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20
    },
    lastParaGraph: {
        flex: 2,
        //backgroundColor: '#ffd39b',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    lastParaGraphStyle: {
        color: 'white',
        fontFamily: 'MontserratLight',
        marginLeft: 20,
        marginRight: 20
    },
    buttonContainer: {
        flex: 2,
        //backgroundColor: '#794044',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainerStyle: {
        flex: 1,
    },

    // reserveScreen: {
    //     flex: 2,
    //     backgroundColor: 'white'
    // },
    // scrollViewStyle: {

    // },
    pickerStyle: {
        width: 150,
        height: 40,
        marginTop: 5,
        color: '#A6A6A6',
        backgroundColor: 'white',
        opacity: 0.3

    },
    textInputStyleParent: {
        flex:1,
        height: 40,
        textAlign: 'center', 
        backgroundColor: '#e5e5e5',
    },
    touchableOpacityOne: {
        flex: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor: 'gray',
        paddingLeft: 10,
        height: 40,
        opacity: 0.6


    },
    touchableOpacityTwo: {
        flex: 1,
        padding: 5,
        marginVertical: 5,
        alignItems: 'flex-end',
        backgroundColor: 'gray',
        paddingRight: 10,
        marginRight: 12,
        height: 40,
        opacity: 0.6
    },
    caloriesBtnStyle: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#FF6200',
        alignItems: 'center',
        borderRadius: 5
    },
    inputContainer:{
        flex:0.5,
        //height:'10%',
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:5,
        //backgroundColor:'orange'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
        // width: screenWidth,
        // height: screenHeight
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 5,
        //borderRadius:2
    },
    forImg: {
        width: 16,
        height: 16,
        marginVertical: 5

    },
})