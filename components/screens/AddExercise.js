import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, Picker , Option} from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
import HighpacejoggingScreen from './HighPaceJogging';
import Pushups from './PushUps';
import Bicepcurls from './BicepCurls';
import AsyncStorage from '@react-native-community/async-storage';

// import DropDown, {
//     Select,
//     Option,
//     OptionList,
// } from 'react-native-option-select';

const { height } = Dimensions.get('window');
let exercise;

class AddExercise extends React.Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log(params);
        let headerRight = <TouchableOpacity style={styles.headerIconContainer}
            onPress={
                params.addExercise
            }>
            <Image source={require('../icons/tick.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        return {
            headerRight,
            headerStyle: {
            },
            headerTintColor: 'gray',
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showCard: false,
            jogging: false,
            pushups: false,
            bicep: false,
            iconShow: false,
            logExercise: false,
            exerciseName: '',
            exerciseAmount: '',
            exerciseUnit: '',
            date: '',
            time: '',
            exerciseArr: ['Brisk Walk', 'High paced jogging', 'Push ups', 'Bicep curls', 'Side Crunch', 'Reverse Crunches',
                'Vertical Leg Crunch', 'Bicycle Exercise', 'Rolling Plank Exercise', 'Walking', 'Running', 'Jogging'],
            // exercise: ''
        }
    }
    componentDidMount() {
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        let dataFromLocalStorage;
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                dataFromLocalStorage = JSON.parse(value);
            }
        });

        this.setState({
            date: date + '/' + month + '/' + year,
            time: hours + ':' + min + ':' + sec,
            // userId: dataFromLocalStorage._id
        })

        this.props.navigation.setParams({
            addExercise: this.addExercise,
        })
        this.gettingDropDownValues();
    }
    gettingDropDownValues = () => {
        const { exerciseArr } = this.state;
        exercise = exerciseArr.map((elem, i) => {
            console.log(elem , 'elemt')
            // return { label: elem, value: elem, id: i }
            // return <Option>{elem}</Option>
            // <View style={styles.listsContainer}>
            //     {/* <TouchableOpacity
            //         onPress={this.showFields.bind(this, elem)}
            //     > */}
            //         {/* <Text style={styles.listsTextStyle}>{elem}</Text> */}
            //         <Picker style={styles.pickerStyle}
            //             onValueChange={this.showFields.bind(this, elem)}
            //         // onValueChange={(itemValue, itemPosition) =>  
            //         //     this.setState({language: itemValue, choosenIndex: itemPosition})}  
            //         >
            //             <Picker.Item label={elem} value={elem} />
            //             {/* <Picker.Item label="JavaScript" value="js" />  
            //         <Picker.Item label="React Native" value="rn" />   */}
            //         </Picker>
            //     {/* </TouchableOpacity> */}
            //  </View>
        })
        console.log(exercise, 'exercise')
    }

    addExercise = () => {
        const { exerciseName, exerciseAmount, exerciseUnit } = this.state;
        if (exerciseName != '' && exerciseAmount != '' && exerciseUnit != '') {
            this.props.navigation.navigate('Exerciselog', {
                exerciseName: exerciseName,
                exerciseAmount: exerciseAmount,
                exerciseUnit: exerciseUnit,
            });
        }
    }

    exerciseLog = () => {
        this.setState({ show: false, logExercise: true })
    }

    showFields(e, val) {
        if (e == 'Brisk Walk') {
            this.setState({ show: false, showCard: true, exerciseName: e })
        }
        else if (e == 'High paced jogging') {
            this.setState({ show: false, jogging: true, exerciseName: e })
        }
        else if (e == 'Push ups') {
            this.setState({ show: false, pushups: true, exerciseName: e })

        }
        else if (e == 'Bicep curls') {
            this.setState({ show: false, bicep: true, exerciseName: e })
        }
    }

    backToHome(e, val) {
        if (e == 'Brisk Walk') {
            this.setState({ show: true, showCard: false })
        }
        else if (e == 'High paced jogging') {
            this.setState({ show: true, jogging: false })
        }
        else if (e == 'Push ups') {
            this.setState({ show: true, pushups: false })
        }
        else if (e == 'Bicep curls') {
            this.setState({ show: true, bicep: false })
        }
    }

    setAmount = (e) => {
        this.setState({
            exerciseAmount: e
        })
    }
    increamentVal = () => {
        const { exerciseAmount } = this.state;
        const amount = Number(exerciseAmount) + 1
        let amountVal = amount.toString()
        this.setState({
            exerciseAmount: amountVal
        })
    }
    decrementVal = () => {
        const { exerciseAmount } = this.state;
        const amount = Number(exerciseAmount) - 1
        let amountVal = amount.toString()
        this.setState({
            exerciseAmount: amountVal
        })
    }
    updateUnit = (e) => {
        this.setState({
            exerciseUnit: e
        })
    }

    // showHighPaceJogging = () => {
    //     console.log('function called showHighPaceJogging')

    //     this.setState({ show: false, jogging: true })
    // }
    // pushUps = () => {
    //     console.log('function called pushUps')

    //     this.setState({ show: false, pushups: true })
    // }
    // bicepCurlsFun = () => {
    //     console.log('function called bicepCurlsFun')

    //     this.setState({ show: false, bicep: true })
    // }


    // joggingToHome = () => {
    //     console.log('function called joggingToHome')

    //     this.setState({ show: true, jogging: false })
    // }
    // pushUpsToHome = () => {
    //     console.log('function called pushUpsToHome')

    //     this.setState({ show: true, pushups: false })
    // }
    // bicepToHome = () => {
    //     console.log('function called bicepToHome')

    //     this.setState({ show: true, bicep: false })
    // }

    render() {
        const { show, showCard, jogging, pushups, bicep, logExercise, exerciseAmount, exerciseUnit } = this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Add Exercise
                        </Text>
                    </View>
                    {/* <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ marginRight: 20 }}>
                            <Image source={require('../icons/left.png')} style={styles.forImgs} />
                        </TouchableOpacity>
                        <Text>Today</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}>
                            <Image source={require('../icons/right.png')} style={styles.forImgs} />
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.bodyContainer}>
                        <TextInput placeholder="Search exercise" placeholderTextColor="black" style={styles.inputFieldStyle} />
                    </View>
                    {show && <View style={styles.listsContainer}>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Brisk Walk')}
                        >
                            <Text style={styles.listsTextStyle}>Brisk Walk</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'High paced jogging')}
                        // onPress={this.showHighPaceJogging}
                        >
                            <Text style={styles.listsTextStyle}>High paced jogging</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Push ups')}
                        // onPress={this.pushUps}
                        >
                            <Text style={styles.listsTextStyle}>Push ups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Bicep curls')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Bicep curls</Text>
                        </TouchableOpacity>
                    </View>}
                    {showCard && <View style={styles.cardContainer}>
                        <BriskScreen title="Brisk Walk"
                            // label="Minutes" value="minutes" 
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Brisk Walk')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit} />
                    </View>}
                    {jogging && <View style={styles.cardContainer} >
                        <HighpacejoggingScreen
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'High paced jogging')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.joggingToHome} 
                        />
                    </View>}
                    {pushups && <View style={styles.cardContainer} >
                        <Pushups
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Push ups')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.pushUpsToHome} 
                        />
                    </View>}
                    {bicep && <View style={styles.cardContainer} >
                        <Bicepcurls
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Bicep curls')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {logExercise && <View style={styles.cardContainer} >
                        <Bicepcurls />
                    </View>}
                </View>
                <View style={{ flex: 1.2 }}>
                </View>
            </ScrollView>
        )
    }
}

export default AddExercise;

