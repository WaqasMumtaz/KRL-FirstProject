import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Dimensions, TextInput, Picker, TouchableOpacity } from 'react-native';
import styles from '../Styling/PaymentScreenStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
import stripe from 'tipsi-stripe';
import { CreditCardInput } from "react-native-credit-card-input";
import HttpUtils from '../Services/HttpUtils';
import Modal from "react-native-modal";
import OverlayLoader from '../Loader/OverlaySpinner';
import Toast, { DURATION } from 'react-native-easy-toast';

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
      currencyValidation: false,
      isVisibleModal: false,
      btnDisable: false,
      dataSubmit: false,
      isLoading: false,
      position: 'top',
      creditScreen: true,
      buttonActive: true,
      otherScreen: false,
      otherSevicesBtnActive: false,

    }
  }
  componentWillMount() {
    this.btnDisabledFunc();
  }
  btnDisabledFunc = () => {
    const {
      name,
      email,
      paymentMonth,
      amount,
      creditCardNo,
      cvc,
      expiry,
      typeCard,
      currency,

    } = this.state;
    if (name == '' || email == '' || paymentMonth == '' || amount == '' || creditCardNo == '' ||
      cvc == '' || expiry == '' || typeCard == '' || currency == '') {
      this.setState({
        btnDisable: true
      })
    }
  }
  cardDetail = (e) => {
    if (e.status.number == "invalid" || e.status.expiry == 'invalid' || e.status.cvc == 'invalid',
      e.status.number == "incomplete" || e.status.expiry == 'incomplete' || e.status.cvc == 'incomplete') {
      this.setState({
        btnDisable: true
      })

    }
    else if (e.status.number == 'valid' && e.status.expiry == 'valid' && e.status.cvc == 'valid' && e.valid == true) {
      this.setState({
        creditCardNo: e.values.number,
        cvc: e.values.cvc,
        expiry: e.values.expiry,
        typeCard: e.values.type,
        btnDisable: false
      })
    }
  }
  pay = async () => {
    const { name, email, monthArr, paymentMonth, amount, currency, creditCardNo, cvc, expiry, typeCard, isLoading } = this.state;
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
    if (params) {
      this.setState({
        isLoading: true
      })
    }

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
      token: token.tokenId,
    }
    console.log(paymentObj, 'paymentObj')
    let res = await HttpUtils.post('payment', paymentObj);

    if (res.code == 200) {
      this.setState({
        isLoading: false,
        dataSubmit: true,
        isVisibleModal: true
      })
    }
    else {
      this.setState({
        isLoading: false
      }, () => {
        this.toastFunction(`Some thing went wrong of ${res.error}`, this.state.position, DURATION.LENGTH_LONG, true)
      })
    }
    console.log(res, 'payemnt response')
  }

  updateCurrency = (e) => {
    this.setState({
      currency: e
    })
  }

  backToPage = () => {
    const { dataSubmit } = this.state;
    const { navigate } = this.props.navigation;
    if (dataSubmit) {
      this.setState({
        dataSubmit: false,
        isVisibleModal: false
      })
      navigate('Homescreen');
    }
  }

  toastFunction = (text, position, duration, withStyle) => {
    this.setState({
      position: position,
    })
    if (withStyle) {
      this.refs.toastWithStyle.show(text, duration);
    } else {
      this.refs.toast.show(text, duration);
    }
  }

  toggelScreen(event) {
    console.log(event)
    // const {
    //   creditScreen,
    //   otherScreen,
    //   buttonActive,
    //   otherSevicesBtnActive
    // }=this.state
    if (event == 'credit card') {
      this.setState({
        creditScreen: true,
        buttonActive: true,
        otherScreen: false,
        otherSevicesBtnActive: false
      })

    }
    else if (event == 'other') {
      this.setState({
        creditScreen: false,
        buttonActive: false,
        otherScreen: true,
        otherSevicesBtnActive: true
      })
    }
  }

  render() {
    const {
      nameValidation,
      emailValidation,
      paymentMonthValidation,
      amountValidation,
      currencyValidation,
      currency,
      btnDisable,
      dataSubmit,
      isLoading,
      creditScreen,
      buttonActive,
      otherScreen,
      otherSevicesBtnActive
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{ backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
          <View style={styles.headingContainer}>
            <Text style={styles.headingStyle}>
              Payment
            </Text>
          </View>
          <View style={styles.toggelBtnContainer}>
            <TouchableOpacity style={[creditScreen == true &&
              buttonActive == true
              ? styles.payScreenOneBtn : styles.unActiveBtnStyle]}
              activeOpacity={0.6}
              onPress={this.toggelScreen.bind(this, 'credit card')}
            >
              <Text style={[creditScreen == true &&
                buttonActive == true ? styles.textStyleOne : styles.unActiveTextStyle]}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[otherSevicesBtnActive ==
              false &&
              otherScreen == false
              ?
              styles.unActiveBtnStyle : styles.payScreenTwoBtn]} activeOpacity={0.6}
              onPress={this.toggelScreen.bind(this, 'other')}>
              <Text style={[
                otherSevicesBtnActive == false &&
                  otherScreen == false
                  ?
                  styles.unActiveTextStyle : styles.textStyleOne]}>Others</Text>
            </TouchableOpacity>



          </View>

          {creditScreen ? <View>

            <View style={styles.paraTextContainer}>
            <Text style={styles.inputLabelsStyle}>Enter your credit/debit card details below to pay for your subscription.</Text>
              
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
                style={styles.inputTextStyle}
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
                style={styles.inputTextStyle}
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
                style={styles.inputTextStyle}
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
            {/* <View style={styles.cardContainer}> */}
            <View style={{marginTop:15}}></View>
              <CreditCardInput
                onChange={this.cardDetail}
                allowScroll={true}
                
              />
            {/* </View> */}

            {/* loader show */}
            {isLoading ? <OverlayLoader /> : null}
            {/* payment succesfully show modal */}
            {dataSubmit ?
              <Modal
                isVisible={this.state.isVisibleModal}
                animationIn='zoomIn'
                //animationOut='zoomOutDown'
                backdropOpacity={0.8}
                backdropColor='white'
                coverScreen={true}
                animationInTiming={800}
                animationOutTiming={500}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.dateWithCancelIcon}>
                    <Text style={{ color: '#000000', fontSize: 18 }}>Data has been submitted successfully</Text>
                    <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                      <Image source={require('../icons/cancel.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Image source={require('../icons/green-check-mark.gif')} style={styles.forImages} resizeMode='contain' />
                  </View>
                </View>
              </Modal>
              :
              null
            }
            {/* in case error of payment stripe the show toast */}
            <Toast ref="toastWithStyle"
              style={{ backgroundColor: '#FF6200' }}
              position={this.state.position}
              positionValue={50}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
            />

          </View> :

            <View>

<View style={styles.paraTextContainer}>       
<Text style={styles.inputLabelsStyle}>Enter your transaction details below to complete your payment.</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputLabelsStyle}>Sevice Name</Text>
              <Picker
                selectedValue={this.state.currency}
                onValueChange={this.updateCurrency}
                 style={{backgroundColor:'#e5e5e5',height:40,fontFamily: 'MontserratLight'}}
              // style={styles.pickerStyle}
              >
                <Picker.Item label='Select an currency...'color='gray' value='0' />
                <Picker.Item label="USD" value="usd" />
              </Picker>
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
                style={styles.inputTextStyle}
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
              <TextInput placeholder="e.g 01"
                style={styles.inputTextStyle}
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
              <TextInput placeholder="e.g USD amount"
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholderColor="#4f4f4f"
                onChangeText={(amount) => this.setState({ amount })}
              />
              
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.inputLabelsStyle}>Transaction ID</Text>
              <TextInput placeholder="e.g xxxx xxxx xxxx"
                style={styles.inputTextStyle}
                keyboardType={"numeric"}
                placeholderColor="#4f4f4f"
                // onChangeText={(amount) => this.setState({ amount })}
              />
              
            </View>
            <View style={styles.fileUploadContainer}>
              <TouchableOpacity style={styles.fileRecipet}>
                <Text style={styles.textStyle}>Upload Receipt</Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.imgFile}>
              <Text style={styles.textStyle}>Upload Photo</Text>
              </TouchableOpacity>
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
            {/* <View style={styles.cardContainer}>
              <CreditCardInput
                onChange={this.cardDetail}
              />
            </View> */}

            {/* loader show */}
            {isLoading ? <OverlayLoader /> : null}
            {/* payment succesfully show modal */}
            {dataSubmit ?
              <Modal
                isVisible={this.state.isVisibleModal}
                animationIn='zoomIn'
                //animationOut='zoomOutDown'
                backdropOpacity={0.8}
                backdropColor='white'
                coverScreen={true}
                animationInTiming={800}
                animationOutTiming={500}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.dateWithCancelIcon}>
                    <Text style={{ color: '#000000', fontSize: 18 }}>Data has been submitted successfully</Text>
                    <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                      <Image source={require('../icons/cancel.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Image source={require('../icons/green-check-mark.gif')} style={styles.forImages} resizeMode='contain' />
                  </View>
                </View>
              </Modal>
              :
              null
            }
            {/* in case error of payment stripe the show toast */}
            <Toast ref="toastWithStyle"
              style={{ backgroundColor: '#FF6200' }}
              position={this.state.position}
              positionValue={50}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{ color: 'white', fontFamily: 'MontserratLight', }}
            />



            </View>}

          <View style={styles.btnContainer}>
            <CaloriesSetupBtn title='Confirm And Pay'
              btnDisable={btnDisable}
              onPress={this.pay}
              caloriesBtnStyle={styles.caloriesBtnStyle}
              caloriesBtnStyleDisabled={styles.caloriesBtnStyleDisabled} />
          </View>
          <View style={styles.blankContainer}>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Payment;