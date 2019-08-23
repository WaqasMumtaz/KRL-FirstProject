import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity,} from 'react-native';
import TextInputs from '../textInputs/TextInputs';
// import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/PaymentScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
 import stripe from 'tipsi-stripe';
const { height } = Dimensions.get('window');


stripe.setOptions({
  publishableKey: "pk_test_YspkzacmUJ26Adtvg8zkV0pC00Twd5LQRR"
});

class Payment extends React.Component{
  static navigationOptions =(navigation)=> {   
    //const { params = {} } = navigation.state;
    const {navigate} = navigation.navigation.navigate
return{
    // headerRight:
    //      <TouchableOpacity style={styles.headerIconContainer}>
    //          <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
    //      </TouchableOpacity>,
 
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
           <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
            <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                        Payment
                            </Text>
                    </View>
           
               <View style={styles.paraTextContainer}>
                 <Text style={styles.inputLabelsStyle}>Enter your credit/debit cart details below to pay for your subscription.</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.inputLabelsStyle}>Name</Text>
                <TextInputs placeholder="Waqas Mumtaz" 
                inputTextStyle={styles.inputTextStyle} 
                keyboardType="default"
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.emailContainer}>
                <Text style={styles.inputLabelsStyle}>Email</Text>
                <TextInputs placeholder="waqas@gmail.com" 
                inputTextStyle={styles.inputTextStyle} 
                keyboardType="email-address"
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.paymentMonthContainer}>
               <Text style={styles.inputLabelsStyle}>Payment For The Month Of</Text>
               <TextInputs placeholder="May, 2019" 
                inputTextStyle={styles.inputTextStyle} 
                keyboardType="default"
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.amountContainer}>
               <Text style={styles.inputLabelsStyle}>Amount</Text>
               <TextInputs placeholder="PkR xxx" 
                inputTextStyle={styles.inputTextStyle}
                keyboardType="default" 
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.cardContainer}>
               <Text style={styles.inputLabelsStyle}>Credit/Debit Card Number</Text>
               <TextInputs placeholder="xxxx xxxx xxxx xxxx" 
                inputTextStyle={styles.inputTextStyle} 
                keyboardType="numeric"
                placeholderColor="#4f4f4f"
                />
              </View>
              <View style={styles.validContainer}>
                   <View style={styles.validThru}>
                   <Text>Valid Thru</Text>
                   <TextInputs placeholder="04/2" 
                     inputTextStyle={styles.inputTextStyle} 
                     placeholderColor="#4f4f4f"
                />
                   </View>
                   <View style={styles.cvv}>
                    <Text>CVV</Text>   
                   <TextInputs placeholder="xxx" 
                     inputTextStyle={styles.inputTextStyle} 
                     placeholderColor="#4f4f4f"
                />
                   </View>
              </View>
              <View style={styles.btnContainer}>
              <CaloriesSetupBtn title='Confirm And Pay' caloriesBtnStyle={styles.caloriesBtnStyle}/>  
              </View>

              <View style={styles.blankContainer}>
                     
              </View>
              

           </ScrollView>
          </View>
        )
 }
 
}

export default Payment;