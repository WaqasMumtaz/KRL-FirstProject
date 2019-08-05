import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BriskScreen from '../BriskScreen';

const Sidecrunch = (props) => {
    return (
        <View style={styles.container}>
            <BriskScreen title="Side Crunch"
               increamentVal={props.increamentVal}
               decrementVal={props.decrementVal}
               //  label="Reps" value="reps" 
               backFunc={props.backFunc} 
               setAmount={props.setAmount}
               amount={props.amount}
               updateUnit={props.updateUnit}
               unit={props.unit}/>
        </View>
    )

}
export default Sidecrunch;

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
    }
})