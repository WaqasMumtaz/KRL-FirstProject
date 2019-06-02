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
    }

    render() {
        const { navigate } = this.props.navigation;
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
                      <TouchableOpacity style={styles.touchOpacityStyle}>
                          <Text style={styles.headerTextStyle}>Sedentary</Text>
                          <Text style={styles.textStyle}>Desk job very little activity.</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.touchOpacityStyle}>
                           <Text style={styles.headerTextStyle}>Light Activity</Text>
                          <Text style={styles.textStyle}>Some Standing and moving.</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.scndActivity}>
                    <TouchableOpacity style={styles.touchOpacityStyle}>
                            <Text style={styles.headerTextStyle}>Active</Text>
                            <Text style={styles.textStyle}>Mostly standing and moving.</Text>
                    </TouchableOpacity>
                       <TouchableOpacity style={styles.touchOpacityStyle}>
                          <Text style={styles.headerTextStyle}>Very Active</Text>
                          <Text style={styles.textStyle}>Heavy moving and lifting heavy stuff.</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.paraStyle}>Your Daily Macros*</Text>
                    <View style={styles.macrosContainer}>
                             <TextInput placeholder="1640 Kcal calories" placeholderTextColor='black' style={styles.textInputOne} underlineColorAndroid='black' />
                             <TextInput placeholder="159 g Carbohyderates " placeholderTextColor='black'  style={styles.textInputTwo} underlineColorAndroid='black' />
                             <TextInput placeholder="107 g Proteins" placeholderTextColor='black' style={styles.textInputThree} />
                             <TextInput placeholder="51 g Fat " placeholderTextColor='black'  style={styles.textInputFour} />
                    </View>
                    <Text style={styles.paraStyle}>*This is the daily calories limit as calculated by the app using the above information . If 
                        your coach has set another limit for you , please enter it above.
                    </Text>
                    <View style={styles.btnContainer}>
                          <CaloriesSetupBtn title="Set Up & Use App" onPress={()=>navigate('BottomTabe')} caloriesBtnStyle={styles.caloriesBtnStyle}/>
                    </View>
                     
                </View>
            </ScrollView>
        )
    }
}

export default LastSetUpScreen;
