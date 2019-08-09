import React from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import styles from '../Styling/ReportsScreenStyle';
import Wheelspiner from '../Progress Wheel/Progress';
import ChartScreen from '../BarChart/BarChart';
import HttpUtils from '../Services/HttpUtils';
const { height } = Dimensions.get('window');

class Reportscreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      data: [],
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
    let dataArr = [];
    let dataUser = await HttpUtils.get('getallexerciselog');
    let data = dataUser.content;
    const currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3 || currentMonth == 4 || currentMonth == 5 || currentMonth == 6 || currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
      currentMonth = `0${currentMonth}`
    }
    for (var i in data) {
      let dataApi = data[i];
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
        dataArr = [...dataArr, dataApi];
        this.setState({
          data: dataArr
        })
      }

    }
  }
  render() {
    const { data } = this.state;
    const { navigate } = this.props.navigation;
    let weeklyExcersice = data && data.map((elem, key) => {
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
                {/* <View> */}
                <Text style={styles.headingText}>Weight{'\n'}status</Text>
                <View style={styles.statusGraphContainer}>
                  <View style={styles.midBox}>
                    {/* <Text style={styles.headingText}>Chart</Text> */}
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
                {/* {data && data.map((elem, key) => {
                  return (
                    <View style={styles.exerciseResultCard}>
                      <Text style={styles.resultHeading}>
                        {elem.exerciseName}
                      </Text>
                      <View style={styles.dataResultParent}>
                        <View style={styles.timeShowContainer}>
                          <Text style={styles.timeShow}>{`${elem.exerciseAmount} ${elem.exerciseUnit}`}</Text>
                        </View>
                        <View style={styles.dateAndMonth}>
                          <Text maxLength={3} style={styles.dateAndMonthShow}>May</Text>
                          <Text style={styles.dateNumber}>{elem.dayOfMonth}</Text>
                          <Text style={styles.superScriptTextStyle}>th</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
                } */}
                {/* <View style={styles.exerciseResultCard}>
                  <Text style={styles.resultHeading}>
                    Brisk Walk
                      </Text>
                  <View style={styles.dataResultParent}>
                    <View style={styles.timeShowContainer}>
                      <Text style={styles.timeShow}>30 minutes</Text>
                    </View>
                    <View style={styles.dateAndMonth}>
                      <Text maxLength={3} style={styles.dateAndMonthShow}>May</Text>
                      <Text style={styles.dateNumber}>20</Text>
                      <Text style={styles.superScriptTextStyle}>th</Text>
                    </View>
                  </View>
                </View> */}
                {/* <View style={styles.exerciseResultCard}>
                  <Text style={styles.resultHeading}>
                    Push Ups
                      </Text>
                  <View style={styles.dataResultParent}>
                    <View style={styles.timeShowContainer}>
                      <Text style={styles.timeShow}>30 minutes</Text>
                    </View>
                    <View style={styles.dateAndMonth}>
                      <Text maxLength={3} style={styles.dateAndMonthShow}>May</Text>
                      <Text style={styles.dateNumber}>20</Text>
                      <Text style={styles.superScriptTextStyle}>th</Text>
                    </View>
                  </View>
                </View> */}
                {/* <View style={styles.exerciseResultCard}>
                  <Text style={styles.resultHeading}>
                    High Intensity Run
                      </Text>
                  <View style={styles.dataResultParent}>
                    <View style={styles.timeShowContainer}>
                      <Text style={styles.timeShow}>30 minutes</Text>
                    </View>
                    <View style={styles.dateAndMonth}>
                      <Text maxLength={3} style={styles.dateAndMonthShow}>May</Text>
                      <Text style={styles.dateNumber}>20</Text>
                      <Text style={styles.superScriptTextStyle}>th</Text>
                    </View>
                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

    );
  }
}

export default Reportscreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//     width:screenWidth,
//     height:screenHeight
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color:'#FFF'
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
