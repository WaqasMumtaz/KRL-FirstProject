import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, Picker, Option } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
import HighpacejoggingScreen from './HighPaceJogging';
import Pushups from './PushUps';
import Bicepcurls from './BicepCurls';
import Sidecrunch from '../screens/cardScreens/SideCrunch';
import ReverseCrunches from '../screens/cardScreens/ReverseCrunches';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';

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
            headerRight ,
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
            crunch:false,
            iconShow: false,
            logExercise: false,
            reverseCrunch:false,
            verticalLegCrunch:false,
            bicycleEx:false,
            rollingEx:false,
            walking:false,
            running:false,
            joggingEx:false,
            exerciseName: '',
            exerciseAmount: '',
            exerciseUnit: '',
            dayOfMonth:'',
            month:'',
            year:'',
            date: '',
            time: '',
            exerciseArr: ['Brisk Walk', 'High paced jogging', 'Push ups', 'Bicep curls', 'Side Crunch', 'Reverse Crunches',
                'Vertical Leg Crunch', 'Bicycle Exercise', 'Rolling Plank Exercise', 'Walking', 'Running', 'Jogging'],
        }
    }
    componentDidMount() {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    dayOfMonth:date,
                    month:month,
                    year:year,
                    userId: dataFromLocalStorage._id
                })
            }

        });
        this.props.navigation.setParams({
            addExercise: this.addExercise,
            //showIcon:this.state.iconShow
        })
        // this.gettingDropDownValues();
        console.log('date --> ' ,date)
    }
    gettingDropDownValues = () => {
        const { exerciseArr } = this.state;
        exercise = exerciseArr.map((elem, i) => {
            console.log(elem, 'elemt')
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

    addExercise = async () => {
        const { exerciseName, exerciseAmount, exerciseUnit, date, time, userId , dayOfMonth , month , year } = this.state;
        let excersiceObj = {};
        if (exerciseName != '' && exerciseAmount != '' && exerciseUnit != '') {
            excersiceObj.exerciseName = exerciseName;
            excersiceObj.exerciseAmount = exerciseAmount;
            excersiceObj.exerciseUnit = exerciseUnit;
            excersiceObj.date = date;
            excersiceObj.time = time;
            excersiceObj.dayOfMonth = dayOfMonth;
            excersiceObj.month = month;
            excersiceObj.year = year;

            let dataUser = await HttpUtils.post('postexerciselog', excersiceObj)
            console.log(dataUser, 'dataUser')
            this.props.navigation.navigate('Exerciselog')
        }
    }

    exerciseLog = () => {
        this.setState({ show: false, logExercise: true })
    }

    showFields(e, val) {
        if (e == 'Brisk Walk') {
            this.setState({ show: false, showCard: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'High paced jogging') {
            this.setState({ show: false, jogging: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Push ups') {
            this.setState({ show: false, pushups: true,iconShow:true, exerciseName: e })

        }
        else if (e == 'Bicep curls') {
            this.setState({ show: false, bicep: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Side Crunch'){
            this.setState({ show: false, crunch: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Reverse Crunches'){
            this.setState({ show: false, reverseCrunch: true,iconShow:true, exerciseName: e })
        }
        else if(e == 'Vertical Leg Crunch'){
            this.setState({ show: false, verticalLegCrunch: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Bicycle Exercise'){
            this.setState({ show: false, bicycleEx: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Rolling Plank Exercise'){
            this.setState({ show: false, rollingEx: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Walking'){
            this.setState({ show: false, walking: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Running'){
            this.setState({ show: false, running: true,iconShow:true, exerciseName: e })
        }
        else if (e == 'Jogging'){
            this.setState({ show: false, joggingEx: true,iconShow:true, exerciseName: e })
        }
    }

    backToHome(e, val) {
        if (e == 'Brisk Walk') {
            this.setState({ show: true, showCard: false,iconShow:false })
        }
        else if (e == 'High paced jogging') {
            this.setState({ show: true, jogging: false,iconShow:false })
        }
        else if (e == 'Push ups') {
            this.setState({ show: true, pushups: false,iconShow:false })
        }
        else if (e == 'Bicep curls') {
            this.setState({ show: true, bicep: false,iconShow:false })
        }
        else if (e == 'Side Crunch'){
            this.setState({ show: true, crunch: false,iconShow:false })
        }
        else if (e == 'Reverse Crunches'){
            this.setState({ show: true, reverseCrunch: false,iconShow:false })
        }
        else if (e == 'Vertical Leg Crunch'){
            this.setState({ show: true, verticalLegCrunch: false,iconShow:false })
        }
        else if (e == 'Bicycle Exercise'){
            this.setState({ show: true, bicycleEx: false,iconShow:false })
        }
        else if (e == 'Rolling Plank Exercise'){
            this.setState({ show: true, rollingEx: false,iconShow:false })
        }
        else if (e == 'Walking'){
            this.setState({ show: true, walking: false ,iconShow:false})
        }
        else if (e == 'Running'){
            this.setState({ show: true, running: false,iconShow:false })
        }
        else if (e == 'Jogging'){
            this.setState({ show: true, joggingEx: false ,iconShow:false})
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

    render() {
        const { 
            show, 
            showCard, 
            jogging, 
            pushups, 
            bicep,
            crunch, 
            logExercise, 
            exerciseAmount, 
            exerciseUnit,
            reverseCrunch,
            verticalLegCrunch,
            bicycleEx,
            rollingEx,
            walking,
            running,
            joggingEx,
         } = this.state;
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
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Side Crunch')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Side Crunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Reverse Crunches')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Reverse Crunches</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Vertical Leg Crunch')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Vertical Leg Crunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Bicycle Exercise')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Bicycle Exercise</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Rolling Plank Exercise')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Rolling Plank Exercise</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Walking')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Walking</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Running')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Running</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showFields.bind(this, 'Jogging')}
                        // onPress={this.bicepCurlsFun}
                        >
                            <Text style={styles.listsTextStyle}>Jogging</Text>
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
                        <BriskScreen
                            title='High Paced Jogging'
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
                        <BriskScreen
                            title='Push Ups'
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
                        <BriskScreen
                            title='Bicep Curls'
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
                    {crunch && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Side Crunch'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Side Crunch')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {reverseCrunch && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Reverse Crunches'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Reverse Crunches')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {verticalLegCrunch && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Vertical Leg Crunch'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Vertical Leg Crunch')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {bicycleEx && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Bicycle Exercise'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Bicycle Exercise')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {rollingEx && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Rolling Plank Exercise'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Rolling Plank Exercise')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {walking && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Walking'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Walking')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {running && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Running'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Running')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {joggingEx && <View style={styles.cardContainer} >
                        <BriskScreen
                            title='Jogging'
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Jogging')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit}
                        // backFunc={this.bicepToHome}
                        />
                    </View>}
                    {/* {logExercise && <View style={styles.cardContainer} >
                        <Bicepcurls />
                    </View>} */}
                </View>
                <View style={{ flex: 1.2 }}>
                </View>
            </ScrollView>
        )
    }
}

export default AddExercise;

