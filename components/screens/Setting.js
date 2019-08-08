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

export default class SettingScreen extends React.Component {
    static navigationOptions = {
        title: 'Setting',
        headerTitleStyle: {
            fontFamily: "MontserratExtraBold",
            fontSize:20,
            color:'#000000',
            textAlign: 'center',
            flexGrow:1,
            alignSelf:'center',
        },
        headerTintColor: '#808080',
      };
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.childContainer}>
                    <View>
                        <TouchableOpacity style={styles.items} onPress={()=>{navigate('ResetpasswordScreen')}}>
                            <Text style={styles.forText}>Reset Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.items}>
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

