import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/LogWeightStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtils from '../Services/HttpUtils';
// import PickDate from '../Common/datePicker';
import DatePicker from 'react-native-datepicker';

const { height } = Dimensions.get('window');

class Logweight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            monthNo: '',
            dayOfMonth: '',
            time: '',
            weight: '',
            day: '',
            userId: '',
            data: '',
            filterData: [],
            weightValidation: false,
            monthArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }
    componentWillMount() {
        let monthNo = new Date().getMonth();
        const day = new Date().getDay();
        const date = new Date().getDate();
        const year = new Date().getFullYear();
        const hours = new Date().getHours();
        const min = new Date().getMinutes();
        const sec = new Date().getSeconds();
        if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
            month = `0${monthNo + 1}`;
        }
        else {
            month = monthNo + 1;
        }
        AsyncStorage.getItem("currentUser").then(value => {
            if (value) {
                let dataFromLocalStorage = JSON.parse(value);
                this.setState({
                    date: date + '-' + month + '-' + year,
                    time: hours + ':' + min + ':' + sec,
                    day: day,
                    userId: dataFromLocalStorage._id,
                    monthNo: monthNo,
                    dayOfMonth: date
                })
            }
        });
        console.log('componentWillMount')
        this.getData()
    }
    addWeight = async () => {
        const { weight, monthNo, monthArr, weekDay, day, userId, date, time, dayOfMonth } = this.state;
        let addWeight = {}
        if (weight == '') {
            this.setState({
                weightValidation: true
            })
        }
        if (weight != '') {
            addWeight.weight = weight;
            addWeight.month = monthArr[monthNo];
            addWeight.day = weekDay[day];
            addWeight.dayOfMonth = dayOfMonth;
            addWeight.date = date;
            addWeight.time = time;
            addWeight.userId = userId;
            this.setState({
                weightValidation: false
            })
            let dataUser = await HttpUtils.post('weightLog', addWeight)
            // console.log(dataUser, 'dataUser')
            this.getData()
        }
    }

    //filtration with date
    dateFilter = async (e) => {
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
                    console.log('condition true')
                    dataArr = [...dataArr, dataFilter]
                    this.setState({
                        filterData: dataArr,
                        date: e
                    })
                }
            }
        }
    }

    getData = async () => {
        let dataUser = await HttpUtils.get('getweightlog')
        console.log(dataUser, 'dataUser from log ')
        await this.setState({
            data: dataUser.content
        })
        await this.dateFilter()
    }
    render() {
        const { weightValidation, date, filterData, data } = this.state;
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Log Weight
                            </Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                            {/* <Text>Today</Text> */}
                            <DatePicker
                                style={{ width: 200 }}
                                date={date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-1950"
                                maxDate={date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"

                                onDateChange={
                                    this.dateFilter
                                    // (date) => { this.setState({ date: date }) }
                                }
                            />
                            <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                        </View>
                        {/* <View> <PickDate /></View> */}
                        <View style={styles.bodyContainer}>
                            <TextInput placeholder="Enter today's weight here" placeholderTextColor="black" style={styles.inputTextStyle}
                                onChangeText={(weight) => this.setState({ weight: weight })}
                            />
                        </View>
                        {weightValidation ?
                            <Text>Please Enter Your Today Weight </Text>
                            : null}
                        <CaloriesSetupBtn title="Save Today's Weight" caloriesBtnStyle={styles.caloriesBtnStyle} onPress={this.addWeight} />
                        <View style={styles.weightListsContainer}>
                            {filterData.length > 0 && filterData.map((elem, key) => (
                                <View style={styles.weightListOne}>
                                    <Text style={styles.weightNumberStyle}>{elem.weight} KG</Text>
                                    <Text style={styles.weightTextStyle}>{`Weight on ${elem.day}, ${elem.month} ${elem.dayOfMonth}th`}</Text>
                                </View>
                            ))
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )

    }
}
export default Logweight;