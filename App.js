
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppContainer from './components/navigation/StackNavigation';
import SplashScreen from 'react-native-splash-screen'
//import ChartScreen from './components/BarChart/BarChart';
import config from './Config/ApiKeys';
//import reactNativePedometer from './components/Pedometer/checkFile'
// import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';


class App extends Component {
  constructor(props){
    super(props);

    if(!firebase.apps.length) {
      //console.log(!firebase.apps.length)
     // firebase.initializeApp(ApiKeys.FirebaseConfig);
      firebase.initializeApp(config);
      //console.log(firebase.initializeApp)
    }
   

  }
  componentDidMount () {
    SplashScreen.hide();
}
  componentWillMount(){
    // SplashScreen.apply()
    console.log("start")
    // Lifecycle.Event.ON_START
  }
  componentWillUnmount(){
    console.log("end")

  }
  

 render() {
    return <AppContainer/>
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
