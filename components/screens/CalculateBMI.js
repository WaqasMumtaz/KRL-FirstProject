import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker, StyleSheet } from 'react-native';
import styles from '../Styling/BMICalculatorStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import InputImgsScreen from '../screens/InputImgs';
const { height } = Dimensions.get('window');

class BMICalculator extends React.Component {
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
            height: 0,
            weight: 0,
            bmi: '',
            heightUnit: '',
            weightUnit: '',
            showMgs: '',
            mgs: false,
        }
    }
    //increament the  height
    increamentHeight = () => {
        const height = Number(this.state.height) + 1
        let heightVal = height.toString()
        this.setState({
            height: heightVal
        })
    }
    //increament the  Weight
    increamentWeight = () => {
        const weight = Number(this.state.weight) + 1
        let weightVal = weight.toString()
        this.setState({
            weight: weightVal
        })
    }
    // decrement the Height
    decrementHeight = () => {
        const height = Number(this.state.height) - 1
        let heightVal = height.toString()
        this.setState({
            height: heightVal
        })
    }
    // decrement the weight
    decrementWeight = () => {
        const weight = Number(this.state.weight) - 1
        let weightVal = weight.toString()
        this.setState({
            weight: weightVal
        })
    }
    //update height unit
    updateHeight = (e) => {
        this.setState({
            heightUnit: e
        })
    }
    //update Weight unit
    updateWeight = (e) => {
        this.setState({
            weightUnit: e
        })
    }

    //calculate the BMI
    calculateBmi = () => {
        const { height, weight, heightUnit, weightUnit } = this.state;
        let bmiValue
        if (heightUnit == 'inches' && weightUnit == 'pound') {
            bmiValue = (weight / height / height) * 703
            let bmiVal = bmiValue.toString();
            this.setState({
                bmi: bmiVal,
                mgs: false
            })
        }
        else if (heightUnit == 'centimeter' && weightUnit == 'kg') {
            bmiValue = (weight / height / height) * 10000
            let bmiVal = bmiValue.toString();
            this.setState({
                bmi: bmiVal,
                mgs: false
            })
        }
        else if (heightUnit == 'inches' && weightUnit == 'kg') {
            this.setState({
                showMgs: "Select Weight Unit In Pounds",
                mgs: true,
                bmi: ''
            })
        }
        else if (heightUnit == 'centimeter' && weightUnit == 'pound') {
            this.setState({
                showMgs: "Select Weight Unit In KG,s",
                mgs: true,
                bmi: ''
            })
        }
    }
    render() {
        const { showMgs, mgs } = this.state;
        return (
            // <View style={styles.mainContainer}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.mainContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            BMI Calculator
                            </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>Enter your height and weight below to calculate your BMI </Text>
                    </View>
                    <View style={styles.inputMainContainer}>
                        <View style={styles.leftContainer}>
                            <View style={styles.container}>
                                <Text style={styles.textStyle}>Height</Text>
                                {/* <InputImgsScreen
                                    iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                    getHeightWeight={this.getHeightWeight.bind(this, 'height')}
                                    increamentValue={this.increamentValue.bind(this, 'height')}
                                    decreamentValue={this.decreamentValue.bind(this, 'height')}
                                    // height={height}
                                // increamentValue = {this.increamentValue}
                                // decreamentValue = {this.decreamentValue}
                                /> */}
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementHeight}
                                >
                                    <Image source={require('../icons/minus.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <View style={styles.textInputContainer}>
                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                        type="number"
                                        onChangeText={(height) => this.setState({ height: height })}
                                        value={this.state.height}
                                    />
                                </View>
                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentHeight}>
                                    <Image source={require('../icons/plus.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.textStyle}>Weight</Text>
                                {/* <InputImgsScreen
                                    iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                    getHeightWeight={this.getHeightWeight.bind(this, 'weight')}
                                    increamentValue={this.increamentValue.bind(this, 'weight')}
                                    decreamentValue={this.decreamentValue.bind(this, 'weight')}
                                /> */}
                                <TouchableOpacity style={styles.touchableOpacityOne} activeOpacity={0.8}
                                    onPress={this.decrementWeight}>
                                    <Image source={require('../icons/minus.png')} style={styles.forImg} />
                                </TouchableOpacity>
                                <View style={styles.textInputContainer}>
                                    <TextInput keyboardType='numeric' maxLength={3} placeholder='0' style={styles.textInputStyleParent}
                                        type="number"
                                        onChangeText={(weight) => this.setState({ weight: weight })}
                                        value={this.state.weight}
                                    />
                                </View>
                                <TouchableOpacity style={styles.touchableOpacityTwo} activeOpacity={0.8}
                                    onPress={this.increamentWeight}>
                                    <Image source={require('../icons/plus.png')} style={styles.forImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.nuitTextStyleOne}>Unit</Text>
                            <View style={styles.pickerContainerOne}>
                                <Picker selectedValue={this.state.heightUnit}
                                    onValueChange={this.updateHeight}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                            <Text style={styles.nuitTextStyleTwo}>Unit</Text>
                            <View style={styles.pickerContainerTwo}>
                                <Picker selectedValue={this.state.weightUnit}
                                    onValueChange={this.updateWeight}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label='Select an option...' value='0' />
                                    <Picker.Item label="KG" value="kg" />
                                    <Picker.Item label="Pound" value="pound" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View>
                        {mgs ?
                            <Text>
                                {showMgs}
                            </Text>
                            : null}
                    </View>
                    <Text style={styles.bmiTextStyle}>BMI</Text>
                    <View style={styles.bmiInputContainer}>
                        <TextInput placeholder="c.g 22"
                            placeholderTextColor="#4f4f4f"
                            style={styles.inputStyle}
                            value={this.state.bmi}
                        />
                    </View>
                    <Button title='Calculate' onPress={this.calculateBmi}>
                    </Button>
                </View>
            </ScrollView>
        )
    }

}

export default BMICalculator;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row'
//         // width: screenWidth,
//         // height: screenHeight
//     },
//     forImg: {
//         width: 16,
//         height: 16,
//         marginVertical: 5

//     },
//     touchableOpacityOne: {
//         flex: 1,
//         padding: 5,
//         marginVertical: 5,
//         backgroundColor: 'gray',
//         height: 40,
//         opacity: 0.6


//     },
//     textInputContainer: {
//         flex: 2,
//         justifyContent: 'center',
//         flexDirection: 'row',
//         marginVertical: 5,
//         //borderRadius:2
//     },
//     // textInputStyle:{
//     //     flex:1,
//     //     height: 40,
//     //     textAlign: 'center', 
//     //     backgroundColor: 'gray',

//     // },
//     touchableOpacityTwo: {
//         flex: 1,
//         padding: 5,
//         marginVertical: 5,
//         alignItems: 'flex-end',
//         backgroundColor: 'gray',
//         paddingRight: 5,
//         marginRight: 12,
//         height: 40
//     },
// })