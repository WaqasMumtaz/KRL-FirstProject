import React from 'react';
import { 
    Text, 
    Alert,
    View, 
    ScrollView, 
    Button, 
    Image, 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Picker, 
    StyleSheet,
    ActivityIndicator,
    } from 'react-native';
// import Toast, {DURATION} from 'react-native-easy-toast'
import styles from '../Styling/ShowMeasurementsStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import ToastComponent from '../Toasts/nativeToast';
import OverlayLoader from '../Loader/OverlaySpinner'
const { height } = Dimensions.get('window');

class ShowMeasurementsScreen extends React.Component{
    constructor(props){
        super(props);

        this.state={

        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
               <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>Log Measurements</Text>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                      
                            <TouchableOpacity style={styles.cardContainer}>
                              <Text style={styles.currntDateStyle}>Current Date</Text>
                              <Text style={styles.textStyle}>Weight</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Shoulder</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Neck</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Waist</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Bicep</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Chest</Text>
                              <Text style={styles.forBorder}></Text>
                              <Text style={styles.textStyle}>Thigh</Text>
                            </TouchableOpacity>
                     

                    </ScrollView>
               </View>
            </View>
        )
    }

}

export default ShowMeasurementsScreen; 
