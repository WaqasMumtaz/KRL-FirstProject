import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../Styling/ExerciseLogStyle';
const { height } = Dimensions.get('window');

class Exerciselog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
    }
    componentDidMount() {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        this.setState({
            date: date + '/' + month + '/' + year,
            time: hours + ':' + min + ':' + sec,
            // userId: dataFromLocalStorage._id
        })
    }
    render() {
        const { date } = this.state;
        const { navigation } = this.props;
        console.log(navigation, 'navigation')
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
                            {/* <Text>Today</Text> */}
                            <DatePicker
                                style={{ width: 200 }}
                                date={date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate={date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                // customStyles={{
                                //     // dateIcon: {
                                //     //     position: 'absolute',
                                //     //     left: 0,
                                //     //     top: 4,
                                //     //     marginLeft: 0
                                //     // },
                                //     dateInput: {
                                //         marginLeft: 36
                                //     }
                                // }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                        </View>
                        <View style={styles.bodyContainer}>
                            <View style={styles.bodyChildOne}>
                                <TouchableOpacity style={styles.resultCardLeft}>
                                    <Text style={styles.resultText}>
                                        {navigation.state.params.exerciseName}
                                    </Text>
                                    <Text style={styles.resultTextAmount}>
                                        {navigation.state.params.exerciseAmount}
                                    </Text>
                                    <Text style={styles.resultTextUnit}>
                                        {navigation.state.params.exerciseUnit}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={styles.bodyChildTwo}>
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
                            </View> */}

                        </View>


                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default Exerciselog;

