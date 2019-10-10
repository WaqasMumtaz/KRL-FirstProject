import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker,
    Option
} from 'react-native';

import styles from '../Styling/PackagesScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
 import HttpUtils from '../Services/HttpUtils';

import CaloriesSetupBtn from '../buttons/setUpBtn';
const { heightDimension } = Dimensions.get('window').height;;

class PackagesScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shortPrice: true,
            medical: true,
            transformation: true,
            partum: true,
            name: '',
            email: '',
            number: ''
        }
    }

    componentWillMount() {
        const { currentName, userEmail, userNumber } = this.props.navigation.state.params;
        console.log('user data >>>', currentName)
        this.setState({
            name: currentName,
            email: userEmail,
            number: userNumber
        })
    }

    sendRequestAdmin =  async () => {
        const {name , email , number }= this.state;
        let userObj = {
            name: name,
            email: email,
            number: number
        }
        console.log('user send data >>>', userObj)
          let requestData = await HttpUtils.post('email', userObj)
           console.log('user request data >>>', requestData)

    //  let data = await fetch('https://getfit-server.herokuapp.com/email')
    //  console.log(data)
    // await fetch("https://getfit-server.herokuapp.com/email", {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         userObj
    //     })
    //     //console.log()
    // }).then((response) => console.log(response.json()))
    //     .then((responseData) => {
    //         console.log(
    //             "Response Body -> " + JSON.stringify(responseData)
    //         )
    //     })

        // let requestData = await HttpUtils.post('email', userObj)
       // let requestData = await HttpUtils.post('email', userObj);

       
        // }
        // catch(err){
        //     console.log(err)
        // }

    }

    toggleDetail = () => {
        this.setState({
            shortPrice: !this.state.shortPrice,

        })

    }
    medicalToggel = () => {
        this.setState({
            medical: !this.state.medical,
        })
    }
    transformationToggel = () => {
        this.setState({
            transformation: !this.state.transformation,
        })
    }
    partumToggel = () => {
        this.setState({
            partum: !this.state.partum
        })
    }


    render() {
        const { shortPrice, medical, transformation, partum } = this.state;
        return (
            <ScrollView style={{ flex: 1, height: heightDimension }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Packages</Text>
                    </View>
                    <View style={styles.monthlyPlan}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Monthly Plan</Text>
                            {
                                shortPrice ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.toggleDetail}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.toggleDetail}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            shortPrice ?
                                <Text style={styles.priceText}>Rs.6000/$60</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 6000{"\n"}For Overseas : $60</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                        onPress={this.sendRequestAdmin}
                                    />
                                </View>



                        }
                    </View>

                    {/* Medical Plan Card */}

                    <View style={styles.monthlyPlan}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Medical Condition Plan</Text>
                            {
                                medical ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.medicalToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.medicalToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            medical ?
                                <Text style={styles.priceText}>Rs.8000/$80</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 8000{"\n"}For Overseas : $80</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for PCOs, Diabetes,Thyroid</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                    //onPress={this.calulateMacro}
                                    />
                                </View>



                        }
                    </View>

                    {/* Transfermation Plan Card  */}

                    <View style={styles.monthlyPlan}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>The Transformation Plan</Text>
                            {
                                transformation ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.transformationToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.transformationToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            transformation ?
                                <Text style={styles.priceText}>Rs.15000/$150</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 15000{"\n"}For Overseas : $150</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={{ color: '#7e7e7e', fontFamily: 'MontserratMedium', }}>Duration 3 Month</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                    //onPress={this.calulateMacro}
                                    />
                                </View>



                        }
                    </View>

                    {/* Post Partum Plan Card*/}

                    <View style={styles.monthlyPlan}>
                        <View style={styles.plan}>
                            <Text style={styles.monthlyText}>Post Partum Plan</Text>
                            {
                                partum ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ color: '#7e7e7e', marginRight: 5 }}>Details</Text>
                                        <TouchableOpacity onPress={this.partumToggel}>
                                            <Image source={require('../icons/dropdown-arrow.png')}
                                                style={styles.iconStyle}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={this.partumToggel}>
                                        <Image source={require('../icons/uparrow.png')}
                                            style={styles.iconStyle}
                                        />
                                    </TouchableOpacity>
                            }

                        </View>
                        {
                            partum ?
                                <Text style={styles.priceText}>Rs.10000/$100</Text>
                                :
                                <View>
                                    <Text style={styles.detailPrice}>For Pakistanis : PKR 10000{"\n"}For Overseas : $100</Text>
                                    <View style={styles.instructionDetail}>
                                        <Text style={styles.instText}>- Exclusively for post partum{"\n"}(post pregnancy) women.</Text>
                                        <Text style={styles.instText}>- Customized meal plans</Text>
                                        <Text style={styles.instText}>- Home-based workouts</Text>
                                        <Text style={styles.instText}>- Medical assistance</Text>
                                        <Text style={styles.instText}>- Coach support</Text>
                                    </View>

                                    <CaloriesSetupBtn title='Request This Package'
                                        caloriesBtnStyle={styles.caloriesBtnStyle}
                                    //onPress={this.calulateMacro}
                                    />
                                </View>



                        }
                    </View>

                </View>
                <View style={{ marginBottom: 15 }}>

                </View>
            </ScrollView>
        )
    }
}

export default PackagesScreen;
