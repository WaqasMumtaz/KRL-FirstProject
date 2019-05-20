import React from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
//import Button from 'apsl-react-native-button'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class InputImgsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text>Wellcom</Text> */}
                
                {/* <View style={{ flexDirection: 'row', backgroundColor: 'white' }}> */}
                {/* <View style={{ flex: 1,flexDirection:'row'}}></View> */}
                {/* <View style={{ flex: 1.5, borderColor: 'gray', borderWidth: 1, flexDirection: 'row',borderRadius:2 ,backgroundColor:'gray'}}> */}
                    <TouchableOpacity style={styles.touchableOpacityOne}>
                        <Image source={require('../icons/minus.png')} style={styles.forImg} />
                    </TouchableOpacity>
                    <View style={styles.textInputContainer }>
                        <TextInput keyboardType = 'numeric' maxLength={3} placeholder='22' style={styles.textInputStyle} />
                    </View>
                    <TouchableOpacity style={styles.touchableOpacityTwo}>
                        <Image source={require('../icons/plus.png')} style={styles.forImg} />
                    </TouchableOpacity>
                {/* </View> */}
                    
                {/* </View> */}
                {/* <View style={{ flex: 1,flexDirection:'row'}}></View> */}

            </View>
        )
    }
}

export default InputImgsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row'
        // width: screenWidth,
        // height: screenHeight
    },
    forImg: {
        width: 16,
        height: 16,
        marginVertical:5

    },
    touchableOpacityOne:{
        flex: 1,
        padding: 5,
        marginVertical: 5,
        backgroundColor:'gray',
        height:40 
    },
    textInputContainer:{
        flex: 2, 
        justifyContent: 'center',
        flexDirection:'row',
        marginVertical:5,
        borderRadius:2
    },
    textInputStyle:{
        flex:1,
        height: 40,
        textAlign: 'center', 
        backgroundColor: 'gray'
    },
    touchableOpacityTwo:{
        flex: 1,
        padding: 5, 
        marginVertical: 5,
        alignItems:'flex-end',
        backgroundColor:'gray',
        height:40 
    },
})