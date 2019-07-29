import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/SetUpScreen1Style';
import TextInputs from '../textInputs/TextInputs';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import DatePicker from 'react-native-datepicker';
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

class Setupscreen1 extends React.Component {
    static navigationOptions = {

        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    };
    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            gender: '',
            dobValidation: false,
            genderValidation: false,
            male: false,
            female: false,
            date: "15-07-2019"
        }
    }
    getGender(gender) {
        if (gender == 'male') {
            this.setState({
                male: true,
                female: false,
                gender: 'male'
            })
        }
        else if (gender == 'female') {
            this.setState({
                male: false,
                female: true,
                gender: 'female'
            })
        }
    }

    nextStep = () => {
        const { dob, gender } = this.state;
        // const { navigate } = this.props.navigation;
        if (dob == '') {
            this.setState({
                dobValidation: true
            })
        }
        if (gender == '') {
            this.setState({
                genderValidation: true
            })
        }
        if (dob != '' && gender != '') {
            this.props.navigation.navigate('Setupscreen', {
                dob: dob,
                gender: gender,
            });
            // navigate('Setupscreen')
        }
    }

    render() {
        const { dobValidation, genderValidation, male, female } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Set Up Your App
                      </Text>
                        </View>
                        <View style={styles.paraContainer}>
                            <Text style={styles.paraStyle}>
                                GetFitAthletic needs the following into to help you with your fitness journey.
                      </Text>
                        </View>
                        <Text style={styles.textsStyle}>Date Of Birth</Text>
                        <View style={styles.dateOfBirthContainer}>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.dob} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate="01-01-2019"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ dob: date }) }}
                            />
                            {/* <TextInputs placeholder={'Tab to set...'} /> */}
                        </View>
                        {dobValidation ?
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.validationInstruction}>
                                    Please fill date of birth
                                    </Text>
                            </View>
                            : null}
                        {/* <View> */}
                        <Text style={styles.textsStyle}>Gender</Text>
                        <View style={styles.genderContainer}>
                            {/* <TextInput placeholder="Male" style={styles.genderInputStyleMale} />
                            <TextInput placeholder="Female" style={styles.genderInputStyleFemale} /> */}
                            <View style={styles.maleContainer}>
                                <TouchableOpacity
                                    style={male ? styles.clickBtnStyle : styles.maleTouchableOpacity}
                                    onPress={this.getGender.bind(this, 'male')}>
                                    <Text style={styles.maleTextStyle}>
                                        Male
                                        </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.maleContainer}>
                                <TouchableOpacity
                                    style={female ? styles.clickBtnStyle : styles.maleTouchableOpacity}
                                    onPress={this.getGender.bind(this, 'female')}>
                                    <Text style={styles.maleTextStyle}>
                                        Female
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {genderValidation ?
                            <View style={{marginVertical:3}}>
                                <Text style={styles.validationInstruction}>
                                    Please select the gender
                                    </Text>
                            </View>
                            : null}
                        {/* </View> */}
                        <View style={styles.btnContainer}>
                            {/* <Text>For Button</Text> */}
                            <CaloriesSetupBtn title="Next Step"
                                //  onPress={() => { navigate('Setupscreen') }} 
                                onPress={this.nextStep}
                                caloriesBtnStyle={styles.caloriesBtnStyle} />
                        </View>
                    </View>
                    <View style={styles.reserv}>
                        {/* <Text>
                            This Reserve Box
                      </Text> */}
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default Setupscreen1;

