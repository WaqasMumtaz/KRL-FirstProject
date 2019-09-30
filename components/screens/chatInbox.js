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
        //this.getData()
        this.checkTrainy()
    }
     async componentWillMount() {
         await AsyncStorage.getItem('opponentProfile').then((value) => {
           let userData = JSON.parse(value);
           console.log('opponent data chatbox >>>',userData)

           this.setState({
               messageUser: userData
           })
       })
        
    }
// getData= async ()=>{
//     await AsyncStorage.getItem('opponentProfile').then((value) => {
//         let userData = JSON.parse(value);
//         console.log('opponent data chatbox >>>',userData)
//         this.setState({
//             messageUser: userData
//         })
//     })
// }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }
    checkTrainy =  () => {
        // const { senderData } = this.props.navigation.state.params;
        console.log( 'senderData')
       const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus',  () => {
               AsyncStorage.getItem('currentUser').then((value) => {
                let userData = JSON.parse(value)
                console.log(userData , 'userData')
                console.log(userData.assignTrainner  , 'userData assignTrainner ')
                  
                if (userData.assignTrainner != undefined) {
                console.log(userData.assignTrainny  , 'userData.assignTrainny ')
                    this.setState({
                        forTrainnerModal: false
                    })
                }
                else if(userData.assignTrainny != undefined ){
                console.log(userData.assignTrainny , 'userData assignTrainny ')
                    this.setState({
                        forTrainnerModal: false
                    })
                }
                // else if(userData.assignTrainner != undefined && userData.assignTrainny.length != 0){
                //     // console.log(userData.assignTrainny.length  , 'userData assignTrainny length')
                //     this.setState({
                //         forTrainnerModal: false
                //     })
                // }
                else {
                    console.log('else')
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

   
    sendOppentUserData(userData) {
        const { navigate } = this.props.navigation;
        navigate('ChatBox', {
            senderData: userData
        });
    }

    

    render() {
        const { messageUser , forTrainnerModal} = this.state;
        console.log('user message >>>',messageUser)
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
                        {/* <Text>Hello World</Text> */}

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
                                <Text style={styles.textColor}>You dont have a trainer</Text>
                                <TouchableOpacity onPress={this.removeModal} activeOpacity={0.6}>
                                    <Image source={require('../icons/cancel.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.userInstruction}>
                            <Text style={styles.userInsTextStyle}>Get premium account to get a coach</Text>
                            <Text style={styles.userInsTextStyle}>Kindly contact</Text>
                            <Text style={styles.userInsTextStyle}>0333-5529729</Text>
                            </View>
                        </View>

                    </Modal>
                     
                     {/* {forTrainnerModal ? 
                      <View><Text>Contact App Admin</Text></View>
                      :
                      null
                    } */}
                </View>
            </View>
        );
    }
}
export default ChatInbox;
