import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import styles from '../Styling/SetUpScreen1Style';
import TextInputs from '../textInputs/TextInputs';
import CaloriesSetupBtn from '../buttons/setUpBtn'
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('window');

class Setupscreen1 extends React.Component {
    static navigationOptions ={
    
        headerStyle: {
            backgroundColor: 'black'
          },
        headerTintColor:'white'
      };
    constructor(props) {
        super(props);


    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1,backgroundColor:'black', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Set Up Your App
                      </Text>
                        </View>
                        <View style={styles.paraContainer}>
                            <Text style={styles.paraStyle}>
                                GetFitAthletic needs the following into to help you with your fitness journey.
                      </Text>
                        </View>
                        <Text style={styles.textsStyle}>Date Of Birth</Text>
                        <View style={styles.dateOfBirthContainer}>
                            <TextInputs placeholder={'Tab to set...'} />
                        </View>
                        <Text style={styles.textsStyle}>Gender</Text>
                        <View style={styles.genderContainer}>
                            <TextInput placeholder="Male" style={styles.genderInputStyleMale} />
                            <TextInput placeholder="Female" style={styles.genderInputStyleFemale} />
                          </View>
                        <View style={styles.btnContainer}>
                            {/* <Text>For Button</Text> */}
                            <CaloriesSetupBtn title="Next Step" onPress={()=>{navigate('Setupscreen')}}/>
                        </View>

                    </View>

                    <View style={styles.reserv}>
                        {/* <Text>
                            This Reserve Box
                      </Text> */}
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default Setupscreen1;

