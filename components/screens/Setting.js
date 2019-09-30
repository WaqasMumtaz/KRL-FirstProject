import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Picker
} from 'react-native';
import styles from '../Styling/SettingScreenStyle'
import AsyncStorage from '@react-native-community/async-storage';

export default class SettingScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Setting',
    //     headerTitleStyle: {
    //         fontFamily: "MontserratExtraBold",
    //         fontSize:15,
    //         color:'#000000',
    //         textAlign: 'center',
    //         //flexGrow:1,
    //         alignSelf:'center',
    //     },
    //     headerTintColor: '#808080',
    //   };
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    logout=()=>{
        const { navigate } = this.props.navigation;
        AsyncStorage.clear();
        navigate('Login')

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <View style={styles.settingHaider}>
                        <Text style={styles.settingTextStyle}>Setting</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.items} onPress={()=>{navigate('ResetpasswordScreen')}}>
                            <Text style={styles.forText}>Reset Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.items}
                        onPress={this.logout}
                        >
                            <Text style={styles.forText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex: 0.6, flexDirection: 'row' }}>
                        
                    </View> */}

                </View>
            </View>
        )
    }
}

