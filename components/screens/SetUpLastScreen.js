import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/LastScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn'

const { height } = Dimensions.get('window');


class LastSetUpScreen extends React.Component {
    static navigationOptions = {

        headerStyle: {
            backgroundColor: 'black'
        },
        headerTintColor: 'white'
    };
    constructor(props) {
        super(props)
        this.state = {
            activityLevel: '',
            activityLevelValidation: false,
            sedentary: false,
            lightActivity: false,
            active: false,
            veryActive: false
        }
    }
    activityLevel(activity) {
        if (activity == 'light Activity') {
            this.setState({
                sedentary: false,
                lightActivity: true,
                active: false,
                veryActive: false,
                activityLevel: 'light Activity'
            })
        }
        else if (activity == 'sedentary') {
            this.setState({
                sedentary: true,
                lightActivity: false,
                active: false,
                veryActive: false,
                activityLevel: 'sedentary'
            })
        }
        else if (activity == 'active') {
            this.setState({
                sedentary: false,
                lightActivity: false,
                active: true,
                veryActive: false,
                activityLevel: 'active'
            })
        }
        else if (activity == 'very Active') {
            this.setState({
                sedentary: false,
                lightActivity: false,
                active: false,
                veryActive: true,
                activityLevel: 'very Active'
            })
        }
    }
    calulateMacro = () => {
        const { navigate } = this.props.navigation;
        const year = new Date().getFullYear(); //Current Year
        const age = new Date(this.props.navigation.state.params.dob).getFullYear();
        console.log(age , 'age')
        if (gender == 'male') {
            let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age + 5
            this.setState({
                calculteCalries: calculteCalries
            })
            navigate('BottomTabe')

        }
        else if (gender == 'female') {
            let calculteCalries = 10 * currentWeight + 6.25 * height - 5 * age - 161
            this.setState({
                calculteCalries: calculteCalries
            })
            navigate('BottomTabe')
        }
    }
    render() {
        console.log(this.props.navigation.state.params, 'props wit navigate')
        const { activityLevelValidation, sedentary, lightActivity, active, veryActive } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>Set Up Your App</Text>
                    </View>
                    <View style={styles.paraContainer}>
                        <Text style={styles.paraStyle}>GetFitAthletic needs the following info to help you with your fitness journey</Text>
                    </View>
                    <Text style={styles.paraStyle}>Activity Level</Text>
                    <View style={styles.activityContainer}>
                    {/* <TouchableOpacity style={styles.touchOpacityStyle } */}
                         <TouchableOpacity style={sedentary ? styles.sedetaryContainer : styles.touchOpacityStyle}
                         onPress={this.activityLevel.bind(this, 'sedentary')}>
                            <Text style={styles.headerTextStyle}>Sedentary</Text>
                            <Text style={styles.textStyle}>Desk job very little activity.</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={lightActivity ? styles.moderateContainer : styles.touchOpacityStyle}
                        onPress={this.activityLevel.bind(this, 'light Activity')}
                        >
                        {/* <TouchableOpacity style={lightActivity ? styles.touchOpacityStyle : styles.moderateContainer} > */}
                            <Text style={styles.headerTextStyle}>Light Activity</Text>
                            <Text style={styles.textStyle}>Some Standing and moving.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scndActivity}>
                    <TouchableOpacity style={active ? styles.lightTouchableStyle : styles.touchOpacityStyle}
                    onPress={this.activityLevel.bind(this, 'active')}
                    >
                        {/* <TouchableOpacity style={active ? styles.touchOpacityStyle : styles.lightTouchableStyle} > */}
                            <Text style={styles.headerTextStyle}>Active</Text>
                            <Text style={styles.textStyle}>Mostly standing and moving.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={veryActive ? styles.extremTouchableStyle : styles.touchOpacityStyle}
                        onPress={this.activityLevel.bind(this, 'very Active')}
                        >
                        {/* <TouchableOpacity style={veryActive ? styles.touchOpacityStyle : styles.extremTouchableStyle} > */}
                            <Text style={styles.headerTextStyle}>Very Active</Text>
                            <Text style={styles.textStyle}>Heavy moving and lifting heavy stuff.</Text>
                        </TouchableOpacity>
                    </View>
                    {activityLevelValidation ?
                        <View style={{marginBottom:10,alignItems:'center'}}>
                            <Text style={styles.validationInstruction}>
                                Please select activity level
                            </Text>
                        </View>
                        : null}
                    <Text style={styles.paraStyle}>Your Daily Macros*</Text>
                    <View style={styles.macrosContainer}>
                        <TextInput placeholder="1640 Kcal calories" placeholderTextColor='black' style={styles.textInputOne} underlineColorAndroid='black' />
                        <TextInput placeholder="159 g Carbohyderates " placeholderTextColor='black' style={styles.textInputTwo} underlineColorAndroid='black' />
                        <TextInput placeholder="107 g Proteins" placeholderTextColor='black' style={styles.textInputThree} />
                        <TextInput placeholder="51 g Fat " placeholderTextColor='black' style={styles.textInputFour} />
                    </View>
                    <Text style={styles.paraStyle}>*This is the daily calories limit as calculated by the app using the above information . If
                        your coach has set another limit for you , please enter it above.
                    </Text>
                    <View style={styles.btnContainer}>
                        <CaloriesSetupBtn title="Set Up & Use App"
                            onPress={this.calulateMacro}
                            // onPress={() => navigate('BottomTabe')}
                            caloriesBtnStyle={styles.caloriesBtnStyle} />
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default LastSetUpScreen;
