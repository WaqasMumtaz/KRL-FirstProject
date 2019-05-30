import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/ExerciseLogStyle';
const { height } = Dimensions.get('window');

class Exerciselog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Exercise Log
                            </Text>
                        </View>
                        <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                        <Text>Today</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.bodyChildOne}>
                            <TouchableOpacity style={styles.resultCardLeft}>
                                <Text style={styles.resultText}>
                                    Brisk Walk
                                </Text>
                                <Text style={styles.resultTextAmount}>
                                   35
                                </Text>
                                <Text style={styles.resultTextUnit}>
                                    minutes
                                </Text>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.bodyChildTwo}>
                        <TouchableOpacity style={styles.resultCardRight}>
                            <Text style={styles.resultText}>
                                Push Ups
                                </Text>
                                <Text style={styles.resultTextAmount}>
                                   24
                                </Text>
                                <Text style={styles.resultTextUnit}>
                                    Reps
                                </Text>

                                </TouchableOpacity>
                        </View>

                    </View>


                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default Exerciselog;

