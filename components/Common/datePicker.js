import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
// import DatePicker from 'react-native-datepicker';

const PickDate = (props) => {
    return (
        <View style={styles.arrowContainer}>
            <View style={{flex:1}}></View>
            <TouchableOpacity style={{ marginRight: 20 }}>
                <Image source={require('../icons/left.png')} style={styles.forImgs} />
            </TouchableOpacity>
            <Text>Today</Text>
            {/* <DatePicker
                style={{ width: 200 }}
                // date={date}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-1950"
                maxDate="01-01-2019"
                // maxDate={date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
            // onDateChange={
            //     this.dateFilter
            //     // (date) => { this.setState({ date: date }) }
            // }
            /> */}
            <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image source={require('../icons/right.png')} style={styles.forImgs} />
            </TouchableOpacity>
        </View>
    )
}

export default PickDate;

const styles = StyleSheet.create({
    arrowContainer: {
        flex: 1,
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forImgs: {
        height: 15,
        width: 15,
    },
})