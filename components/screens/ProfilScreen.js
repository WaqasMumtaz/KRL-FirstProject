import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';
const { height } = Dimensions.get('window');
let checkProfile = false;

class Profile extends React.Component {
  static navigationOptions = (navigation) => {
    const { params = {} } = navigation.navigation.state;
    let headerRight;
    if (params.opponentProfile) {
      checkProfile = params.opponentProfile;
    }
    else {
      checkProfile = false;
      headerRight = <TouchableOpacity
        style={styles.headerIconContainer}
        onPress={
          params.showEditForm
        }
      >
        <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon} />
      </TouchableOpacity>
    }
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
      address: '',
      contactNo: '',
      email: '',
      gender: '',
      type: '',
      avatarSource: '',
      show: false,
      title: '',
      checkProfile: false,
      profileData: '',
      profile: ''
    }
  }

  componentWillMount() {
    const { senderData } = this.props.navigation.state.params;

    if (checkProfile) {
      // AsyncStorage.getItem('opponentProfile').then((value) => {
      //   let userData = JSON.parse(value);
        if (senderData) {
          this.setState({
            name: senderData.name,
            address: senderData.address,
            contactNo: senderData.contactNo,
            email: senderData.email,
            gender: senderData.gender,
            avatarSource: senderData.image,
            type: senderData.type,
            title: senderData.type,
            profileData: senderData,
            profile: 'opponentProfile'
          })
        }
      // })
    }
    else {
      AsyncStorage.getItem('myProfile').then((value) => {
        let userData = JSON.parse(value);
        if (value) {
          this.setState({
            name: userData.name,
            address: userData.address,
            contactNo: userData.contactNo,
            email: userData.email,
            gender: userData.gender,
            type: userData.type,
            avatarSource: userData.image,
            title: 'My',
            profileData: userData,
            profile: 'myProfile'
          })
        }
      })
    }

  }
  editForm = () => {
    const { profileData, profile } = this.state;
    this.props.navigation.navigate('EditProfileScreen', {
      profileData: profileData,
      profile: profile
    });
    // this.props.navigation.navigate('EditProfileScreen');
  }

  componentDidMount() {
    const { show } = this.state;
    this.props.navigation.setParams({ showEditForm: this.editForm, })
  }

  render() {
    const { show, name, type, address, contactNo, email, gender, avatarSource, title } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>
            {`${title} Profile`}
          </Text>
        </View>
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.profileContainer}>
            <View style={styles.profilPicContainer}>
              {
                avatarSource != '' ?
                  <Image style={styles.profilPicStyle} source={{ uri: `${avatarSource}` }} />
                  :
                  <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
              }
              <View style={styles.nameContainer}>
                <Text style={styles.nameStyle}>{name}</Text>
              </View>
              <View style={styles.userTitle}>
                <Text style={styles.userTitleStyle}>{type}</Text>
              </View>
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            <View>
              <Text style={styles.labelStyle}>Email</Text>
              <Text style={styles.userInsertedValueStyle}>{email}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Address</Text>
              <Text style={styles.userInsertedValueStyle}>{address}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Contact Number</Text>
              <Text style={styles.userInsertedValueStyle}>{contactNo}</Text>
            </View>
            <View style={styles.viewBlock}>
              <Text style={styles.labelStyle}>Gender</Text>
              <Text style={styles.userInsertedValueStyle}>{gender}</Text>
            </View>
          </View>
        </ScrollView>


      </View>
    )
  }

}

export default Profile;