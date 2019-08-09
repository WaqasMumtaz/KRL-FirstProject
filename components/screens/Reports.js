import React from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import styles from '../Styling/ReportsScreenStyle';
import Wheelspiner from '../Progress Wheel/Progress';
import ChartScreen from '../BarChart/BarChart';
import HttpUtils from '../Services/HttpUtils';
import AsyncStorage from '@react-native-community/async-storage';

const { height } = Dimensions.get('window');

class Reportscreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      dataExcersices: [],
      currentDateDataWeights: [],
      weekAgoDateDataWeights: [],
      monthName: ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"]
    }
  }
  async componentWillMount() {
    await this.getData()
  }

  //get data from database
  getData = async () => {
    const { monthName } = this.state;
    let dataExcersiceArr = [];
    let userId;
    let weekBefore;
    let cureentWeek;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let dataFromLocalStorage = JSON.parse(value);
        userId = dataFromLocalStorage._id;
      }
    });
    let dataExcersice = await HttpUtils.get('getallexerciselog');
    let dataWeight = await HttpUtils.get('getweightlog');
    let data = dataExcersice.content;
    let weightData = dataWeight.content;
    const currentDayOfWeek = new Date().getDay() + 1;
    const currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3 || currentMonth == 4 || currentMonth == 5 ||
      currentMonth == 6 || currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
      currentMonth = `0${currentMonth}`
    }

    //getting weekly excersices 
    for (var i in data) {
      let dataApi = data[i];
      if (dataApi.userId == userId) {
        //get month name
        let getMonthNo = dataApi.month.slice(1) - 1;
        let getMontName = monthName[getMonthNo];
        dataApi.monthName = getMontName;
        //check week of the month
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currentMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        if (checkDate == 0 || checkDate == -1 || checkDate == -2 || checkDate == -3 || checkDate == -4 || checkDate == -5 ||
          checkDate == -6 || checkDate == -7 && checkMonth == 0 && checkYear == 0) {
          dataExcersiceArr = [...dataExcersiceArr, dataApi];
          this.setState({
            dataExcersices: dataExcersiceArr
          })
        }
      }
    }

    //get week wise data and show bar chart line 
    for (var i in weightData) {
      let dataApi = weightData[i];
      if (dataApi.userId == userId) {
        //check week of the month
        let checkWeekDay = currentDayOfWeek - dataApi.dayOfWeek;
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currentMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        if (checkWeekDay == 1 || checkWeekDay == -1 || checkWeekDay == 2 || checkWeekDay == -2 ||
          checkWeekDay == 3 || checkWeekDay == -3 || checkWeekDay == 4 || checkWeekDay == -4 || checkWeekDay == 5 ||
          checkWeekDay == -5 || checkWeekDay == 6 || checkWeekDay == -6 || checkWeekDay == 7 || checkWeekDay == -7
          && checkMonth == 0 && checkYear == 0) {
          weekBefore = dataApi
          this.setState({
            dataWeights: weekBefore
          })
        }
        if (checkDate == 0 && checkMonth == 0 && checkYear == 0) {
          cureentWeek = dataApi
          this.setState({
            currentDateDataWeights: cureentWeek
          })
        }
      }
    }
    let loseWeight = weekBefore.weight.slice(0, 1) - cureentWeek.weight.slice(0, 1);
    console.log(loseWeight, 'loseWeight')
  }
  render() {
    const { dataExcersices, currentDateDataWeights, dataWeights } = this.state;
    const { navigate } = this.props.navigation;
    console.log(dataWeights, 'dataWeights')
    console.log(currentDateDataWeights, 'currentDateDataWeights')


    let weeklyExcersice = dataExcersices && dataExcersices.map((elem, key) => {
      return (
        <View style={styles.exerciseResultCard}>
          <Text style={styles.resultHeading}>
            {elem.exerciseName}
          </Text>
          <View style={styles.dataResultParent}>
            <View style={styles.timeShowContainer}>
              <Text style={styles.timeShow}>
                {`${elem.exerciseAmount} ${elem.exerciseUnit}`}
              </Text>
            </View>
            <View style={styles.dateAndMonth}>
              <Text maxLength={3} style={styles.dateAndMonthShow}>
                {elem.monthName}
              </Text>
              <Text style={styles.dateNumber}>
                {elem.dayOfMonth}
              </Text>
              <Text style={styles.superScriptTextStyle}>
                {elem.dayOfMonth == 1 ? 'st' : elem.dayOfMonth == 2 ? '2nd' : elem.dayOfMonth == 3 ? 'rd' : 'th'}
              </Text>
            </View>
          </View>
        </View>
      )
    });
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textStyleOne}>Weekly</Text>
          <Text style={styles.textStyleTwo}>Report</Text>
          {/* <TouchableOpacity><Image /></TouchableOpacity> */}
        </View>
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
          <Text>This week</Text>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
          <View style={styles.bodyContainer}>
            <View style={styles.cardLeft}>
              <View style={styles.weeklyStepWalk}>
                <Text style={styles.headingText}>Total steps walked</Text>
                <View style={styles.spinerContainer}>
                  <Wheelspiner />
                </View>
                <View style={styles.resultContainer}>
                  <Text style={{ color: '#FF6200', fontFamily: 'MontserratLight' }}>60482</Text>
                  <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight' }}>/70,000</Text>
                </View>
                <Text style={{ color: '#a6a6a6', fontFamily: 'MontserratLight', marginLeft: 14 }}>steps</Text>
              </View>
              <View style={styles.weightStatus}>
                <Text style={styles.headingText}>Weight{'\n'}status</Text>
                <View style={styles.statusGraphContainer}>
                  <View style={styles.midBox}>
                    <ChartScreen />
                  </View>
                  <View style={styles.borderLines1}>
                    <Text style={styles.kgTextOne}>64 KG</Text>
                    <Text style={styles.kgTextTwo}>64.5 KG</Text>
                  </View>
                  <View style={styles.weeksTextContainer}>
                    <Text style={styles.thisWeek}>This week</Text>
                    <Text style={styles.lastWeek}>Last week</Text>
                  </View>
                  <Text style={styles.lostKg}>0.5 Kg</Text>
                  <Text style={styles.lostText}>Lost</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.totalExerciseContainer}>
                <Text style={styles.totalExercisHeading}>Total exercise{'\n'}done</Text>
                {weeklyExcersice}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Reportscreen;
