import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TextInput, TouchableOpacity, Picker, Option } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
// import HighpacejoggingScreen from './HighPaceJogging';
// import Pushups from './PushUps';
// import Bicepcurls from './BicepCurls';
// import Sidecrunch from '../screens/cardScreens/SideCrunch';
// import ReverseCrunches from '../screens/cardScreens/ReverseCrunches';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
import Toast, { DURATION } from 'react-native-easy-toast'
import { isEmptyStatement } from '@babel/types';

const { height } = Dimensions.get('window');
let exercise;

let exerciseArry = [];
let exerciseAmountArr = [];
let allObjArr = [];
let uniqeArray;

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
            crunch: false,
            iconShow: false,
            logExercise: false,
            reverseCrunch: false,
            verticalLegCrunch: false,
            bicycleEx: false,
            rollingEx: false,
            walking: false,
            running: false,
            joggingEx: false,
            exerciseName: '',
            exerciseAmount: [],
            exerciseUnit: '',
            dayOfMonth: '',
            month: '',
            year: '',
            date: '',
            time: '',
            allExerciseName: '',
            briskExerciseAmount: '',
            exerciseArr: [],
            inputs: {},
            amountExcercise: '',
            indexNumber: {},
            units: {},
            incInputValue:'',
            position : 'top',

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
                    dayOfMonth: date,
                    month: month,
                    year: year,
                    userId: dataFromLocalStorage._id
                })
            }

        });
        this.props.navigation.setParams({
            addExercise: this.addExercise,
            //showIcon:this.state.iconShow
        })
        // this.gettingDropDownValues();
        console.log('date --> ', date)
    }
    gettingDropDownValues = () => {
        const { exerciseArr } = this.state;
        exercise = exerciseArr.map((elem, i) => {
            console.log(elem, 'elemt')
        })
        console.log(exercise, 'exercise')
    }

    toastFunction = (text, position, duration, withStyle) => {
        this.setState({
            position: position,
        })
        if (withStyle) {
            this.refs.toastWithStyle.show(text, duration);
        } else {
            this.refs.toast.show(text, duration);
        }
    }

    addExercise = async () => {
        //const { exerciseName, exerciseAmount, exerciseUnit, date, time, userId, dayOfMonth, month, year } = this.state;
        const {inputs, units, date, time, userId, dayOfMonth, month, year } = this.state;
        const {navigate} = this.props.navigation;
        console.log('array of exercise >',uniqeArray, 'inputs >',inputs ,'units >', units);
        let dataArr =[];
        for(let i in uniqeArray){
            console.log(uniqeArray[i]);
            const exerciseObj = {};
            exerciseObj.date = date;
            exerciseObj.time = time;
            exerciseObj.dayOfMonth = dayOfMonth;
            exerciseObj.month = month;
            exerciseObj.year = year;
            exerciseObj.userId = userId;
            exerciseObj['exerciseName'] = uniqeArray[i];
            exerciseObj['exerciseAmount'] = inputs[uniqeArray[i]];
            exerciseObj['exerciseUnit'] = units[uniqeArray[i]];

            // console.log(inputs , 'inputs')
            // console.log(uniqeArray[i] , 'keys')

            // console.log(inputs[uniqeArray[i]])
            // console.log('aaaa >>',exerciseObj)
             dataArr.push(exerciseObj)
        }
        console.log('data array >>', dataArr)
         if (dataArr.length >= 0 ) {
             AsyncStorage.setItem('logExercises', JSON.stringify(dataArr))
             //let dataUser = await HttpUtils.post('postexerciselog', dataArr);
              //console.log(dataUser, 'dataUser')
             //let userMsg = dataUser.msg;
            //  if(dataUser.code == 200){
                this.toastFunction('Data Save Successfully', this.state.position, DURATION.LENGTH_LONG, true);
                 navigate('Exerciselog')
             //}
            //  else {
            //     this.toastFunction(userMsg, this.state.position, DURATION.LENGTH_LONG, true)
                //navigate('Exerciselog')
             //}
        }
        else {
            alert('Please Add Exercise')
        }
    }

    exerciseLog = () => {
        this.setState({ show: false, logExercise: true })
    }

    // showFields(e, val) {
    //     if (e == 'Brisk Walk') {
    //         this.setState({ show: false, showCard: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'High paced jogging') {
    //         this.setState({ show: false, jogging: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Push ups') {
    //         this.setState({ show: false, pushups: true, iconShow: true, exerciseName: e })

    //     }
    //     else if (e == 'Bicep curls') {
    //         this.setState({ show: false, bicep: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Side Crunch') {
    //         this.setState({ show: false, crunch: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Reverse Crunches') {
    //         this.setState({ show: false, reverseCrunch: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Vertical Leg Crunch') {
    //         this.setState({ show: false, verticalLegCrunch: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Bicycle Exercise') {
    //         this.setState({ show: false, bicycleEx: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Rolling Plank Exercise') {
    //         this.setState({ show: false, rollingEx: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Walking') {
    //         this.setState({ show: false, walking: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Running') {
    //         this.setState({ show: false, running: true, iconShow: true, exerciseName: e })
    //     }
    //     else if (e == 'Jogging') {
    //         this.setState({ show: false, joggingEx: true, iconShow: true, exerciseName: e })
    //     }
    // }

    backToHome(e, val) {
        console.log('remove item >>', e)
        //if (e == 'Brisk Walk') {
        //this.setState({ show: true, showCard: false, iconShow: false })
        exerciseArry = exerciseArry.filter(function (item) {
            return item !== e
        })
        // exerciseArry.filter((item) => {
        //     return (item !== e)

        // })
        this.setState({
            exerciseArr: exerciseArry
        })
        //console.log('remove array >>>', exerciseArry)
        //}
        // else if (e == 'High paced jogging') {
        //     this.setState({ show: true, jogging: false, iconShow: false })
        // }
        // else if (e == 'Push ups') {
        //     this.setState({ show: true, pushups: false, iconShow: false })
        // }
        // else if (e == 'Bicep curls') {
        //     this.setState({ show: true, bicep: false, iconShow: false })
        // }
        // else if (e == 'Side Crunch') {
        //     this.setState({ show: true, crunch: false, iconShow: false })
        // }
        // else if (e == 'Reverse Crunches') {
        //     this.setState({ show: true, reverseCrunch: false, iconShow: false })
        // }
        // else if (e == 'Vertical Leg Crunch') {
        //     this.setState({ show: true, verticalLegCrunch: false, iconShow: false })
        // }
        // else if (e == 'Bicycle Exercise') {
        //     this.setState({ show: true, bicycleEx: false, iconShow: false })
        // }
        // else if (e == 'Rolling Plank Exercise') {
        //     this.setState({ show: true, rollingEx: false, iconShow: false })
        // }
        // else if (e == 'Walking') {
        //     this.setState({ show: true, walking: false, iconShow: false })
        // }
        // else if (e == 'Running') {
        //     this.setState({ show: true, running: false, iconShow: false })
        // }
        // else if (e == 'Jogging') {
        //     this.setState({ sho w: true, joggingEx: false, iconShow: false })
        // }
    }



    setAmount = (index, text) => {
        const { inputs } = this.state;
        console.log('input value', index)
        console.log(inputs , 'inputs')
        //console.log(inputs.index , 'key valu')
        // setAmount = (index, e) => {
        // console.log('value >', e, 'index >', index);
        // this.setState({
        //     indexNumber: index
        // })
        this.setState({
            inputs: {
                ...this.state.inputs,
                [index]: text,

            }
        })



        // this.setState({
        //     inputs: index,
        // })


    }
    increamentVal(data , item){
        let emptyArr={}
        console.log('inc data >',Number(data))
        console.log('item value >', item)
        const inputValue = Number(data)+1;
        const incValue = inputValue.toString();
        console.log(incValue);
        // const a=this.state.inputs;
        // this.setState({
        //     incInputValue:incValue
        // })
        // for(var i in this.state.inputs){
        //    console.log(this.state.inputs[i])
        //    const a =this.state.inputs[i];
        //    this.setState({
        //        inputs:incValue
        //    })
        // }
        // console.log([item]);
         //console.log('increment value',incValue)
        //const a =this.state.inputs(...)
        // this.setState({
        //     inputs:{
        //         [item]:incValue

        //     }
        // })
        // if(data == 'Brisk Walk'){
        //     for(var i in this.state.inputs){
        //             console.log(this.state.inputs[i])
        //           const inputValue =  this.state.inputs[i]
        //           const a= Number(inputValue)+ 1;
        //           const amountVal = a.toString()
        //           console.log(a)
        //           this.setState({
        //               inputs:{
        //                   [data]:amountVal
        //               }
        //           })
        //         //     if(data == this.state.inputs[i]){
        //         //         console.log('true')
        //         //     }
        //      }

        }

    //     else if (data == 'High paced jogging') {
    //         for(var i in this.state.inputs){
    //             console.log(this.state.inputs[i])
    //           const inputValue =  this.state.inputs[i]
    //           const a= Number(inputValue)+ 1;
    //           const amountVal = a.toString()
    //           console.log(a)
    //           this.setState({
    //               inputs:{
    //                   [data]:amountVal
    //               }
    //           })
    //         //     if(data == this.state.inputs[i]){
    //         //         console.log('true')
    //         //     }
    //      }

    //  }
    //     //  allObjArr.push(...this.state.inputs);
    //  console.log('all objects >', allObjArr)
    // console.log('state value >>', this.state.inputs ,'data >', data)
    // 


    // console.log('inc value >>',data === 'Brisk Walk', 'index >>',index == 0)
    // if (data == 0) {
    //     console.log('exercise amount >>', this.state.exerciseAmount)
    //     console.log('amount', this.state)
    // const { exerciseAmount } = this.state;
    // const amount = Number(exerciseAmount) + 1
    // let amountVal = amount.toString()
    // this.setState({
    //     exerciseAmount: amountVal
    // })
    //}
    // else if( )

    //}
    decrementVal = () => {
        const { exerciseAmount } = this.state;
        const amount = Number(exerciseAmount) - 1
        let amountVal = amount.toString()
        this.setState({
            exerciseAmount: amountVal
        })
    }
    updateUnit=(data, text)=>{
        // this.setState({
        //     exerciseUnit: e
        // })
        console.log('data >', data, 'text >', text)
        this.setState({
            units: {
                ...this.state.units,
                [data]: text
            }
        })
    }

 
   


    selectExercise=(data)=>{
        console.log('dropdown func data >>',data)
        if (data !== "0") {
            console.log('data >>>', data)
            exerciseArry.push(data);
            this.setState({
                allExerciseName: data,
                exerciseArr: exerciseArry,
                inputs: {
                    ...this.state.inputs,
                    [data]: '',

                },
                units: {
                    ...this.state.units,
                    [data]: ''
                }
            })
            console.log('array >>', exerciseArry)
        }

        // this.setState({
        //     allExerciseName: data
        // })
        //  ,()=>{
        //      exerciseArry.push(this.state.allExerciseName);
        //      console.log(exerciseArry)
        //  })
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
            exerciseArr,
            amountExcercise,
            indexNumber
            //allExerciseName
        } = this.state;
        // console.log('inputs ', this.state.inputs, 'units >', this.state.units);
        // console.log('array state >>',this.state.exerciseArr)
        //console.log('aaaa >>',this.state.incInputValue)
        //console.log('array >>>',exerciseArry)
        //console.log('exercise name >>',allExerciseName)
        // if(exerciseArry != []){



        // }
       function onlyUnique(value, index, self){ 
            return self.indexOf(value) === index;
        }

        uniqeArray = exerciseArry.filter(onlyUnique);
        console.log('uniqe array >>',uniqeArray);
        
        

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Add Exercise
                        </Text>
                    </View>
                    <View style={{ height: 50, borderWidth: 2, borderColor: '#e5e5e5', borderRadius: 3 }}>
                        <Picker
                            selectedValue={this.state.allExerciseName}
                            style={{ height: 50, width: '100%', }}
                            onValueChange={this.selectExercise}
                            // onValueChange={(itemValue)=>this.selectExercise.bind(this,itemValue)}
                        //     onValueChange={(itemValue)=>this.setState({
                        //         allExerciseName:itemValue
                        //     }),
                        //     this.selectExercise.bind(this)

                        // }
                            
                        // onValueChange={(itemValue, itemIndex) =>
                        //      //this.setState({ allExerciseName: itemValue }),
                        //      this.selectExercise(itemValue)

                        // }
                        >
                            <Picker.Item label='Select an options...' value='0' />
                            <Picker.Item label="Brisk Walk" value="Brisk Walk" />
                            <Picker.Item label="High paced jogging" value="High paced jogging" />
                            <Picker.Item label="Push ups" value="Push ups" />
                            <Picker.Item label="Bicep curls" value="Bicep curls" />
                            <Picker.Item label="Side Crunch" value="Side Crunch" />
                            <Picker.Item label="Reverse Crunches" value="Reverse Crunches" />
                            <Picker.Item label="Vertical Leg Crunch" value="Vertical Leg Crunch" />
                            <Picker.Item label="Bicycle Exercise" value="Bicycle Exercise" />
                            <Picker.Item label="Rolling Plank Exercise" value="Rolling Plank Exercise" />
                            <Picker.Item label="Walking" value="Walking" />
                            <Picker.Item label="Running" value="Running" />
                            <Picker.Item label="Jogging" value="Jogging" />
                        </Picker>
                    </View>
                    {
                        uniqeArray.length >=0 ?
                        uniqeArray.map((item, index) => {
                                return (
                                    // console.log('array items >>>', item)
                                    <View style={{ marginTop: 20 }} key={index}>
                                        <BriskScreen title={item}

                                            // label="Minutes" value="minutes" 
                                            backFunc={this.backToHome.bind(this, item)}
                                            setAmount={(text) => this.setAmount(item, text)}
                                            //amount={amountExcercise}
                                            value={this.state.inputs[item]}
                                            increamentVal={this.increamentVal.bind(this, this.state.inputs[item], item)}
                                            //decrementVal={this.decrementVal}
                                            updateUnit={(text) => this.updateUnit(item, text)}
                                            indexNumber={indexNumber}
                                            unit={this.state.units[item]} />
                                    </View>


                                )
                            })
                            
                            :
                            null
                    }
                    <Toast ref="toastWithStyle"
                        style={{ backgroundColor: '#FF6200' }}
                        position={this.state.position}
                        positionValue={50}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
                    />

                    <View style={{ flex: 2 }}>

                    </View>
                    {/* {
                       this.state.allExerciseName != null ?
                       <BriskScreen title={this.state.allExerciseName}
                            // label="Minutes" value="minutes" 
                            increamentVal={this.increamentVal}
                            decrementVal={this.decrementVal}
                            backFunc={this.backToHome.bind(this, 'Brisk Walk')}
                            setAmount={this.setAmount}
                            amount={exerciseAmount}
                            updateUnit={this.updateUnit}
                            unit={exerciseUnit} />
                    :null
                   } */}


                    {/* {show && <View style={styles.listsContainer}>
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
                    </View>} */}
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

