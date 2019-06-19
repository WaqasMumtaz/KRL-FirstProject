import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity,} from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/ProfilScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
const { height } = Dimensions.get('window');

class Profile extends React.Component{
  static navigationOptions =(navigation)=> {   
    //const { params = {} } = navigation.state;
    const {navigate} = navigation.navigation.navigate
return{
    headerRight:
         <TouchableOpacity style={styles.headerIconContainer}>
             <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
         </TouchableOpacity>,
 
    headerStyle: {
        backgroundColor: 'white'
       
      },
     headerTintColor:'gray',
}   

  }
   constructor(props){
     super(props);

   }
  //  onChangeTab=(value)=>{
  //   console.log(value)
  // }
    render() {
      const {navigate}=this.props.navigation;
      
      // console.log(routes);
        return (
          
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                          My Profile
                            </Text>
                    </View>
           <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
           
              <View style={styles.profilPicContainer}>
                  <Image source={require('../icons/Profil.jpg')} style={styles.profilPicStyle}/>
                  <View style={styles.nameContainer}>
                   <Text style={styles.nameStyle}>Waqas Mumtaz</Text>
                  </View>
                  <View style={styles.userTitle}>
                    <Text style={styles.userTitleStyle}>Trainee</Text>
                  </View>
              </View>
              <View style={styles.emailContainer}>
                <Text style={styles.inputLabelsStyle}>Email</Text>
                <TextInputs placeholder="waqas@gmail.com" 
                inputTextStyle={styles.inputTextStyle} 
                keyboardType="email-address"
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.passwrdContainer}>
                <Text style={styles.inputLabelsStyle}>Password</Text>
                <TextInputs placeholder="password" 
                inputTextStyle={styles.inputTextStyle} 
                secureTextEntry={true}
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.addressContainer}>
               <Text style={styles.inputLabelsStyle}>Address</Text>
               <TextInputs placeholder="Type here your address..." 
                inputTextStyle={styles.inputTextStyle} 
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.contactNumberContainer}>
               <Text style={styles.inputLabelsStyle}>Contact Number</Text>
               <TextInputs placeholder="+92-333-1122223" 
                inputTextStyle={styles.inputTextStyle} 
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.genderContainer}>
               <Text style={styles.inputLabelsStyle}>Gender</Text>
               <TextInputs placeholder="Male" 
                inputTextStyle={styles.inputTextStyle} 
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.btnContainer}>
              <CaloriesSetupBtn title='Set Up & Use App' caloriesBtnStyle={styles.caloriesBtnStyle}/>  
              </View>

              <View style={styles.blankContainer}>
                     
              </View>
              

           </ScrollView>
          </View>
        )
 }
 
}

export default Profile;