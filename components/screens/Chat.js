import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../Styling/ChatScreenStyle';
import ImagePicker from 'react-native-image-picker';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const BASE_URL = 'https://getfit-server.herokuapp.com';
import firebase from '../../Config/Firebase';
import 'firebase/firestore';
const db = firebase.firestore();

//import io from 'socket.io-client';
//import io from 'socket.io/socket.io.js'
//const socket = io.connect("192.168.100.9:3000",
// const socket = io.connect("https://getfit-server.herokuapp.com:3000",
//  {
//     jsonp: false,
//     transports: ['websocket']
//   }
// )

//const socket = io.connect("http://localhost:3000",
// {
//   jsonp: false,
//   transports: ['websocket']
//});

// const connectionConfig = {
//   jsonp: false,
//   reconnection: true,
//   reconnectionDelay: 100,
//   reconnectionAttempts: 100000,
//   transports: ['websocket'], // you need to explicitly tell it to use websockets
//  };


class Chatscreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    }


  };
  constructor(props) {
    super(props);

    this.state = {
      textMessage: '',
      chatMessages: [],
      repMessages: [],
      sendIcon: false,
      micIcon: true,
      micOrange: false,
      sendBtnContainer: true,
      orangeMicContainer: false,
      recodringBody: false,
      messagContainer: false,
      attachGray: true,
      attachOrange: false,
      shareFiles: false,
      avatarSource: null,
      expand: false,
      date: ''
    }
  }

  componentDidMount() {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    })

    // socket.on('connect', () => {
    //   console.log('Congrates!! user connected');
    //   console.log(socket.connected);

    //   socket.on('chat message', data => {
    //     this.setState({
    //       chatMessages: [...this.state.chatMessages, data],

    //     })
    //   })

    // })
    // socket.on('repmsg', msg =>{
    //   this.setState({
    //     repMessages:[...this.state.repMessages, msg]
    //   })
    // })
    AsyncStorage.getItem("currentUser").then(value => {
      const chatArrayTemp = [];
      const replyArrayTemp = [];
      let tainnyId;
      if (value) {
        data = JSON.parse(value);
        // console.log(data, 'data')
        db.collection('chatRoom').get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            let items = doc.data();
            console.log(items, 'items')
            if (items.mgs.userId == data.id) {
              console.log(items.mgs.textMessage, 'items without snap shot');
              chatArrayTemp.push(items.mgs.textMessage)
              tainnyId = items.mgs.tainnyId;
            }
            if (tainnyId == items.mgs.userId) {
              console.log('condition true')
              replyArrayTemp.push(items.mgs.textMessage)
            }
          });
          console.log(replyArrayTemp, 'replyArrayTemp')
          this.setState({
            chatMessages: chatArrayTemp,
            repMessages: replyArrayTemp
          })
        });

      }
    });
  }

  // componentWillMount(){
  //   socket.on('connect', ()=>{
  //     const nRoom = "nRoom";
  //     socket.emit('nRoom', nRoom)
  //     socket.on('one new user', data =>{
  //       console.log(data);
  //     })
  //   })
  // }

  sendMessage = async () => {
    const { textMessage } = this.state;
    let mgs = {}
    let data;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        data = JSON.parse(value);
        // console.log(data, 'data')
        db.collection('users').get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            let items = doc.data();
            console.log(items, 'items without snap shot')
            if (items.dataUser._id == data.id) {
              if (items.dataUser.trainnerId != undefined && items.dataUser.assignTrainner != undefined) {
                mgs.trainnerId = items.dataUser.trainnerId;
                mgs.assignTrainner = items.dataUser.assignTrainner;
                mgs.userId = items.dataUser._id;
                mgs.name = data.name;
                mgs.textMessage = textMessage
              }
              else {
                mgs.tainnyId = items.dataUser.tainnyId;
                mgs.assignTrainny = items.dataUser.assignTrainny;
                mgs.userId = items.dataUser._id;
                mgs.name = data.name;
                mgs.textMessage = textMessage
              }
            }
          });
          db.collection('chatRoom').add({
            mgs
          }).then(() => {
            // alert("Successfully Login!");
          })
            .catch(() => {
              alert('Something went wrong!')
            });
        });
      }
    });
    // db.collection("users").doc('').get().then(function (doc) {
    //   console.log(doc.data())
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });

    // db.collection('users').get()

    // const {date,textMessage} = this.state;
    // const item =await AsyncStorage.getItem('currentUser');
    // const dataParse = await JSON.parse(item);
    // const getUserName = dataParse.name;
    // const userMsgs=[];
    // userMsgs.push(textMessage);

    //  let senderChatMessages=  {
    //   type:'sender',
    //   msg:textMessage,
    //   name:getUserName,
    //   date:date
    // }
    // console.log(senderChatMessages)
    // socket.emit("chat message", senderChatMessages);
    // console.log(socket.connected);

    this.setState({
      textMessage: '',
      messagContainer: true,
    }, () => {
      const { textMessage } = this.state;
      if (textMessage == '') {
        this.setState({
          micIcon: true,
          sendIcon: false
        })
      }
      else {
        this.setState({
          sendIcon: true,
          micIcon: false
        })
      }
    })
  }
  changeIcon = () => {
    this.setState({
      sendIcon: true,
      micIcon: false
    })
  }


  toggelMic = () => {

    this.setState({
      micIcon: false,
      micOrange: true,
      sendBtnContainer: false,
      orangeMicContainer: true,
      recodringBody: true
    })
  }

  toggelMicOrange = () => {
    //const {micIcon , micOrange}=this.state;
    this.setState({
      // recodringBody:true,
      // micOrange:true,
      // sendBtnContainer:true,
      // orangeMicContainer:false
    })
  }

  grayIconAttachFielFunc = () => {
    this.setState({
      attachGray: false,
      attachOrange: true,
      shareFiles: true
    })
  }
  orangeIconAttachFielFunc = () => {
    this.setState({
      attachGray: true,
      attachOrange: false,
      shareFiles: false
    })
  }

  choosePhotoFunc = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response Image Picker --->>>', response)

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: response.uri,
          attachOrange: false,
          shareFiles: false
        });
      }

    })
  }

  expandImg = () => {
    this.setState({
      expand: true,
    })
  }
  shortPic = (e) => {
    console.log(e)
  }
  render() {
    const { textMessage, sendIcon, micIcon, micOrange, sendBtnContainer, orangeMicContainer, recodringBody, messagContainer,
      attachGray, attachOrange, shareFiles, avatarSource, expand } = this.state;
    const chatMessages = this.state.chatMessages.map(message => (
      <Text key={message} style={styles.msgsTextStyle}>
        {message}
      </Text>
    ))
    console.log(this.state.chatMessages, 'chatMessages')
    const replyMessages = this.state.repMessages.map(items =>
      <Text key={items} style={styles.replyMessagesStyle}>
        {items}
      </Text>)
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childMainContainer}>
          <View style={styles.chatProfileContainer}>
            <Text style={styles.profileNameStyle}>Waqas</Text>
            {/* <View style={styles.profilPicContainer}> */}
            <Image source={require('../icons/profil.jpg')} style={styles.profilPicStyle} />
            {/* </View> */}
          </View>

          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            <View style={styles.container}>
              {recodringBody && <View style={styles.recordingContainer}>

              </View>}
              {/* {messagContainer && <View style={styles.chatMessagsContainer}>
                     {chatMessages}
            </View>} */}
              {chatMessages}
              {avatarSource && <TouchableOpacity activeOpacity={0.5}
                style={styles.showPhotoContainer}
                onPress={this.expandImg}
              >
                <Image source={{ uri: avatarSource }}
                  style={styles.photoContainer} />
              </TouchableOpacity>}

              {expand &&
                <Image source={{ uri: this.state.avatarSource }} style={styles.canvas} />
              }
              {replyMessages}
              {shareFiles && <View style={styles.sendFielsTypeContainer}>
                <Text style={styles.shareTextStyle}>Share...</Text>
                <View style={styles.filesContainer}>
                  <TouchableOpacity onPress={this.choosePhotoFunc}>
                    <Image source={require('../icons/attach-photo.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../icons/attach-file.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../icons/attach-report.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>}


            </View>

          </ScrollView>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(textMessage) => { this.setState({ textMessage }) }}
              autoCorrect={false}
              placeholder="Type message here..."
              onKeyPress={() => { this.changeIcon() }}
              value={textMessage}
              style={styles.inputStyle}
            />
            <View style={styles.fileAttachContainer}>
              {attachGray && <TouchableOpacity
                onPress={this.grayIconAttachFielFunc}>
                <Image source={require('../icons/attach-gray.png')}
                  style={styles.attachFileIcon}
                />
              </TouchableOpacity>}
              {attachOrange && <TouchableOpacity
                onPress={this.orangeIconAttachFielFunc}
                style={styles.orangeAttachFiel}>
                <Image source={require('../icons/attach-orange.png')}
                  style={styles.attachFileIcon}
                />
              </TouchableOpacity>}
            </View>

            {sendBtnContainer && <View style={styles.sentBtnContainer}>
              {sendIcon && <TouchableOpacity onPress={this.sendMessage}>
                <Image source={require('../icons/send-btn.png')} style={styles.sendIconStyle} />
              </TouchableOpacity>}

              {micIcon && <TouchableOpacity onPress={this.toggelMic}>
                <Image source={require('../icons/mic.png')} style={styles.micIconStyle} />
              </TouchableOpacity>}
            </View>}
            {orangeMicContainer && <View style={styles.orangeMicContainer}>
              {micOrange && <TouchableOpacity onPress={this.toggelMicOrange}>
                <Image source={require('../icons/mic-orange.png')} style={styles.micIconStyle} />
              </TouchableOpacity>}
            </View>}
          </View>

        </View>
      </View>

    );
  }
}

export default Chatscreen;

