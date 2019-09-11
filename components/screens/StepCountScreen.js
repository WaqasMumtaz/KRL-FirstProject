import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/StepCountScreenStyle';
import DatePicker from 'react-native-datepicker';
import HttpUtils from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {
    DeviceEventEmitter // will emit events that you can listen to
} from 'react-native';
import { NativeAppEventEmitter } from 'react-native';
import { SensorManager } from 'NativeModules';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import { NativeModules } from 'react-native';
const rnHealthKit = NativeModules.RNHealthKit;
//console.log('Fitness Api Data -->>',Fitness)
// console.log('Health kit >>', rnHealthKit)
const googleFit = NativeModules.RNGoogleFit;
// console.log('GoogleFit -->>', GoogleFit)
//console.log('small googlefit -->>', googleFit)
// import FitService from '../StepCounterServices/fitService';
// console.log(FitService);
// console.log('sensormanagers >>>', SensorManager)

//var mSensorManager = require('NativeModules').SensorManager;
//const Pedometer = require('../Pedometer/Pedometer');
const { height } = Dimensions.get('window');
const date = new Date().getDate();








export default class StepCountScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            data: '',
            curTime: '',
            filterData: [],
            pedometerData: '',
            currentTime: new Date().toLocaleString(),
            targetTime: '',
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            currntDate: '',
            timer: null,
            matchTimer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
            hour_Counter: '0',
            startDisable: false,
            achieve: false,
            allDataUser: [],
            userCurrentWeight: '',
            weightNoUnit: '',
            currentCalories: '',

        }
        this.updateTime()
    }



    async componentWillMount() {
        await this.getData()
        this.dateFilter()

        // this._startPedometer

    }


    //get data from database
    getData = async () => {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        //let dataUser = await HttpUtils.get('getallexerciselog')
        let dataUser = await HttpUtils.get('getweightlog')
        try {
            console.log(dataUser, 'dataUser');
            let code = dataUser.code;
            if (code == 200) {
                let getUserData = await AsyncStorage.getItem('currentUser');
                //console.log('currentUser Id >>>',getUserData)
                let dataArr = [];
                let parseUserData = JSON.parse(getUserData);
                // console.log('parse data >>>',parseUserData);
                // console.log('parse data user id >>>',parseUserData._id);
                let loginUserId = parseUserData._id;
                //console.log('login user id >>>',loginUserId)
                // console.log(dataUser.content)
                let checkId = dataUser.content;
                for (const i in checkId) {
                    //console.log(checkId[i])
                    let data = checkId[i];
                    //console.log('total id >>>',data._id)
                    if (data.userId == loginUserId) {
                        dataArr = [...dataArr, data]
                        //console.log('Data array >>>',dataArr)
                        this.setState({
                            allDataUser: dataArr
                        }, () => {
                            const userData = this.state.allDataUser;
                            // console.log('userData >>>', userData)
                            for (let i in userData) {
                                // console.log(userData[i])
                                let userWeight = userData[i].weight;
                                this.setState({
                                    userCurrentWeight: userWeight
                                })
                            }
                        })

                    }
                }

            }
            else {
                // console.log('User Not Login')
            }


        }
        catch (error) {
            console.log(error)
        }
        await this.setState({
            date: date + '-' + month + '-' + year,
            data: dataUser.content
        })
    }

    //filtration with date
    dateFilter = (e) => {
        const { data, date } = this.state;
        let dataArr = [];
        for (var i in data) {
            let dataFilter = data[i];
            if (e == undefined) {
                if (dataFilter.date == date) {
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr
                    })
                }
            }
            else if (e != undefined) {
                if (dataFilter.date == e) {
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr,
                        date: e
                    })
                }
            }
        }
    }


    _startPedometer() {

         console.log('Pedometer Function')
        //console.log('all data of user >>>',this.state.allDataUser)
        
        SensorManager.startStepCounter(1000);
        DeviceEventEmitter.addListener('StepCounter', (data) => {
             console.log('sensor manager data -->>',data)
            this.setState({ pedometerData: data.steps })
            // console.log('user steps -->', data.steps)


        });
        this.countStepTime()
        this.matchTime()

        if (Platform.OS === 'android') {
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }
            
            GoogleFit.authorize(options)
                .then((res) => {
                    // console.log('authorized >>>', res)
                    GoogleFit.observeSteps((res) => {
                        console.log(res)

                        this.setState({ pedometerData: res.steps })
                    })

                })

                .catch((err) => {
                    console.log('err >>> ', err)
                })


        } else if (Platform.OS === 'ios') {
            const options = {
                scopes: [
                    Scopes.FITNESS_ACTIVITY_READ_WRITE,
                    Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }

            rnHealthKit.authorize(options)
                .then((res) => {
                    // console.log('authorized >>>', res)
                    rnHealthKit.observeSteps((res) => {
                        // console.log(res)
                        this.setState({ pedometerData: res.steps })
                    })


                })

        }
        // console.log('user string weight >>>', this.state.userCurrentWeight.slice(0, 3))
        const userWeight = this.state.userCurrentWeight.slice(0, 3)
        // console.log('number weight >>>', userWeight)
        this.setState({
            weightNoUnit: userWeight
        })




    }


    matchTime = () => {
        let matchTimer = setInterval(() => {
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds
            const currentTime = hours + ':' + min + ':' + sec;
            // console.log('current time >>>', currentTime)
            const resetTime = '12' + ':' + '0' + ':' + '0';
            //console.log('wanted time >>>', resetTime)
            if (currentTime == resetTime) {
                // console.log('Success!! condition match');
                SensorManager.
                    this.setState({
                        pedometerData: '',
                        timer: null,
                        hour_Counter: '0',
                        minutes_Counter: '00',
                        seconds_Counter: '00',
                        startDisable: false,
                        matchTimer: null,
                        timer: clearInterval(this.state.timer),
                        matchTimer: clearInterval(this.state.matchTimer)
                    })


            }
        }, 1000)
        this.setState({ matchTimer })
    }

    updateTime = () => {
        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('current date >>>', today)
        const currentTime = hours + ':' + min + ':' + sec;
        // console.log('current time >>>', currentTime)
        this.setState({ currntDate: today })
        this.setState({ curTime: currentTime })


    }


    countStepTime = () => {
        let timer = setInterval(() => {

            let num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter,
                hour = this.state.hour_Counter;

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString();
                this.updateCalories(count)
                num = '00';
            }
            if (Number(this.state.minutes_Counter) == 59) {
                hour = (Number(this.state.hour_Counter) + 1).toString();
                count = '00';
            }
            this.setState({
                hour_Counter: hour.length == 1 ? hour : hour,
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num
            });
        }, 1000);
        this.setState({ timer });

        this.setState({ startDisable: true })
    }

    componentWillUnmount() {
        clearInterval(this.state.matchTimer);
    }



    updateCalories = (minute) => {
        //console.log('updated state >>>', minute)
        let walkingTime = Number(minute)
        const userWeight = Number(this.state.weightNoUnit)
        // console.log('number weight >>>', userWeight)
        const formula = Math.floor(((2.3 * userWeight) * (walkingTime / 60)))
       // console.log('Calculated Calories >>>', formula)
        this.setState({
            currentCalories: formula
        })
    }






    render() {
        const {
            date,
            filterData,
            pedometerData,
            currentTime,
            targetTime,
            minutes_Counter,
            seconds_Counter,
            hour_Counter,
            achieve,
            userCurrentWeight,
            currentCalories
        } = this.state;
        // console.log('minutes >>>', minutes_Counter)
        // console.log('login user weight >>>', userCurrentWeight)
        // console.log('seconds >>>', seconds_Counter)
        // console.log('Current Calories >>>', Number(currentCalories))
        return (
            // <View style={styles.mainContainer}>
            <View style={styles.childContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingStyle}>Today's Step Count</Text>
                </View>
                <View style={styles.dateContainer}>
                    <DatePicker
                        style={{ width: 120 }}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-1950"
                        maxDate={date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                width: 0,
                                height: 0,
                            },
                            dateInput: {
                                height: 40,
                            }
                        }}
                        onDateChange={
                            this.dateFilter
                            // (date) => { this.setState({ date: date }) }
                        }
                    />
                </View>
                {achieve && <View style={styles.achieveText}>
                    <Text style={styles.textStyle}>Achieve a day target steps</Text>
                </View>
                }
                <ScrollView style={{ backgroundColor: '#FFFFFF', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <TouchableOpacity
                        style={styles.stepCountContainer}
                        activeOpacity={0.7}
                        onPress={this._startPedometer.bind(this)}
                        //onPress={this.countStepTime}
                        disabled={this.state.startDisable}
                    >
                        <View style={styles.progressWhelContainer} >
                            <Wheelspiner
                                size={90}
                                width={12}
                                color={'#FF6200'}
                                progress={pedometerData == '' ? 0 : pedometerData}
                                backgroundColor={'gray'}
                                animateFromValue={0}
                                fullColor={'#FF6200'}
                            //duration={60000}
                            />
                        </View>
                        <View style={styles.stepCountData}>
                            <View style={{ flexDirection: 'row', marginRight: 50 }}>
                                <Text style={{
                                    color: '#FF6200',
                                    fontFamily: 'MontserratLight',
                                    fontSize: 11
                                }}>{pedometerData == '' ? 0 : pedometerData}</Text>
                                <Text style={{
                                    color: '#a6a6a6',
                                    fontFamily: 'MontserratLight',
                                    fontSize: 11
                                }}>/10,000</Text>
                            </View>
                            <Text style={{
                                color: '#a6a6a6',
                                fontFamily: 'MontserratLight',
                                fontSize: 11,
                                marginTop: 4,
                                marginRight: 50
                            }}>Steps</Text>
                            <Text style={{ borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                            <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 10, marginRight: 50 }}>{hour_Counter}h  {minutes_Counter}m</Text>
                            <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 4, marginRight: 50 }}>
                                {this.state.startDisable == false ? 'No Active' : 'Active me'}
                            </Text>
                            <Text style={{ marginTop: 4, borderBottomWidth: 0.5, borderColor: '#FFFFFF', opacity: 0.3, marginRight: 15 }}></Text>
                            <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 5, marginRight: 50 }}>{currentCalories == '' ? 0 : Number(currentCalories)}</Text>
                            <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', fontSize: 11, marginTop: 4, marginRight: 30, marginBottom: 5,paddingBottom:5 }}>calories</Text>
                        </View>

                    </TouchableOpacity>

                    <View style={styles.graphContainer}>
                        <Text style={{ color: 'white' }}>Graph Stepcount</Text>
                    </View>
                </ScrollView>
            </View>
            // </View>
        )
    }
}