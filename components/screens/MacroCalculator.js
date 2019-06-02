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
        }
    }
    render() {
        return (
            // <View style={styles.mainContainer}>
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
                        <Text style={styles.textStyle}>Date Of Birth</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Tap to set..." placeholderTextColor="gray" style={styles.inputStyle} />
                    </View>
                    <Text style={styles.genderTextStyle}>Gender</Text>
                    </View>

                    <View style={styles.genderContainer}>
                        <View style={styles.maleContainer}>
                            <TouchableOpacity style={styles.maleTouchableOpacity}>
                                <Text style={styles.maleTextStyle}>
                                    Male
                                          </Text>
                            </TouchableOpacity>
                            <Text style={styles.heightStyle}>Height</Text>
                            <View style={styles.inputContainer}>
                                <InputImgsScreen iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                />

                            </View>
                            <Text style={styles.textStyle}>Current Weight</Text>
                            <View style={styles.inputContainer}>
                                <InputImgsScreen iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                />

                            </View>
                            <Text style={styles.textStyle}>Goal Weight</Text>
                            <View style={styles.inputContainer}>
                                <InputImgsScreen iconMinus={require('../icons/minus-gray.png')}
                                    iconPlus={require('../icons/plus-gray.png')}
                                    touchableOpacityOne={styles.touchableOpacityOne}
                                    style={styles.textInputStyleParent}
                                    touchableOpacityTwo={styles.touchableOpacityTwo}
                                />

                            </View>
                            <Text style={styles.textStyle}>Activity Level</Text>
                            <TouchableOpacity style={styles.sedetaryContainer}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Sedentary
                                          </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.moderateContainer}>
                                <Text style={styles.activityChildsTextStyle}>
                                    Moderate
                                          </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flex: 1,  }}>
                            <TouchableOpacity style={styles.femaleContainer}>
                                <Text style={styles.maleTextStyle}>Female</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 44 }}>
                                <Picker selectedValue={this.state.user}
                                 onValueChange={this.updateUser} 
                                 style={styles.pickerStyle}>
                                    <Picker.Item label="Inches" value="inches" />
                                    <Picker.Item label="Centimeter" value="centimeter" />
                                </Picker>
                            </View>
                            <View style={{ marginTop: 50 }}>
                                <Picker selectedValue={this.state.user} 
                                onValueChange={this.updateUser} 
                                style={styles.pickerStyle}>
                                    <Picker.Item label="KG" value="kg" />
                                    {/* <Picker.Item label="Centimeter" value="centimeter" /> */}
                                </Picker>
                            </View>
                            <View style={{ marginTop: 50 }}>
                                <Picker selectedValue={this.state.user} 
                                onValueChange={this.updateUser} 
                                style={styles.pickerStyle}>
                                    <Picker.Item label="KG" value="kg" />
                                    {/* <Picker.Item label="Centimeter" value="centimeter" /> */}
                                </Picker>
                            </View>
                            <View style={{ marginTop: 42,marginLeft:16 }}>
                            <TouchableOpacity style={styles.lightTouchableStyle}>
                                <Text style={styles.lightTextStyle}>
                                    Light
                                          </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.extremTouchableStyle}>
                                <Text style={styles.lightTextStyle}>
                                    Extreme
                                          </Text>
                            </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 15}}>
                    <Text style={styles.macroTextStyle}>Your Daily Macros*</Text>
                    </View>
    
                    <View style={styles.inputCaloriesContainer}>
                        {/* <Text style={{ borderWidth:2,borderColor:'black',color: '#4f4f4f', marginLeft: 20, marginVertical: 5,fontFamily: 'MontserratLight' }}>1640 Kcal{'\n'}Calories</Text> */}
                        <TextInput placeholder={"1640 Kcl\nCalories"} style={styles.inputCaloriesStyleOne}/>
                        <TextInput placeholder={"149 g\nCarbohydrates"} style={styles.inputCaloriesStyleTwo} />
                        <TextInput placeholder={"107 g\Protein"} style={styles.inputCaloriesStyleThree}/>
                        <TextInput placeholder={"51 g\nFat"} style={styles.inputCaloriesStyleFour}/>
                        {/* <Text style={{ color: '#4f4f4f', marginLeft: '20%', marginVertical: 5,fontFamily: 'MontserratLight' }}>159 g{'\n'}Carbohydrates</Text> */}
                    </View>
                    <View style={styles.lastParaContainer}>
                      <Text style={styles.lastParaStyle}>
                          *This is the daily calories limit as calculated by the app using the above infromation.
                          If your coach has set another limit for you, please enter it above.
                      </Text>
                    </View>
                    <View style={styles.btnContainer}>
                    <CaloriesSetupBtn title='Set Up & Use App' caloriesBtnStyle={styles.caloriesBtnStyle}/>
                    </View>

               <View style={{flex:2,marginBottom:30}}>
                  
               </View>
               </View>
            </ScrollView>
        
        )
    }

}

export default Macrocalculator;