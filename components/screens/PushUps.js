import React from 'react';
import { Text, View,StyleSheet} from 'react-native';
import BriskScreen from './BriskScreen';

const Pushups=(props)=>{
return(
    <View style={styles.container}>
     <BriskScreen title="Push ups" label="Reps" value="reps" backFunc={props.backFunc}/>
    </View>
)

}
export default Pushups;

const styles=StyleSheet.create({
    container:{
        flex:1.5,
        flexDirection:'row',
    }
})