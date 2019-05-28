import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
const { height } = Dimensions.get('window');

class AddExercise extends React.Component {
    static navigationOptions = {
        headerStyle: {
            headerTintColor: 'black'
        }
    };
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
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

                    <View style={styles.bodyContainer}>
                        <TextInput placeholder="Search exercise" placeholderTextColor="black" style={styles.inputFieldStyle} />
                        
                    </View>
                    <View style={styles.listsContainer}>
                      <TouchableOpacity><Text style={styles.listsTextStyle}>Brisk Walk</Text></TouchableOpacity>
                      <TouchableOpacity><Text style={styles.listsTextStyle}>High paced jogging</Text></TouchableOpacity>
                      <TouchableOpacity><Text style={styles.listsTextStyle}>Push ups</Text></TouchableOpacity>    
                      <TouchableOpacity><Text style={styles.listsTextStyle}>Bicep curls</Text></TouchableOpacity>   
                    </View>

                </View>
                <View style={{flex:1.2}}>

                </View>
            </ScrollView>

        )
    }

}

export default AddExercise;

