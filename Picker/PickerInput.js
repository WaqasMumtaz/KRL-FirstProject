import React from 'react';
import {StyleSheet, Text, View,Picker  } from 'react-native';

class PickerInput extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user: '',

        }
        updateUser=(user)=>{
            this.setState({ user: user })
        }
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser} style={styles.pickerStyle} mode="dropdown">
                <Picker.Item label = "Inches" value = "inches" />
                <Picker.Item label = "Centimeter" value = "centimeter" />
            </Picker>
            <Text style = {styles.textStyle}>{this.state.user}</Text>
            </View>
        )
    }
}
export default PickerInput;

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
          flexDirection:'row',
          justifyContent:'center',
          marginTop:5
    //   backgroundColor:'#000000'
      
    },
    pickerStyle:{
        width:155,
        height:40,
         color:'white',
          backgroundColor:'gray'
    },
    textStyle:{
        fontSize: 30,
      alignSelf: 'center',
      color: 'red'
    }
})