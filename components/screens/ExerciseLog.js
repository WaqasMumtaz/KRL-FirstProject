import React from 'react';
import { Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../Styling/ExerciseLogStyle';
import HttpUtils from '../Services/HttpUtils';
const { height } = Dimensions.get('window');

class Exerciselog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            data: '',
            filterData: []
        }
    }

    async componentWillMount() {
        await this.getData()
        this.dateFilter()
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
    render() {
        const { date, filterData } = this.state;
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Exercise Log
                            </Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                            {/* <Text>Today</Text> */}
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
                                    width:0,
                                    height:0,
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
                            <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                        </View>

                        {filterData.length >= 0 && filterData.map((elem, key) => {
                            return (
                                <View style={styles.bodyContainer}>
                                    {
                                        key % 2 == 0 ?
                                            // <View style={styles.bodyChildOne}>
                                            //     <TouchableOpacity style={styles.resultCardLeft}>
                                            //         <Text style={styles.resultText}>
                                            //             {elem.exerciseName}
                                            //         </Text>
                                            //         <Text style={styles.resultTextAmount}>
                                            //             {elem.exerciseAmount}
                                            //         </Text>
                                            //         <Text style={styles.resultTextUnit}>
                                            //             {elem.exerciseUnit}
                                            //         </Text>
                                            //     </TouchableOpacity>
                                            // </View>
                                            <View>
                                                <TouchableOpacity>
                                                    <Text>
                                                        {elem.exerciseName}
                                                    </Text>
                                                    <Text>
                                                        {elem.exerciseAmount}
                                                    </Text>
                                                    <Text>
                                                        {elem.exerciseUnit}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            // <View style={styles.bodyChildTwo}>
                                            //     <TouchableOpacity style={styles.resultCardRight}>
                                            //         <Text style={styles.resultText}>
                                            //             {elem.exerciseName}
                                            //         </Text>
                                            //         <Text style={styles.resultTextAmount}>
                                            //             {elem.exerciseAmount}
                                            //         </Text>
                                            //         <Text style={styles.resultTextUnit}>
                                            //             {elem.exerciseUnit}
                                            //         </Text>
                                            //     </TouchableOpacity>
                                            // </View>
                                            <View >
                                                <TouchableOpacity>
                                                    <Text>
                                                        {elem.exerciseName}
                                                    </Text>
                                                    <Text>
                                                        {elem.exerciseAmount}
                                                    </Text>
                                                    <Text>
                                                        {elem.exerciseUnit}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </View>)
                        })
                        }

                        {/* <View style={styles.bodyContainer}>
                            <View style={styles.bodyChildOne}>
                                <TouchableOpacity style={styles.resultCardLeft}>
                                    <Text style={styles.resultText}>
                                        Push Ups
                                     </Text>
                                    <Text style={styles.resultTextAmount}>
                                        24
                                     </Text>
                                    <Text style={styles.resultTextUnit}>
                                        Reps
                                     </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyChildTwo}>
                                <TouchableOpacity style={styles.resultCardRight}>
                                    <Text style={styles.resultText}>
                                        Push Ups
                                 </Text>
                                    <Text style={styles.resultTextAmount}>
                                        24
                                 </Text>
                                    <Text style={styles.resultTextUnit}>
                                        Reps
                                 </Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default Exerciselog;

