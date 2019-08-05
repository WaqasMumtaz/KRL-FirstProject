import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BriskScreen from '../BriskScreen';

const ReverseCrunches = (props) => {
    return (
        <View style={styles.container}>
            <BriskScreen title="Reverse Crunches"
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
export default ReverseCrunches;

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
    }
})