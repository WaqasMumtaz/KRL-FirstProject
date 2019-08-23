import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import styles from '../Styling/PaymentScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import { stripeModule } from 'tipsi-stripe';
import stripe from 'tipsi-stripe'
import { CreditCardInput } from "react-native-credit-card-input";

const { height } = Dimensions.get('window');


stripe.setOptions({
  publishableKey: "pk_test_YspkzacmUJ26Adtvg8zkV0pC00Twd5LQRR"
});

class Payment extends React.Component {
  static navigationOptions = (navigation) => {
    //const { params = {} } = navigation.state;
    const { navigate } = navigation.navigation.navigate
    return {
      // headerRight:
      //      <TouchableOpacity style={styles.headerIconContainer}>
      //          <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
      //      </TouchableOpacity>,

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
      email: '',
      paymentMonth: '',
      amount: '',
      creditCardNo: "",
      cvc: "",
      expiry: "",
      typeCard: "",
      currencey: ''
    }
  }
  cardDetail = (e) => {
    if (e.status.number == 'valid' && e.status.expiry == 'valid' && e.status.cvc == 'valid' && e.valid == true) {
      this.setState({
        creditCardNo: e.values.number,
        cvc: e.values.cvc,
        expiry: e.values.expiry,
        typeCard: e.values.type,
      })
    }
  }
  pay = async () => {
    const { name, email, paymentMonth, amount, currencey, creditCardNo, cvc, expiry, typeCard } = this.state;
    // console.log(expiry, 'expiry')
    // console.log(expiry.slice(0, 2), 'month')
    // console.log(expiry.slice(3, 5), 'year')
    // let expMonth = Number(expiry.slice(0, 2));
    // let expYear = Number(expiry.slice(3, 5));

    // const params = {
    //   // mandatory
    //   number: creditCardNo,
    //   expMonth: expMonth,
    //   expYear: expYear,
    //   cvc: cvc,
    //   typeCard: typeCard,
    //   // optional
    //   name: name,
    //   email: email,
    //   paymentMonth: paymentMonth,
    //   amount: amount,
    //   currency: currencey,
    // }
    const params = {
      // mandatory
      number: '4242424242424242',
      expMonth: 11,
      expYear: 20,
      cvc: '223',
      // optional
      name: 'Test User',
      currency: 'usd',
      addressLine1: '123 Test Street',
      addressLine2: 'Apt. 5',
      addressCity: 'Test City',
      addressState: 'Test State',
      addressCountry: 'Test Country',
      addressZip: '55555',
    }
    console.log(params)


    const token = await stripeModule.canMakeNativePayPayments(params)
    console.log(token, 'token')
    // const token = await stripe.createTokenWithCard(params)
    // console.log(token, 'token')

    // stripe.createTokenWithCard(params).then(function(result) {
    //   // Handle result.error or result.token

    //   console.log(result,'checking')
    // });

  }
  render() {
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
            <TextInput
              placeholder="Waqas Mumtaz"
              style={styles.inputTextStyle}
              placeholderColor="#4f4f4f"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.inputLabelsStyle}>Email</Text>
            <TextInput placeholder="waqas@gmail.com"
              inputTextStyle={styles.inputTextStyle}
              keyboardType="email-address"
              placeholderColor="#4f4f4f"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View style={styles.paymentMonthContainer}>
            <Text style={styles.inputLabelsStyle}>Payment For The Month Of</Text>
            <TextInput placeholder="May, 2019"
              inputTextStyle={styles.inputTextStyle}
              keyboardType="default"
              placeholderColor="#4f4f4f"
              onChangeText={(paymentMonth) => this.setState({ paymentMonth })}
            />
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.inputLabelsStyle}>Amount</Text>
            <TextInput placeholder="PkR xxx"
              inputTextStyle={styles.inputTextStyle}
              keyboardType="default"
              placeholderColor="#4f4f4f"
              onChangeText={(amount) => this.setState({ amount })}
            />
          </View>
          <View style={styles.cardContainer}>
            <CreditCardInput
              onChange={this.cardDetail}
            />

          </View>
          {/* <View style={styles.cardContainer}>
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
          </View> */}
          <View style={styles.btnContainer}>
            <CaloriesSetupBtn title='Confirm And Pay'
              onPress={this.pay}
              caloriesBtnStyle={styles.caloriesBtnStyle} />
          </View>

          <View style={styles.blankContainer}>

          </View>


        </ScrollView>
      </View>
    )
  }

}

export default Payment;