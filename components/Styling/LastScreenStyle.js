import React from 'react';
import { Alert, StyleSheet,} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        marginHorizontal:20
    },
    headingContainer:{
        flex:0.3,
        backgroundColor:'skyblue',

    },
    headingStyle:{
        fontSize: 20,
        fontFamily: "MontserratExtraBold",
        color: '#A6A6A6',
    },
    paraContainer: {
        flex: 0.25,
        backgroundColor: 'pink',

    },
    paraStyle: {
        fontFamily: 'MontserratLight',
        // fontSize: 23,
        color: '#A6A6A6',
    },
    activityContainer:{
        flex:0.3,
        justifyContent:'space-between',
        backgroundColor:'gray',
        flexDirection:'row'
    },
    scndActivity:{
        flex:0.5,
        justifyContent:'space-between',
        backgroundColor:'purple',
        flexDirection:'row'
    },
    macrosContainer:{
        flex:2,
        backgroundColor:'yellow'
    },
    btnContainer:{
        flex:1,
        backgroundColor:'green'
    },
    touchOpacityStyle:{
        borderWidth:2,
        height:100,
        width:150,
        borderBottomColor:'red',
        borderRadius:5
    }
    
})

export default styles;

