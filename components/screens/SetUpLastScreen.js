import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/LastScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn'
const screenWidth = Dimensions.get('window').width;
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

                      </TouchableOpacity>
                      <TouchableOpacity style={styles.touchOpacityStyle}>

                      </TouchableOpacity>
                    </View>
                    <View style={styles.scndActivity}>
                    <TouchableOpacity style={styles.touchOpacityStyle}>

                    </TouchableOpacity>
                       <TouchableOpacity style={styles.touchOpacityStyle}>

                      </TouchableOpacity>
                    </View>
                    <Text style={styles.paraStyle}>Your Daily Macros*</Text>
                    <View style={styles.macrosContainer}>
                             
                    </View>
                    <Text style={styles.paraStyle}>*This is the daily calories limit as calculated by the app using the above information . If 
                        your coach has set another limit for you , please enter it above.
                    </Text>
                    <View style={styles.btnContainer}>
                          <CaloriesSetupBtn title="Set Up & Use App" onPress={()=>navigate('BottomTabe')}/>
                    </View>
                     
                </View>
            </ScrollView>
        )
    }
}

export default LastSetUpScreen;
