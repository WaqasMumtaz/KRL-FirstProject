import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity} from 'react-native';
import AnimatedProgressWheel from 'react-native-progress-wheel';



const Wheelspiner =()=>{
    return(
        <View style={styles.container}>
        <AnimatedProgressWheel 
    size={65} 
    width={10} 
    color={'#FF6200'}
    progress={60}
    backgroundColor={'gray'}
    animateFromValue={0}
    fullColor={'#FF6200'}
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