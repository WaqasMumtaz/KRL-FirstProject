import React from 'react';
import {Text, View, TextInput, Picker, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import styles from '../Styling/SetUpScreenStyle';
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

class Setupscreen extends React.Component {
    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    })
    constructor(props) {
        super(props);
        this.state = {
            screenHeight: 0,
            user: '',
            height: '',
            currentWeight: '',
            goalWeight: '',
            heightUnit: '',
            currentWeightUnit: '',
            goalWeightUnit: '',
            heightValidation: false,
            currentWeightValidation: false,
            goalWeightValidation: false,
            heightUnitValidation: false,
            currentWeightUnitValidation: false,
            goalWeightUnitValidation: false,
        }
    }

    decrementVal(value) {
        const { height, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) - 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) - 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) - 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }

    increamentVal(value) {
        const { height, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) + 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'currentWeight') {
            const currentWeightNum = Number(currentWeight) + 1
            let currentWeightVal = currentWeightNum.toString()
            this.setState({
                currentWeight: currentWeightVal
            })
        }
        else if (value == 'goalWeight') {
            const goalWeightNum = Number(goalWeight) + 1
            let goalWeightVal = goalWeightNum.toString()
            this.setState({
                goalWeight: goalWeightVal
            })
        }
    }
    updateUnits(e, givenUnit) {
        if (e == "height Unit") {
            this.setState({
                heightUnit: givenUnit
            })
        }
        else if (e == 'current weight Unit') {
            this.setState({
                currentWeightUnit: givenUnit
            })
        }
        else if (e == 'goal weight Unit') {
            this.setState({
                goalWeightUnit: givenUnit
            })
        }
    }
    lastStep = () => {
        const { height, currentWeight, goalWeight, heightUnit, currentWeightUnit, goalWeightUnit } = this.state
        const { dob, gender, date, time, userId } = this.props.navigation.state.params;
        if (height == '') {
            this.setState({
                heightValidation: true
            })
        }
        else {
            this.setState({
                heightValidation: false
            })
        }
        if (currentWeight == '') {
            this.setState({
                currentWeightValidation: true
            })
        }
        else {
            this.setState({
                currentWeightValidation: false
            })
        }
        if (goalWeight == '') {
            this.setState({
                goalWeightValidation: true
            })
        }
        else {
            this.setState({
                goalWeightValidation: false
            })
        }
        if (heightUnit == '' || heightUnit == '0') {
            this.setState({
                heightUnitValidation: true
            })
        }
        else {
            this.setState({
                heightUnitValidation: false
            })
        }
        if (currentWeightUnit == '' || currentWeightUnit == '0') {
            this.setState({
                currentWeightUnitValidation: true
            })
        }
        else {
            this.setState({
                currentWeightUnitValidation: false
            })
        }
        if (goalWeightUnit == '' || goalWeightUnit == '0') {
            this.setState({
                goalWeightUnitValidation: true
            })
        }
        else {
            this.setState({
                goalWeightUnitValidation: false
            })
        }
        if (height != '' && currentWeight != '' && goalWeight != '' && heightUnit != '' && currentWeightUnit != '' && goalWeightUnit != '') {
            this.props.navigation.navigate('LastSetUpScreen', {
                dob: dob,
                gender: gender,
                height: height,
                currentWeight: currentWeight,
                goalWeight: goalWeight,
                heightUnit: heightUnit,
                currentWeightUnit: currentWeightUnit,
                goalWeightUnit: goalWeightUnit,
                date: date,
                time: time,
                userId: userId
            });
        }
    }

    render() {
        const { heightValidation, currentWeightValidation, goalWeightValidation, heightUnitValidation, currentWeightUnitValidation,
            goalWeightUnitValidation, heightUnit } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.childContainer}>
                    <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                        <View style={styles.heading}>
                            <Text style={styles.headingStyle}>Set Up Your App</Text>
                        </View>
                        <View style={styles.paraGraph}>
                            <Text style={styles.paraGraphStyle}>GetFitAthletic needs the following info to help you with your fitness journey</Text>
                        </View>
                        <View style={styles.labelsContainer}>
                            <Text style={styles.leftInputLabelStyle}>Height</Text>
                            <Text style={styles.rightInputLabelStyle}>Unit</Text>
                        </View>
                        <View style={styles.inputFieldOne}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne}
                                    activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'height')}
                                >
                                <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(height) => this.setState({ height: height })}
                                    value={this.state.height}
                                />
                                <TouchableOpacity
                                    style={styles.touchableOpacityTwo}
                                    activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'height')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.heightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'height Unit')}
                                    style={styles.pickerStyle} headerTintColor='white'>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {heightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your height
                                    </Text>
                                </View>
                                : null}
                            {heightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please select height unit
                                     </Text>
                                </View>
                                : null}
                        </View>
                        <View style={styles.weightLabelContainer}>
                            <Text style={styles.leftInputLabelStyle}>Current Weight</Text>
                            <Text style={styles.rightWeightUnitLabelInput}>Unit</Text>
                        </View>
                        <View style={styles.inputFieldTwo}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'currentWeight')}
                                >
                                <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(currentWeight) => this.setState({ currentWeight: currentWeight })}
                                    value={this.state.currentWeight}
                                />
                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'currentWeight')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={this.state.currentWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {currentWeightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your weight
                                    </Text>
                                </View>
                                : null}
                            {currentWeightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={[styles.validationInstruction, styles.rightValidationHieghtAndCurrentWeight]}>
                                        Please select weight unit
                                    </Text>
                                </View>
                                :
                                null}
                        </View>
                        <View style={styles.weightLabelContainer}>
                            <Text style={styles.leftInputLabelStyle}>Goal Weight</Text>
                            <Text style={styles.rightGoalWeightUnitLabel}>Unit</Text>
                        </View>
                        <View style={styles.inputFieldThree}>
                            <View style={styles.inputFieldOneChild}>
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementVal.bind(this, 'goalWeight')}
                                >
                                    <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <TextInput keyboardType='numeric' maxLength={3} placeholder='0'
                                    style={styles.inputTextStyle}
                                    type="number"
                                    onChangeText={(goalWeight) => this.setState({ goalWeight: goalWeight })}
                                    value={this.state.goalWeight}
                                />

                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentVal.bind(this, 'goalWeight')}
                                >
                                    <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={this.state.goalWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'goal weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            {goalWeightValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={styles.validationInstruction}>
                                        Please fill your goal weight
                                    </Text>
                                </View>
                                : null}
                            {goalWeightUnitValidation ?
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <Text style={[styles.validationInstruction, styles.rightGoalWeight]}>
                                        Please select goal weight unit
                                    </Text>
                                </View>
                                : null}
                        </View>
                        <View style={styles.buttonContainer}>
                            <CaloriesSetupBtn title='Last Step'
                                onPress={this.lastStep}
                                // onPress={() => navigate('LastSetUpScreen')} 
                                caloriesBtnStyle={styles.caloriesBtnStyle} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default Setupscreen;

