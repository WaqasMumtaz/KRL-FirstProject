import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/MacroStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';

const { HeightDimension } = Dimensions.get('window');

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
            dob: '',
            age: '',
            gender: '',
            height: '',
            heightInch: '',
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
            userId: '',
            date: '',
            time: '',
            currentDate: '',
            currentMonth: '',
            currentYear: '',
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
            extreme: false,
            currentCalories: '',
            currentCarbohy: '',
            currentProteins: '',
            currentMass: '',
            showCurrentMacro: false,
            macroArray: [],
            macroResult: ''
        }
    }

    componentWillMount() {
        let monthNo = new Date().getMonth();
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `${monthNo + 1}`;
        }
        else {
            month = monthNo + 1;
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    userId: dataFromLocalStorage._id,
                    currentYear: year,
                    currentDate: date,
                    currentMonth: month,
                })
            }
        });
        this.getMacro();
    }
    getMacro = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.macroGet();
        });
    }

    calulateMacro = async () => {
        const { dob, gender, height, heightInch, currentWeight, goalWeight, currentWeightUnit, goalWeightUnit,
            activityLevel, tdeeObj, date, time, currentYear, currentDate, currentMonth, userId } = this.state;
        let age;
        let macroObj = {
            dob: dob,
            gender: gender,
            height: height,
            heightInch: heightInch,
            currentWeight: currentWeight,
            currentWeightUnit: currentWeightUnit,
            goalWeight: goalWeight,
            goalWeightUnit: goalWeightUnit,
            activityLevel: activityLevel,
            date: date,
            time: time,
            userId: userId
        };

        //conditions for validations
        if (dob == '') {
            this.setState({
                dobValidation: true
            })
        }
        else {
            this.setState({
                dobValidation: false
            })
        }
        if (gender == '') {
            this.setState({
                genderValidation: true
            })
        }
        else {
            this.setState({
                genderValidation: false
            })
        }
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
        if (heightInch == '') {
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
        if (activityLevel == '') {
            this.setState({
                activityLevelValidation: true
            })
        }
        else {
            this.setState({
                activityLevelValidation: false
            })
        }
        if (dob != '') {
            const dobYear = dob.slice(6, 10);
            age = currentYear - dobYear;
        }
        if (gender == 'male') {
            if (dob != '' && height != '' && heightInch != '' && currentWeight != '' && goalWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && goalWeightUnit != '' && goalWeightUnit != '0' && activityLevel != '') {
                const heightCentimeter = height * 30.48;
                const heightInchCentimeter = heightInch * 2.54;
                const totalHeightCentimeter = Math.round(heightCentimeter + heightInchCentimeter);
                let calculteCalries = 10 * currentWeight + 6.25 * totalHeightCentimeter - 5 * age + 5;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    // get tdee value
                    let tdee = calculteCalries * tdeeObj[activityLevel]
                    //calculate fat
                    let fatCalries = tdee * 0.25;
                    let fat = fatCalries / 9
                    //calculate protein
                    let proteinCalries = calculteCalries * 0.25;
                    let protein = proteinCalries / 4;
                    //calculate carbohydrate
                    let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
                    let carbohydrate = carbohydratesCalries / 4;
                    //convert to string 
                    let calries = Math.round(calculteCalries.toString());
                    //console.log('calries value >>>',calries)
                    let tde = tdee.toString()
                    let fatVal = Math.round(fat.toString());
                    let proteinVal = Math.round(protein.toString());
                    let carbohydratesVal = Math.round(carbohydrate.toString());

                    //set the state
                    this.setState({
                        calculteCalries: calries,
                        totalDEE: tde,
                        fatMass: fatVal,
                        proteins: proteinVal,
                        carbohydrates: carbohydratesVal
                    })
                    //add properties to object
                    macroObj.age = age;
                    macroObj.totalDEE = tde;
                    macroObj.fatMass = fatVal;
                    macroObj.calculteCalries = calries;
                    macroObj.proteins = proteinVal;
                    macroObj.carbohydrates = carbohydratesVal;
                    let dataUser = await HttpUtils.post('macrodata', macroObj)
                    console.log(dataUser, 'dataUser')
                }
            }
        }
        else if (gender == 'female') {
            if (dob != '' && height != '' && heightInch != '' && currentWeight != '' && goalWeight != '' &&
                currentWeightUnit != '' && currentWeightUnit != '0' && goalWeightUnit != '' && goalWeightUnit != '0' && activityLevel != '') {
                const heightCentimeter = height * 30.48;
                const heightInchCentimeter = heightInch * 2.54;
                const totalHeightCentimeter = Math.round(heightCentimeter + heightInchCentimeter);
                let calculteCalries = 10 * currentWeight + 6.25 * totalHeightCentimeter - 5 * age - 161;
                if (activityLevel == 'sedentary' || activityLevel == 'active' || activityLevel == 'lightActivity' || activityLevel == 'veryActive') {
                    // get tdee value
                    let tdee = calculteCalries * tdeeObj[activityLevel];
                    //calculate fat
                    let fatCalries = tdee * 0.25;
                    let fat = fatCalries / 9
                    //calculate protein
                    let proteinCalries = calculteCalries * 0.25;
                    let protein = proteinCalries / 4;
                    //calculate carbohydrate
                    let carbohydratesCalries = calculteCalries - (fatCalries + proteinCalries);
                    let carbohydrate = carbohydratesCalries / 4;
                    //convert to string 
                    let calries = Math.round(calculteCalries.toString());
                    let tde = tdee.toString();
                    let fatVal = Math.round(fat.toString());
                    let proteinVal = Math.round(protein.toString());
                    let carbohydratesVal = Math.round(carbohydrate.toString());

                    //set the state
                    this.setState({
                        calculteCalries: calries,
                        totalDEE: tde,
                        fatMass: fatVal,
                        proteins: proteinVal,
                        carbohydrates: carbohydratesVal
                    })
                    //add properties to object
                    macroObj.age = age;
                    macroObj.totalDEE = tde;
                    macroObj.fatMass = fatVal;
                    macroObj.calculteCalries = calries;
                    macroObj.proteins = proteinVal;
                    macroObj.carbohydrates = carbohydratesVal;
                    let dataUser = await HttpUtils.post('macrodata', macroObj)
                    console.log(dataUser, 'dataUser')
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
                moderate: false,
                sedentary: false,
                light: true,
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
                moderate: true,
                sedentary: false,
                light: false,
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
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) + 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) + 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
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
        const { height, heightInch, currentWeight, goalWeight } = this.state;
        if (value == 'height') {
            const heightNum = Number(height) - 1
            let heightVal = heightNum.toString()
            this.setState({
                height: heightVal
            })
        }
        else if (value == 'heightInch') {
            const heightInches = Number(heightInch) - 1
            let heightInchVal = heightInches.toString()
            this.setState({
                heightInch: heightInchVal
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

    macroGet = async () => {
        const { userId } = this.state;
        let userObj = {
            userId: userId
        }
        const specificMacro = await HttpUtils.post('getmacros', userObj);
        if (specificMacro.code == 200) {
            this.setState({
                macroArray: specificMacro.content
            }, () => {
                const userMacroData = this.state.macroArray;
                for (var i in userMacroData) {
                    this.setState({
                        showCurrentMacro: true,
                        currentCalories: userMacroData[i].calculteCalries,
                        currentCarbohy: userMacroData[i].carbohydrates,
                        currentProteins: userMacroData[i].proteins,
                        currentMass: userMacroData[i].fatMass
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    render() {
        const { dobValidation, genderValidation, heightValidation, currentWeightValidation, goalWeightValidation,
            heightUnitValidation, currentWeightUnitValidation, goalWeightUnitValidation, activityLevelValidation,
            male, female, moderate, sedentary, light, extreme, calculteCalries, fatMass, proteins, carbohydrates,
            dob, date, currentCalories, currentCarbohy, currentProteins, currentMass, showCurrentMacro 
        } = this.state;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: HeightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
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
                        {
                            showCurrentMacro ?
                                <View>
                                    <Text style={styles.currentMacroText}>Your Current Macro *</Text>
                                    <View style={styles.inputCaloriesContainer}>
                                        <TextInput placeholder={"e.g 1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne} value={currentCalories + ' Kcal calories'} />
                                        <TextInput placeholder={"e.g 149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} value={currentMass + ' g Carbohyderates'} />
                                        <TextInput placeholder={"e.g 107 g\Protein"} style={styles.inputCaloriesStyleThree} value={currentProteins + ' g Proteins'} />
                                        <TextInput placeholder={"e.g 51 g\nFat"} style={styles.inputCaloriesStyleFour} value={currentCarbohy + ' g Fat'} />
                                    </View>
                                </View>
                                :
                                null
                        }
                        <View style={styles.dateBirth}>
                            <Text style={styles.textStyle}>Date Of Birth</Text>
                        </View>
                        <View style={styles.ageInputContainer}>
                            <DatePicker
                                style={{ width: 200 }}
                                date={dob} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate={date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        width: 0,
                                        height: 0,
                                    },
                                    backgroundColor: 'white',
                                    opacity: 0.3
                                }}
                                onDateChange={(date) => { this.setState({ dob: date }) }}
                            />
                        </View>
                        {dobValidation ?
                            <View style={styles.validationContainer}>
                                <Text style={styles.validationInstruction}>
                                    Please Pick date of birth
                            </Text>
                            </View>
                            : null}
                        <Text style={styles.genderTextStyle}>Gender</Text>
                    </View>
                    <View style={styles.genderContainer}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={male ? styles.clickedMale : styles.maleTouchableOpacity} onPress={this.getGender.bind(this, 'male')}>
                                <Text style={styles.maleTextStyle}>
                                    Male
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={female ? styles.clickedFemale : styles.femaleContainer} onPress={this.getGender.bind(this, 'female')}>
                                <Text style={styles.maleTextStyle}>Female</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 30, marginTop: 3 }}>
                            {genderValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select the gender
                                </Text>
                                : null}
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 80, justifyContent: 'space-between' }}>
                            <Text style={styles.styleForLabel}>Height (fit)</Text>
                            <Text style={styles.styleForLabel}>Height (Inch)</Text>
                        </View>
                        <View style={styles.heightContainer}>
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

                            <View style={styles.inputContainer}>
                                <View style={styles.container}>
                                    <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                        onPress={this.decrementVal.bind(this, 'heightInch')}>
                                        <Image source={require('../icons/minus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                    <View style={styles.textInputContainer}>
                                        <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                            type="number"
                                            onChangeText={(height) => this.setState({ heightInch: height })}
                                            value={this.state.heightInch}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                        onPress={this.increamentVal.bind(this, 'heightInch')}>
                                        <Image source={require('../icons/plus-gray.png')} style={styles.forImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.showValidationContainer}>
                            {heightValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please fill your height fit
                                </Text>

                                : null}
                            {heightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select height inches
                                </Text>
                                : null}
                        </View>
                        <Text style={styles.styleForLabel}>Current Weight</Text>
                        <View style={styles.currentWeightContainer}>
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
                            <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 5, height: 40 }}>
                                <Picker selectedValue={this.state.currentWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'current weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.showValidationContainer}>
                            {currentWeightValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please fill your weight
                                </Text>
                                : null}
                            {currentWeightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select weight unit
                                </Text>
                                : null}
                        </View>
                        <Text style={styles.styleForLabel}>Goal Weight</Text>
                        <View style={styles.goalWeightContainer}>
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
                            <View style={{ borderRadius: 4, borderColor: '#e5e5e5', overflow: 'hidden', marginTop: 5, height: 40 }}>
                                <Picker selectedValue={this.state.goalWeightUnit}
                                    onValueChange={this.updateUnits.bind(this, 'goal weight Unit')}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.showValidationContainer}>
                            {goalWeightValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please fill your goal weight
                                </Text>
                                : null}
                            {goalWeightUnitValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select weight unit
                                </Text>
                                : null}
                        </View>
                        <Text style={styles.styleForLabel}>Activity Level</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={sedentary ? styles.clickSedetary : styles.sedetaryContainer}
                                onPress={this.activityLevel.bind(this, 'sedentary')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Sedentary
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={moderate ? styles.clickModerate : styles.moderateContainer}
                                onPress={this.activityLevel.bind(this, 'lightActivity')}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Light Activity
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <TouchableOpacity style={light ? styles.clickedLightStyle : styles.lightTouchableStyle}
                                onPress={this.activityLevel.bind(this, 'active')}>
                                <Text style={styles.lightTextStyle}>
                                    Active
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={extreme ? styles.clickedExtremTouchableStyle : styles.extremTouchableStyle}
                                onPress={this.activityLevel.bind(this, 'veryActive')}>
                                <Text style={styles.lightTextStyle}>
                                    Very Active
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.activityLevelInstruction}>

                            {activityLevelValidation ?
                                <Text style={styles.validationInstruction}>
                                    Please select activity level
                                </Text>
                                : null}
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.macroTextStyle}>Your Daily Macros*</Text>
                    </View>
                    <View style={styles.inputCaloriesContainer}>
                        <TextInput placeholder={"e.g 1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne} value={calculteCalries + ' Kcal calories'} />
                        <TextInput placeholder={"e.g 149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} value={fatMass + ' g Carbohyderates'} />
                        <TextInput placeholder={"e.g 107 g\Protein"} style={styles.inputCaloriesStyleThree} value={proteins + ' g Proteins'} />
                        <TextInput placeholder={"e.g 51 g\nFat"} style={styles.inputCaloriesStyleFour} value={carbohydrates + ' g Fat'} />
                    </View>
                    <View style={styles.lastParaContainer}>
                        <Text style={styles.lastParaStyle}>
                            *This is the daily calories limit as calculated by the app using the above infromation.
                            If your coach has set another limit for you, please enter it above.
                        </Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title='Calculate Macro'
                            caloriesBtnStyle={styles.caloriesBtnStyle}
                            onPress={this.calulateMacro}
                        />
                    </View>
                    <View style={{ flex: 2, marginBottom: 30 }}>
                    </View>
                </View>
            </ScrollView>
        )
    }

}

export default Macrocalculator;