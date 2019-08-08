import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity} from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { tsPropertySignature } from '@babel/types';



const Wheelspiner =(props)=>{
    return(
        <View style={styles.container}>
        <AnimatedProgressWheel 
    size={props.size} 
    width={props.width} 
    color={props.color}
    progress={props.progress}
    backgroundColor={props.backgroundColor}
    animateFromValue={props.animateFromValue}
    fullColor={props.fullColor}
/>
    </View>
    )


}

export default Wheelspiner;


const styles=StyleSheet.create({
      container:{
          flex:1,
        //   justifyContent:'center',
        //   alignItems:'center'
      }
})