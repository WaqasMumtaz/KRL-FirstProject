import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput, Picker } from 'react-native';
import styles from '../Styling/PaymentScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import stripe from 'tipsi-stripe';
import { CreditCardInput } from "react-native-credit-card-input";
import HttpUtils from '../Services/HttpUtils';

const { height } = Dimensions.get('window');


class Payment extends React.Component {
  static navigationOptions = (navigation) => {
    // console.log(navigation.navigation.state.params.stripeKey,'Nnnnnnnnn')
    stripe.setOptions({
      publishableKey: navigation.navigation.state.params.stripeKey
    });
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
      currency: '',
      monthArr: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      isLoading: false,
      nameValidation: false,
      emailValidation: false,
      paymentMonth: false,
      amountValidation: false,
      currencyValidation: false
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
    const { name, email, monthArr, paymentMonth, amount, currency, creditCardNo, cvc, expiry, typeCard } = this.state;
    //validation of the form
    if (name == '') {
      this.setState({
        nameValidation: true,
        isLoading: false,
      })
    }
    else {
      this.setState({
        nameValidation: false,
        isLoading: true,
      })
    }
    if (email == '') {
      this.setState({
        emailValidation: true,
        isLoading: false,
      })
    }
    else {
      this.setState({
        emailValidation: false,
        isLoading: true,
      })
    }
    if (paymentMonth == '') {
      this.setState({
        paymentMonthValidation: true,
        isLoading: false,
      })
    }
    else {
      this.setState({
        paymentMonthValidation: false,
        isLoading: true,
      })
    }
    if (amount == '') {
      this.setState({
        amountValidation: true,
        isLoading: false,
      })
    }
    else {
      this.setState({
        amountValidation: false,
        isLoading: true,
      })
    }
    if (currency == '') {
      this.setState({
        currencyValidation: true,
        isLoading: false,
      })
    }
    else {
      this.setState({
        currencyValidation: false,
        isLoading: true,
      })
    }
    //get current year
    const year = new Date().getFullYear();

    //seprate month & year for create token request
    let expMonth = Number(expiry.slice(0, 2));
    let expYear = Number(expiry.slice(3, 5));
    //object for create token
    const params = {
      // mandatory
      number: creditCardNo,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc,
      typeCard: typeCard,
    }
    console.log(params)

    const token = await stripe.createTokenWithCard(params)
    console.log(token, 'token')

    //geting payment month & year
    let monthNumber = Number(paymentMonth)
    
    let paymentMonthYear = `${monthArr[monthNumber]}, ${year}`
    //send object to database
    let paymentObj = {
      name: name,
      email: email,
      paymentMonth: paymentMonthYear,
      amount: amount,
      currency: currency,
      token: token.tokenId
    }
    console.log(paymentObj ,'paymentObj')
    let res = await HttpUtils.post('payment', paymentObj);

    console.log(res, 'payemnt response')
  }
  updateCurrency = (e) => {
    console.log(e, "crrencey")
    this.setState({
      currency: e
    })

  }
  render() {
    const { nameValidation, emailValidation, paymentMonthValidation, amountValidation, currencyValidation, currency } = this.state;
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
              placeholder="Name"
              style={styles.inputTextStyle}
              placeholderColor="#4f4f4f"
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View>
            {nameValidation ?
              <View>
                <Text>
                  Please fill your name
                  </Text>
              </View>
              : null}
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.inputLabelsStyle}>Email</Text>
            <TextInput placeholder="email@gmail.com"
              inputTextStyle={styles.inputTextStyle}
              keyboardType="email-address"
              placeholderColor="#4f4f4f"
              onChangeText={(email) => this.setState({ email })}
            />
          </View>
          <View>
            {emailValidation ?
              <View>
                <Text>
                  Please fill your email
                  </Text>
              </View>
              : null}
          </View>
          <View style={styles.paymentMonthContainer}>
            <Text style={styles.inputLabelsStyle}>Payment For The Month Of</Text>
            <TextInput placeholder="01"
              inputTextStyle={styles.inputTextStyle}
              keyboardType={"numeric"}
              placeholderColor="#4f4f4f"
              onChangeText={(paymentMonth) => this.setState({ paymentMonth })}
            />
          </View>
          <View>
            {paymentMonthValidation ?
              <View>
                <Text>
                  Please fill payment month no:
                  </Text>
              </View>
              : null}
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.inputLabelsStyle}>Amount</Text>
            <TextInput placeholder="USD amount"
              inputTextStyle={styles.inputTextStyle}
              keyboardType={"numeric"}
              placeholderColor="#4f4f4f"
              onChangeText={(amount) => this.setState({ amount })}
            />
            <Picker
              selectedValue={this.state.currency}
              onValueChange={this.updateCurrency}
            // style={styles.pickerStyle}
            >
              <Picker.Item label='Select an currency...' value='0' />
              <Picker.Item label="USD" value="usd" />
            </Picker>
          </View>
          <View>
            {amountValidation ?
              <View>
                <Text>
                  Please fill amount
                  </Text>
              </View>
              : null}
          </View>
          <View>
            {currencyValidation ?
              <View>
                <Text>
                  Please fill currency
                  </Text>
              </View>
              : null}
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