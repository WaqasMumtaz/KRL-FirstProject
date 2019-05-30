import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/MacroStyle';
//import CaloriesSetupBtn from '../buttons/setUpBtn';
import InputImgsScreen from '../screens/InputImgs';
const { height } = Dimensions.get('window');

class Macrocalculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Macro Calculator
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>Enter your height and weight below to re-calculate
                            your daily macro limit </Text>
                        </View>
                        <View style={styles.dateBirth}>
                         <Text style={styles.textStyle}>Date Of Birth</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Tap to set..." placeholderTextColor="white" style={styles.inputStyle}/>
                        </View>
                        <Text>Gender</Text>
                        <View style={styles.genderContainer}>
                              <View style={{flex:1,backgroundColor:'blue'}}>
                                  <TouchableOpacity style={{height:40,width:'90%',justifyContent:'center',backgroundColor:'#DCDCDC',marginTop:5}}><Text style={{textAlign:'center'}}>Male</Text></TouchableOpacity>
                                  <Text style={{marginTop:20}}>Height</Text>
                                  <View style={{borderColor:'white',width:'90%',borderWidth:2,marginTop:10,height:70,justifyContent:'center'}}>
                                    <InputImgsScreen iconMinus={require('../icons/minus-gray.png')} iconPlus={require('../icons/plus-gray.png')}/>
                                  </View>
                                  
                              </View>
                              <View style={{flex:1,backgroundColor:'pink'}}>
                              <TouchableOpacity style={{height:40,width:'90%',marginLeft:18,justifyContent:'center',backgroundColor:'#DCDCDC',marginTop:5}}><Text style={{textAlign:'center'}}>Female</Text></TouchableOpacity>
                              </View>
                        </View>

                        {/* <Text style={{fontSize:40}}>kdllllllllllllllllllllllljjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssss
                            kjdddddddddkjdklnvkjhfuhajdkahdfauidiuaidhfkajdakhkldjafffffddddhfakjjdkldljkldjfladkjljdlkjladjkajdl
                            kajdfffffffffffffffffffffffffffffffwoieojs;aoidjkasjdfadlfffffffffffffffffffffffffffffffffffffdkjkjalkdj
                            lkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                            kdllllllllllllllllllllllljjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssss
                            kjdddddddddkjdklnvkjhfuhajdkahdfauidiuaidhfkajdakhkldjafffffddddhfakjjdkldljkldjfladkjljdlkjladjkajdl
                            kajdfffffffffffffffffffffffffffffffwoieojs;aoidjkasjdfadlfffffffffffffffffffffffffffffffffffffdkjkjalkdj
                            lkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                            kdllllllllllllllllllllllljjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssss
                            kjdddddddddkjdklnvkjhfuhajdkahdfauidiuaidhfkajdakhkldjafffffddddhfakjjdkldljkldjfladkjljdlkjladjkajdl
                            kajdfffffffffffffffffffffffffffffffwoieojs;aoidjkasjdfadlfffffffffffffffffffffffffffffffffffffdkjkjalkdj
                            lkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                            kdllllllllllllllllllllllljjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssss
                            kjdddddddddkjdklnvkjhfuhajdkahdfauidiuaidhfkajdakhkldjafffffddddhfakjjdkldljkldjfladkjljdlkjladjkajdl
                            kajdfffffffffffffffffffffffffffffffwoieojs;aoidjkasjdfadlfffffffffffffffffffffffffffffffffffffdkjkjalkdj
                            lkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                            kdllllllllllllllllllllllljjjjjjjssssssssssssssssssssssssssssssssssssssssssssssssss
                            kjdddddddddkjdklnvkjhfuhajdkahdfauidiuaidhfkajdakhkldjafffffddddhfakjjdkldljkldjfladkjljdlkjladjkajdl
                            kajdfffffffffffffffffffffffffffffffwoieojs;aoidjkasjdfadlfffffffffffffffffffffffffffffffffffffdkjkjalkdj
                            lkdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

                        </Text> */}
                    </View>
                </ScrollView>
            </View>
        )
    }

}

export default Macrocalculator;