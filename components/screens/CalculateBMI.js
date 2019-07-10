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
            weightUnit: ''
        }
    }
    getHeight = (e) => {
        this.setState({
            height: e
        })
    }
    getWeight = (e) => {
        this.setState({
            weight: e
        })
    }
    increamentHeight = () => {
        const height = Number(this.state.height)
        this.setState({
            height: height + 1
        })
    }
    increamentWeight = () => {
        const weight = Number(this.state.weight)
        this.setState({
            weight: weight + 1
        })
    }
    decrementHeight = () => {
        const height = Number(this.state.height)
        this.setState({
            height: height - 1
        })
    }
    decrementWeight = () => {
        const weight = Number(this.state.weight)
        this.setState({
            height: weight + 1
        })
    }
    calculateBmi = () => {
        console.log('calculateBmi')
        // if (heightUnit == 'inches' && weight == 'kg') {

        // }
        // else if (heightUnit == 'inches' && weight == 'pound') {

        // }
        // else if (heightUnit == 'centimeter' && weight == 'kg') {

        // }
        // else if (heightUnit == 'centimeter' && weight == 'pound') {

        // }
    }
    updateHeight = (e) => {
        const { height, weight, heightUnit, weightUnit } = this.state
        console.log(e, 'updateHeight')
        this.setState({
            heightUnit: e
        })
        if (weight != 0 && height != 0 && heightUnit != '' && weightUnit != '') {
            this.calculateBmi()
        }
    }
    updateWeight = (e) => {
        const { height, weight, heightUnit, weightUnit } = this.state
        console.log(e, 'updateWeight')
        this.setState({
            weightUnit: e
        })
        if (weight != 0 && height != 0 && heightUnit != '' && weightUnit != '') {
            this.calculateBmi()
        }
    }
    render() {
        // const { height, weight } = this.state;
        console.log(this.state.height, 'height')
        console.log(this.state.weight, 'weight')

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
                                    <TextInput keyboardType='numeric' maxLength={3} style={styles.textInputStyleParent}
                                        type="number"
                                        // onChangeText={this.getHeight}
                                        onChangeText={(heig) => this.setState({ height: heig })}
                                        value={this.state.height}
                                    // placeholderTextColor = 'black'
                                    />
                                    {/* {this.props.height} */}
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
                                        onChangeText={this.getWeight}
                                    // value = {this.state.height}
                                    />
                                    {/* {this.props.height} */}
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
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                            <Text style={styles.nuitTextStyleTwo}>Unit</Text>
                            <View style={styles.pickerContainerTwo}>
                                <Picker selectedValue={this.state.weightUnit}
                                    onValueChange={this.updateWeight}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label="KG" value="kg" />
                                    <Picker.Item label="Pound" value="pound" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.bmiTextStyle}>BMI</Text>
                    <View style={styles.bmiInputContainer}>
                        <TextInput placeholder="c.g 22" placeholderTextColor="#4f4f4f" style={styles.inputStyle} />
                    </View>

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