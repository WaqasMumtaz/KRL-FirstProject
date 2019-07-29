import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity, Picker } from 'react-native';
import styles from '../Styling/BriskStyle';
const { height } = Dimensions.get('window').height;

class BriskScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            brisk: false
        }

    }
    changeScreen = () => {
        this.setState({ brisk: true })
    }

    render() {
        const { brisk } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.cardStyle}>
                    <View style={styles.cardChildOne}>
                        <Text style={styles.heading}>{this.props.title}</Text>
                        <TouchableOpacity onPress={this.props.backFunc}>
                            <Image source={require('../icons/cancel.png')} style={styles.iconSize} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.labelTextContainer}>
                    <Text style={styles.labelTextAmountStyle}>Amount</Text>
                    <Text style={styles.labelUnitStyle}>Unit</Text>
                </View>
                <View style={styles.cardChildTwo}>
                    <View style={styles.cardChildTwoSiblingContainer}>
                        <TouchableOpacity style={styles.minusImgContainer} onPress={this.props.decrementVal}>
                            <Image source={require('../icons/minus-gray.png')} style={styles.imgsIcon} />
                        </TouchableOpacity>
                        <TextInput placeholder="0" placeholderTextColor="white"
                            onChangeText={this.props.setAmount}
                            value={this.props.amount}
                            maxLength={3} keyboardType="numeric" style={styles.inputFieldStyle} />
                        <TouchableOpacity style={styles.plusImgStyle} onPress={this.props.increamentVal}>
                            <Image source={require('../icons/plus-gray.png')} style={styles.imgsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={this.props.unit} onValueChange={this.props.updateUnit} style={styles.pickerStyle} mode="dropdown">
                            <Picker.Item label='Select an option...' value='0' />
                            <Picker.Item label="Hours" value="hours" />
                            <Picker.Item label="Minutes" value="minutes" />
                            {/* <Picker.Item label = {this.props.label} value = {this.props.value} /> */}
                            <Picker.Item label="Seconds" value="seconds" />
                        </Picker>
                    </View>
                </View>
            </View>

        )
    }
}

export default BriskScreen;

