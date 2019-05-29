import React from 'react';
import { Text, View,StyleSheet} from 'react-native';
import BriskScreen from './BriskScreen';

const Bicepcurls=(props)=>{
return(
    <View style={styles.container}>
     <BriskScreen title="Bicep curls" label="Reps" value="reps" backFunc={props.backFunc}/>
    </View>
)

}
export default Bicepcurls;

const styles=StyleSheet.create({
    container:{
        flex:1.5,
        flexDirection:'row',
    }
})