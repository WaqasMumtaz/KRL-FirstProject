import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/MacroStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import InputImgsScreen from '../screens/InputImgs';
const { height } = Dimensions.get('window');

class Macrocalculator extends React.Component {
    static navigationOptions = () => ({

        headerStyle: {
            backgroundColor: 'white'
        },
        headerTintColor: 'gray'
    })
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            age: '',
            gender: '',
            height: '',
            currentWeight: '',
            goalWeight: '',
            heightUnit: '',
            currentWeightUnit: '',
            goalWeightUnit: '',
            activityLevel: '',
            calculteCalries: '',
            totalDEE: '',
            fatMass: '',
            proteins: '',
            carbohydrates: '',
            tdeeObj: { sedentary: 1.2, lightActivity: 1.375, active: 1.55, veryActive: 1.725 },
            dobValidation: false,
            genderValidation: false,
            heightValidation: false,
            currentWeightValidation: false,
            goalWeightValidation: false,
            heightUnitValidation: false,
            currentWeightUnitValidation: false,
            goalWeightUnitValidation: false,
            activityLevelValidation: false,
            male: false,
            female: false,
            moderate: false,
            sedentary: false,
            light: false,
            extreme: false
        }
    }
    calulateMacro = () => {
        const { age, gender, height, currentWeight, goalWeight, heightUnit, currentWeightUnit, goalWeightUnit,
            activityLevel, tdeeObj } = this.state
        if (age == '') {
            this.setState({
                dobValidation: true
            })
        }
        if (gender == '') {
            this.setState({
                genderValidation: true
            })
        }
        if (height == '') {
            this.setState({
                heightValidation: true
            })
        }
        if (currentWeight == '') {
            this.setState({
                currentWeightValidation: true
            })
        }
        if (goalWeight == '') {
            this.setState({
                goalWeightValidation: true
            })
        }
        if (heightUnit == '') {
            this.setState({
                heightUnitValidation: true
            })
        }
        if (currentWeightUnit == '') {
            this.setState({
                currentWeightUnitValidation: true
            })
        }
        if (goalWeightUnit == '') {
            this.setState({
                goalWeightUnitValidation: true
            })
        }
        if (activityLevel == '') {
            this.setState({
                activityLevelValidation: true
            })
        }

        if (gender == 'male') {
            if (age != '' && height != '' && currentWeight != '' && goalWeight != '' && heightUnit != '' &&
                currentWeightUnit != '' && goalWeightUnit != '' && activityLevel != '') {
                let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age + 5;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    let tdee = calculteCalries * tdeeObj[activityLevel]
                    let fatCalries = tdee * 0.25;
                    let fat = fatCalries / 9
                    let proteinCalries = calculteCalries * 0.25;
                    let protein = proteinCalries / 4;
                    let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
                    let carbohydrate = carbohydratesCalries / 4;
                    this.setState({
                        calculteCalries: calculteCalries,
                        totalDEE: tdee,
                        fatMass: fat,
                        proteins: protein,
                        carbohydrates: carbohydrate
                    })
                }
            }
        }
        else if (gender == 'female') {
            if (age != '' && height != '' && currentWeight != '' && goalWeight != '' && heightUnit != '' &&
                currentWeightUnit != '' && goalWeightUnit != '' && activityLevel != '') {
                let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age - 161;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    let tdee = calculteCalries * tdeeObj[activityLevel]
                    let fatCalries = tdee * 0.25;
                    let fat = fatCalries / 9
                    let proteinCalries = calculteCalries * 0.25;
                    let protein = proteinCalries / 4;
                    let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
                    let carbohydrate = carbohydratesCalries / 4;
                    this.setState({
                        calculteCalries: calculteCalries,
                        totalDEE: tdee,
                        fatMass: fat,
                        proteins: protein,
                        carbohydrates: carbohydrate
                    })
                }
            }
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
    activityLevel(activity) {
        if (activity == 'active') {
            this.setState({
                moderate: true,
                sedentary: false,
                light: false,
                extreme: false,
                activityLevel: 'active'
            })
        }
        else if (activity == 'sedentary') {
            this.setState({
                moderate: false,
                sedentary: true,
                light: false,
                extreme: false,
                activityLevel: 'sedentary'
            })
        }
        else if (activity == 'lightActivity') {
            this.setState({
                moderate: false,
                sedentary: false,
                light: true,
                extreme: false,
                activityLevel: 'lightActivity'
            })
        }
        else if (activity == 'veryActive') {
            this.setState({
                moderate: false,
                sedentary: false,
                light: false,
                extreme: true,
                activityLevel: 'veryActive'
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
    render() {
        const { dobValidation, genderValidation, heightValidation, currentWeightValidation, goalWeightValidation, heightUnitValidation,
            currentWeightUnitValidation, goalWeightUnitValidation, activityLevelValidation, male, female,
            moderate, sedentary, light, extreme, calculteCalries, fatMass, proteins, carbohydrates } = this.state;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Macro Calculator
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>Enter your height and weight below to re-calculate
                            your daily macro limit </Text>
                        </View>
                        <View style={styles.dateBirth}>
                            <Text style={styles.textStyle}>Age</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Tap to set..." placeholderTextColor="gray" style={styles.inputStyle}
                                onChangeText={(age) => this.setState({ age: age })} />
                        </View>
                        {dobValidation ?
                            <View>
                                <Text>
                                    Please fill age
                                    </Text>
                            </View>
                            : null}
                        <Text style={styles.genderTextStyle}>Gender</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <View style={styles.maleContainer}>
                            <TouchableOpacity style={male ? styles.clickBtnStyle : styles.maleTouchableOpacity} onPress={this.getGender.bind(this, 'male')}>
                                <Text style={styles.maleTextStyle}>
                                    Male
                                </Text>
                            </TouchableOpacity>
                            {genderValidation ?
                                <View>
                                    <Text>
                                        Please select the gender
                                    </Text>
                                </View>
                                : null}
                            <Text style={styles.heightStyle}>Height</Text>
                            <View style={styles.inputContainer}>
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'height')}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(height) => this.setState({ height: height })}
                                            value={this.state.height}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'height')}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {heightValidation ?
                                <View>
                                    <Text>
                                        Please fill your height
                                    </Text>
                                </View>
                                : null}
                            <Text style={styles.textStyle}>Current Weight</Text>
                            <View style={styles.inputContainer}>
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'currentWeight')}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(currentWeight) => this.setState({ currentWeight: currentWeight })}
                                            value={this.state.currentWeight}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'currentWeight')}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {currentWeightValidation ?
                                <View>
                                    <Text>
                                        Please fill your weight
                                    </Text>
                                </View>
                                : null}
                            <Text style={styles.textStyle}>Goal Weight</Text>
                            <View style={styles.inputContainer}>

                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'goalWeight')}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(goalWeight) => this.setState({ goalWeight: goalWeight })}
                                            value={this.state.goalWeight}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'goalWeight')}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {goalWeightValidation ?
                                <View>
                                    <Text>
                                        Please fill your goal weight
                                    </Text>
                                </View>
                                : null}
                            <Text style={styles.textStyle}>Activity Level</Text>
                            <TouchableOpacity style={sedentary ? styles.clickBtnStyle : styles.sedetaryContainer} onPress={this.activityLevel.bind(this, 'sedentary')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Sedentary
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={moderate ? styles.clickBtnStyle : styles.moderateContainer} onPress={this.activityLevel.bind(this, 'lightActivity')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Moderate
                                </Text>
                            </TouchableOpacity>
                            {activityLevelValidation ?
                                <View>
                                    <Text>
                                        Please select activity level
                                    </Text>
                                </View>
                                : null}
                        </View>
                        <View style={{ flex: 1, }}>
                            <TouchableOpacity style={female ? styles.clickBtnStyle : styles.femaleContainer} onPress={this.getGender.bind(this, 'female')}>
                                <Text style={styles.maleTextStyle}>Female</Text>
                            </TouchableOpacity>
                            <View><Text></Text></View>
                            <View style={{ marginTop: 44 }}>
                                <Picker selectedValue={this.state.heightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'height Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="Inches" value="inches" />
                                </Picker>
                            </View>
                            {heightUnitValidation ?
                                <View>
                                    <Text>
                                        Please select height unit
                                    </Text>
                                </View>
                                : null}
                            <View style={{ marginTop: 50 }}>
                                <Picker selectedValue={this.state.currentWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                            {currentWeightUnitValidation ?
                                <View>
                                    <Text>
                                        Please select weight unit
                                    </Text>
                                </View>
                                : null}
                            <View style={{ marginTop: 50 }}>
                                <Picker selectedValue={this.state.goalWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'goal weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                            {goalWeightUnitValidation ?
                                <View>
                                    <Text>
                                        Please select goal weight unit
                                    </Text>
                                </View>
                                : null}
                            <View style={{ marginTop: 42, marginLeft: 16 }}>
                                <TouchableOpacity style={light ? styles.clickBtnStyle : styles.lightTouchableStyle} onPress={this.activityLevel.bind(this, 'active')}>
                                    <Text style={styles.lightTextStyle}>
                                        Light
                                          </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={extreme ? styles.clickBtnStyle : styles.extremTouchableStyle} onPress={this.activityLevel.bind(this, 'veryActive')}>
                                    <Text style={styles.lightTextStyle}>
                                        Extreme
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.macroTextStyle}>Your Daily Macros*</Text>
                    </View>
                    <View style={styles.inputCaloriesContainer}>
                        {/* <Text style={{ borderWidth:2,borderColor:'black',color: '#4f4f4f', marginLeft: 20, marginVertical: 5,fontFamily: 'MontserratLight' }}>1640 Kcal{'\n'}Calories</Text> */}
                        <TextInput placeholder={"1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne} value={calculteCalries} />
                        <TextInput placeholder={"149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} value={fatMass} />
                        <TextInput placeholder={"107 g\Protein"} style={styles.inputCaloriesStyleThree} value={proteins} />
                        <TextInput placeholder={"51 g\nFat"} style={styles.inputCaloriesStyleFour} value={carbohydrates} />
                        {/* <Text style={{ color: '#4f4f4f', marginLeft: '20%', marginVertical: 5,fontFamily: 'MontserratLight' }}>159 g{'\n'}Carbohydrates</Text> */}
                    </View>
                    <View style={styles.lastParaContainer}>
                        <Text style={styles.lastParaStyle}>
                            *This is the daily calories limit as calculated by the app using the above infromation.
                            If your coach has set another limit for you, please enter it above.
                      </Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title='Set Up & Use App' caloriesBtnStyle={styles.caloriesBtnStyle} onPress={this.calulateMacro} />
                    </View>

                    <View style={{ flex: 2, marginBottom: 30 }}>

                    </View>
                </View>
            </ScrollView>

        )
    }

}

export default Macrocalculator;