import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, PermissionsAndroid } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


class ChatInbox extends React.Component {
   
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: () => null
    //     }
    // };
    constructor(props) {
        super(props);
        this.state = {
            messageUser: ''
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('opponentProfile').then((value) => {
            let userData = JSON.parse(value);
            this.setState({
                messageUser: userData
            })
        })
    }
    sendOppentUserData(userData) {
        const { navigate } = this.props.navigation;
        navigate('ChatBox', {
            senderData: userData
        });
    }
    render() {
        const { messageUser } = this.state;
        const senderName = messageUser && messageUser.map((elem, key) => {
            return (
                <View style={styles.nameContainer}>
                    <TouchableOpacity style={styles.nameOpacity} onPress={this.sendOppentUserData.bind(this, elem)}>
                        <Text style={styles.name}>{elem.name}</Text>
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <View style={styles.mainContainer}>
                <View style={styles.childMainContainer}>
                    <View style={styles.chatProfileContainer}>
                        <Text style={styles.profileNameStyle}>Inbox</Text>
                    </View>
                    <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>

                        {senderName != '' && senderName}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
export default ChatInbox;
