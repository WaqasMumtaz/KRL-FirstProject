import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity,Picker } from 'react-native';
import styles from '../Styling/BriskStyle';
import InputImgsScreen from '../screens/InputImgs';
import PickerInput from '../../Picker/PickerInput';
const { height } = Dimensions.get('window');

const BriskScreen = () => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
            <View style={styles.mainContainer}>
                <View style={styles.cardStyle}>
                    <View style={styles.cardChildOne}>
                        <Text style={styles.heading}>Brisk walk</Text>
                        <Image source={require('../icons/cancel.png')} style={styles.iconSize} />
                    </View>
                    <Text style={{ marginLeft: 14 }}>Amount</Text>
                    {/* <Text>Unit</Text> */}

                    {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={{borderWidth:2,height:40,width:30,borderColor:'white',justifyContent:'center',paddingLeft:5}}>
                        <Image source={require('../icons/minus-gray.png')} style={styles.imgsIcon}/>
                    </TouchableOpacity>
                    <TextInput placeholder="22" style={{borderWidth:2,height:40,width:'25%',borderColor:'white',textAlign:'center'}}/>
                    <TouchableOpacity style={{borderWidth:2,height:40,width:30,borderColor:'white',justifyContent:'center',}}>
                        <Image source={require('../icons/plus-gray.png')} style={styles.imgsIcon}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{borderWidth:2,height:40,width:30,borderColor:'white',justifyContent:'center',paddingLeft:5}}>
                        <Image source={require('../icons/minus-gray.png')} style={styles.imgsIcon}/>
                    </TouchableOpacity>
                    <TextInput placeholder="22" style={{borderWidth:2,height:40,width:'25%',borderColor:'white',textAlign:'center'}}/>
                    <TouchableOpacity style={{borderWidth:2,height:40,width:30,borderColor:'white',justifyContent:'center',}}>
                        <Image source={require('../icons/plus-gray.png')} style={styles.imgsIcon}/>
                    </TouchableOpacity>  
                    </View>
                    </View> */}


                </View>
                <View><Text>kkdjlakjdlkal</Text></View>
                <View style={styles.cardChildTwo}>

                    <View style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 1, height: '40%', width: '50%', marginTop: 8, opacity: 0.3, flexDirection: 'row', paddingLeft: 16,alignItems:'center' }}>
                        <TouchableOpacity style={{ borderWidth: 2, height: 40, width: 35, borderColor: 'white', justifyContent: 'center', paddingLeft: 5 }}>
                            <Image source={require('../icons/minus-gray.png')} style={styles.imgsIcon} />
                        </TouchableOpacity>
                        <TextInput placeholder="22" placeholderTextColor="white" maxLength={3} style={{ borderWidth: 2, height: 40, width: '47%', borderColor: 'white', textAlign: 'center' }} />
                        <TouchableOpacity style={{ borderWidth: 2, height: 40, width: 32, borderColor: 'white', justifyContent: 'center', }}>
                            <Image source={require('../icons/plus-gray.png')} style={styles.imgsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 1, height: '40%', width: '50%', marginTop: 8, opacity: 0.3, flexDirection: 'row' }}>
                    <Picker selectedValue = 'Minutes' onValueChange = {this.updateUser} style={styles.pickerStyle} mode="dropdown">
                <Picker.Item label = "Inches" value = "inches" />
                <Picker.Item label = "Centimeter" value = "centimeter" />
            </Picker>
                    </View>
                </View>
                {/* <View style={styles.againCard}>
                   <View style={styles.cardChildTwo}><Text>Hello</Text></View>
                   <View style={styles.cardChildThree}><Text>Hello</Text></View>
               </View> */}
                {/* <View style={styles.cardChildTwo}>

                    </View>
                    <View style={styles.cardChildThree}>

                    </View> */}
            </View>

        </ScrollView>
    )
}

export default BriskScreen;

