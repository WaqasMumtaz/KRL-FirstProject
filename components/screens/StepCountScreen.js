import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity } from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/StepCountScreenStyle';
import DatePicker from 'react-native-datepicker';
import HttpUtils from '../Services/HttpUtils';
//const Pedometer = require('../Pedometer/Pedometer');
const { height } = Dimensions.get('window');
const date = new Date().getDate();
//Pedometer.startPedometerUpdatesFromDate(date)



export default class StepCountScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            data: '',
            curTime:'',
            filterData: [],
            pedometerData:''
        }




    }


    async componentWillMount() {
        await this.getData()
        this.dateFilter()

        const hours = new Date().getHours(); //Current Hours
        const min = new Date().getMinutes(); //Current Minutes
        const sec = new Date().getSeconds(); //Current Seconds


        this.setState({
            curTime:hours + ':' + min + ':' + sec
        })
       
        //this._startPedometer

    }

    //get data from database
    getData = async () => {
        const date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
            month = `0${month}`
        }
        let dataUser = await HttpUtils.get('getallexerciselog')
        console.log(dataUser, 'dataUser from log get ')
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

        
   
// _startPedometer=()=>{
//     const { curTime } = this.state;
//     console.log(curTime)
//      Pedometer.startPedometerUpdatesFromDate(curTime, (pedometerData) => {
//     console.log(pedometerData)
          
// })
    

//}
// componentDidMount(){
//     this._startPedometer()
// }
    render() {
        const { date, filterData,pedometerData } = this.state;
        console.log('current Date -->>',date ,'pedometerData -->>',pedometerData)
        return (
            <View style={styles.mainContainer}>
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
                    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                        <TouchableOpacity 
                        style={styles.stepCountContainer} 
                        activeOpacity={0.7}
                        onPress={this._startPedometer}
                        >
                            <View style={styles.progressWhelContainer} >
                                <Wheelspiner
                                    size={90}
                                    width={12}
                                    color={'#FF6200'}
                                    progress={60}
                                    backgroundColor={'gray'}
                                    animateFromValue={0}
                                    fullColor={'#FF6200'}
                                />
                            </View>
                            <View style={styles.stepCountData}>
                                <View style={{ flexDirection: 'row',marginRight:50 }}>
                                    <Text style={{
                                        color: '#FF6200',
                                        fontFamily: 'MontserratLight',
                                        fontSize: 11
                                    }}>6842</Text>
                                    <Text style={{ 
                                         color: '#a6a6a6', 
                                         fontFamily: 'MontserratLight',
                                         fontSize: 11
                                         }}>/10,000</Text>
                                </View>
                                <Text style={{ color: '#a6a6a6', 
                                         fontFamily: 'MontserratLight',
                                         fontSize: 11,
                                         marginTop:4,
                                         marginRight:50
                                         }}>Steps</Text>
                                <Text style={{ borderBottomWidth:0.5,borderColor:'#FFFFFF',opacity:0.3,marginRight:15}}></Text>  
                                <Text style={{color:'#a6a6a6',fontFamily: 'MontserratLight',fontSize: 11,marginTop:10,marginRight:50}}>Oh 27m</Text>
                                <Text style={{color:'#a6a6a6',fontFamily: 'MontserratLight',fontSize: 11,marginTop:4,marginRight:50}}>Active me</Text>  
                                <Text style={{marginTop:4,borderBottomWidth:0.5,borderColor:'#FFFFFF',opacity:0.3,marginRight:15}}></Text> 
                                <Text style={{color:'#a6a6a6',fontFamily: 'MontserratLight',fontSize: 11,marginTop:5,marginRight:50}}>97</Text>
                                <Text style={{color:'#a6a6a6',fontFamily: 'MontserratLight',fontSize: 11,marginTop:4,marginRight:30,marginBottom:5}}>calories</Text>                         
                            </View>

                        </TouchableOpacity>

                         <View style={styles.graphContainer}>
                           <Text style={{color:'white'}}>Graph Stepcount</Text>
                         </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}