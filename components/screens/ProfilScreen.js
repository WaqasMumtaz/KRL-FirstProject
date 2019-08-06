import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';

let imageTag;
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
        address:'',
        contactNo:'',
        email:'',
        gender:'',
        type:'',
        avatarSource : '',
        show: false
      }

  }

  componentWillMount() {
    AsyncStorage.getItem('myProfile').then((value) => {
      let userData = JSON.parse(value);
      console.log(userData ,'userData')
      this.setState({
        // name: userData.name,
        address:userData.address,
        contactNo:userData.contactNo,
        email:userData.email,
        gender:userData.gender,
        type:userData.type.toUpperCase(),
        avatarSource:userData.image            
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
    const { show , name , type , address , contactNo , email , gender , avatarSource} = this.state;
    console.log(imageTag)
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
              {/* <Image
              source = {avtarImage}
              //  source={avtarImage != '' ? avtarImage : require('../icons/profile.png')} 
               style={styles.profilPicStyle} /> */}
                {
                  avatarSource != '' ? 
                    <Image source={avatarSource} style={styles.profilPicStyle} />
                  :
                    <Image source={require('../icons/profile.png')} style={styles.profilPicStyle}/>
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