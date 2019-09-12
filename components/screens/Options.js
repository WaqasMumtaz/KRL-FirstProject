import React from 'react';
import { StyleSheet, Text, View,Button,ScrollView,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Styling/OptionsScreenStyle';
import DrawerNav from '../navigation/DrawerNav';
import HttpUtils from '../Services/HttpUtils';

//import AppContainer from '../navigation/MainNavigate';
// const screenWidth=Dimensions.get('window').width;
// const screenHeight=Dimensions.get('window').height;
const { height } = Dimensions.get('window');
class Options extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      publicKeys:''
    }
  }
static navigationOptions={
 }
componentWillMount(){
  this.getPaymentKey();  
 }

getPaymentKey = async () =>{
    let res = await HttpUtils.get('keys');
    console.log(res , 'keys')
    this.setState({
      publicKeys:res.keys
    })
 }
 paymentScreen =() =>{
  const { navigate } = this.props.navigation;
  navigate('Payment', {
    stripeKey:this.state.publicKeys
});
  // navigate('Payment')

 }
   render() {
     const { navigate } = this.props.navigation;
     const { publicKeys } = this.state
       return (
         <View style={styles.container}>
           <View style={styles.childContainer}>
                <View style={styles.heading}><Text style={styles.headingText}>More Options</Text></View>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity onPress={()=>{navigate('Macrocalculator')}}><Text style={styles.forText}>Calories Limit</Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity onPress={()=>{navigate('BMICalculator')}}><Text style={styles.forText}>BMI Calculator</Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity onPress={()=>{navigate('Profile')}}><Text style={styles.forText}>Profile</Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}>
                  <TouchableOpacity
                  onPress={this.paymentScreen} 
                  // onPress={()=>{navigate('Payment'),{stripeKey:publicKeys}} }
                  >
                  <Text style={styles.forText}>Payment </Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity  onPress={()=>{navigate('InvoicesScreen')}}><Text style={styles.forText}>Invoices</Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity  onPress={()=>{navigate('LogMeasurementsScreen')}}><Text style={styles.forText}>Log Measurements</Text></TouchableOpacity></View>
                <View style={{flex:0.6,flexDirection:'row'}}><TouchableOpacity onPress={()=>{navigate('SettingScreen')}}><Text style={styles.forText}>Settings</Text></TouchableOpacity></View>
                </ScrollView>
           </View>
           {/* <Button title='Create Account' onPress={()=>navigate('Signup')}/>  */}
         </View>
       );
     }
}
export default Options;