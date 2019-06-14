import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
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
        }
    }
    render() {
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
                            
                            <View style={styles.inputOne}>
                            <Text style={styles.textStyle}>Height</Text>
                            <InputImgsScreen
                                iconMinus={require('../icons/minus-gray.png')}
                                iconPlus={require('../icons/plus-gray.png')}
                                touchableOpacityOne={styles.touchableOpacityOne}
                                style={styles.textInputStyleParent}
                                touchableOpacityTwo={styles.touchableOpacityTwo}
                            />
                            </View>
                            
                            <View style={styles.inputTwo}>
                            <Text style={styles.textStyle}>Weight</Text>
                                <InputImgsScreen
                                    iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                />
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            
                            <Text style={styles.nuitTextStyleOne}>Unit</Text>
                            <View style={styles.pickerContainerOne}>
                                <Picker selectedValue={this.state.user}
                                    onValueChange={this.updateUser}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                            <Text style={styles.nuitTextStyleTwo}>Unit</Text>
                            <View style={styles.pickerContainerTwo}>
                                <Picker selectedValue={this.state.user}
                                    onValueChange={this.updateUser}
                                    style={styles.pickerStyle}>
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                       <Text style={styles.bmiTextStyle}>BMI</Text>
                    <View style={styles.bmiInputContainer}>
                       <TextInput placeholder="c.g 22" placeholderTextColor="#4f4f4f" style={styles.inputStyle}/>
                    </View>

                </View>
            </ScrollView>
        )
    }

}

export default BMICalculator;

