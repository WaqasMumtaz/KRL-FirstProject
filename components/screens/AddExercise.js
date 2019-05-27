import React from 'react';
import { Text, View, ScrollView, Button, Image,Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
const { height } = Dimensions.get('window');

class AddExercise extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/* <Text>Add Exercise Fields</Text> */}
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Add Exercise
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                        <Text>Today</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.bodyContainer}>
                   
                </View>
                </ScrollView>
            </View>
        )
    }

}

export default AddExercise;

