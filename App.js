
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import AppContainer from './components/navigation/StackNavigation';
import SplashScreen from 'react-native-splash-screen'
import * as firebase from 'firebase';
import config from './Config/ApiKeys';
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillMount() {
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let userData = JSON.parse(value);
        userData.status = 'Online'
        // console.log(userData, 'userData');
        // console.log("start")
        db.ref(`users/${userData._id}`).update(userData);
      }
    })
  }

  componentWillUnmount() {
    console.log("end")
  }

  render() {
    return <AppContainer />
  }
}

export default App;