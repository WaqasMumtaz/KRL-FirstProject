import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
// const screenWidth=Dimensions.get('window').width;
// const screenHeight=Dimensions.get('window').height;

const CaloriesSetupBtn = (props)=>{
  return(
      <View style={styles.mainContainer}>
              <View style={{flex:1}}></View>
              <TouchableOpacity style={styles.btnStyle} onPress={()=>{props.goToHome('BottomTabe')}}><Text style={{fontFamily: "MontserratExtraBold",color:'white'}}>Set Up & Use App</Text></TouchableOpacity>
              <View style={{flex:1}}></View>
      </View>
  )


}

export default CaloriesSetupBtn;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection:'row'      
    },
    btnStyle:{
        flex:2,
        height:40,
        justifyContent:'center',
        backgroundColor: '#FF7F50',
        alignItems:'center',
        borderRadius:5
        
    }
})