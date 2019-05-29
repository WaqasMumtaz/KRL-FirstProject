import React from 'react';
import { Text, View,StyleSheet} from 'react-native';
import BriskScreen from './BriskScreen';


const HighpacejoggingScreen=(props)=>{
return(
    <View style={styles.container}>
     <BriskScreen title="High paced jogging" label="Minutes" value="minutes" backFunc={props.backFunc}/>
    </View>
)

}
export default HighpacejoggingScreen;

const styles=StyleSheet.create({
    container:{
        flex:1.5,
        flexDirection:'row',
    }
})