import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
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
            messageUser: '',
            forTrainnerModal: false
        }
    this.checkTrainy()    
    }

componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
    checkTrainy = () => {
        // const { senderData } = this.props.navigation.state.params;
        // console.log(senderData, 'senderData')
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('currentUser').then((value) => {
                let userData = JSON.parse(value)
                if (userData.assignTrainner == undefined) {
                    this.setState({
                        forTrainnerModal: true
                    })
                }
            })
        });
    }


    removeModal = () => {
        const { navigate } = this.props.navigation;
        this.setState({
            forTrainnerModal: false
        }, () => { navigate('Homescreen') })

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
                    <Modal
                        isVisible={this.state.forTrainnerModal}
                        animationIn='zoomIn'
                        //animationOut='zoomOutDown'
                        backdropOpacity={0.8}
                        backdropColor='white'
                        coverScreen={true}
                        animationInTiming={500}
                        animationOutTiming={500}
                    >
                        <View style={styles.withOutTrainerModal}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                                <Text style={styles.textColor}>Contact To App Admin</Text>
                                <TouchableOpacity onPress={this.removeModal} activeOpacity={0.6}>
                                    <Image source={require('../icons/cancel.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>

                </View>
            </View>
        );
    }
}
export default ChatInbox;
