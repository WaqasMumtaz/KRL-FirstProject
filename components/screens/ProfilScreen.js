import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';


const { height } = Dimensions.get('window');

class Profile extends React.Component {
  static navigationOptions = (navigation) => {
    const { params = {} } = navigation.navigation.state;
    console.log(params);
    let headerRight = <TouchableOpacity
      style={styles.headerIconContainer}
      onPress={
        params.showEditForm
      }
    >
      <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon} />
    </TouchableOpacity>
    return {
      headerRight,
      headerStyle: {
        backgroundColor: 'white'

      },
      headerTintColor: 'gray',
    }


  }
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      show: false
    }

  }

  componentWillMount() {
    AsyncStorage.getItem('currentUser').then((value) => {
      let userData = JSON.parse(value);
      let userName = userData.name;
      this.setState({
        name: userName
      })
    })

  }
  editForm = () => {
    console.log('helloo')
    this.props.navigation.navigate('EditProfileScreen');


  }

  componentDidMount() {
    const { show } = this.state;
    this.props.navigation.setParams({ showEditForm: this.editForm, })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { show } = this.state;
    // console.log(routes);
    return (

      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>
            My Profile
                            </Text>
        </View>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white', height: height
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profilPicContainer}>
              <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
              <View style={styles.nameContainer}>
                <Text style={styles.nameStyle}>{this.state.name}</Text>
              </View>
              <View style={styles.userTitle}>
                <Text style={styles.userTitleStyle}>Trainee</Text>
              </View>
            </View>
          </View>
          <View style={styles.userInfoContainer}>
                 <View>
                   <Text style={styles.labelStyle}>Email</Text>
                   <Text style={styles.userInsertedValueStyle}>waqas@gmail.com</Text>
                 </View>
                 <View style={styles.viewBlock}>
                   <Text style={styles.labelStyle}>Address</Text>
                   <Text style={styles.userInsertedValueStyle}>57-C, Lane 15 , khayban-e-badar , DHA , Karachi</Text>
                 </View>
                 <View style={styles.viewBlock}>
                   <Text style={styles.labelStyle}>Contact Number</Text>
                   <Text style={styles.userInsertedValueStyle}>0333-444444443</Text>
                 </View>
                 <View style={styles.viewBlock}>
                   <Text style={styles.labelStyle}>Gender</Text>
                   <Text style={styles.userInsertedValueStyle}>Male</Text>
                 </View>
          </View>
        </ScrollView>


      </View>
    )
  }

}

export default Profile;