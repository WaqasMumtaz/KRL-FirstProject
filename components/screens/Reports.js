import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Dimensions,TouchableOpacity, Image } from 'react-native';
import styles from '../Styling/ReportsScreenStyle';
import Wheelspiner from '../Progress Wheel/Progress'
const { height } = Dimensions.get('window');
// const screenWidth=Dimensions.get('window').width;
// const screenHeight=Dimensions.get('window').height;
class Reportscreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    const { navigate } = this.props.navigation;

    return (

      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textStyleOne}>Weekly</Text>
          <Text style={styles.textStyleTwo}>Report</Text>
          {/* <TouchableOpacity><Image /></TouchableOpacity> */}
        </View>
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
          <Text>This week</Text>
          <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
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
                            <Text style={{color:'#FF6200',fontFamily:'MontserratLight'}}>60482</Text>
                            <Text style={{color:'#a6a6a6',fontFamily:'MontserratLight'}}>/70,000</Text>
                          </View>
                          <Text style={{color:'#a6a6a6',fontFamily:'MontserratLight',marginLeft:14}}>steps</Text>
                     </View>
                     <View style={styles.weightStatus}>
                     <Text style={styles.headingText}>Weight{'\n'}status</Text>
                     <View style={styles.statusGraphContainer}>
                               {/* <View style={styles.midBox}>
                               </View>
                             <View style={styles.borderLines1}>
                              </View>          */}
                     </View>
                     </View>
                </View>
                <View style={styles.cardRight}>

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
