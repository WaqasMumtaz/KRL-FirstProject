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
import SoundRecorder from 'react-native-sound-recorder';
import styles from '../Styling/ChatScreenStyle';
import ImagePicker from 'react-native-image-picker';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, PermissionsAndroid } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
const BASE_URL = 'https://getfit-server.herokuapp.com';
import firebase from '../../Config/Firebase';
import 'firebase/firestore';
// const db = firebase.firestore();
const db = firebase.database();
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';
import FileViewer from 'react-native-file-viewer';
import { Linking } from 'react-native';
import FileOpener from 'react-native-file-opener';

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
      date: '',
      time: '',
      fetchChats: false,
      userId: '',
      opponentId: '',
      file: '',
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
      date: date + '/' + month + '/' + year,
      time: hours + ':' + min + ':' + sec
    })



    // const path = 'https://res.cloudinary.com/dxk0bmtei/image/upload/v1563776758/print_3_a6qjwn.ai';
    // const FileMimeType = 'pdf'

    // FileOpener.open(
    //   path,
    //   FileMimeType
    // ).then((msg) => {
    //   console.log('success!!' , msg)
    // }, (msg) => {
    //   console.log('error!!' , msg)
    // });
    // Linking.openURL(path).catch((err) => {
    //   console.log(err)
    // });

    // console.log('componentDidMount')
    // console.log(path ,'path')


    // FileViewer.open(path.slice(0, path.length))

    //   .then((res) => {
    //     console.log(res, 'respone')
    //     // success
    //   })
    //   .catch(error => {
    //     console.log(error, 'error')
    //     // error
    //   });
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
  }

  componentWillMount() {
    let chatArrayTemp = [];
    let dataFromLocalStorage;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        dataFromLocalStorage = JSON.parse(value);
      }
    });
    db.ref('chatRoom').on("value", snapshot => {
      let data = snapshot.val()
      for (var i in data) {
        let firbaseData = data[i]
        if (firbaseData.reciverId && firbaseData.senderId == dataFromLocalStorage._id) {
          chatArrayTemp.push(firbaseData)
          this.setState({
            sender: true,
            receiver: false
          })
        }

        if (firbaseData.reciverId && firbaseData.senderId == dataFromLocalStorage.trainnerId ||
          firbaseData.reciverId && firbaseData.senderId == dataFromLocalStorage.tainnyId) {
          // console.log('reciver condition true')
          chatArrayTemp.push(firbaseData)
          this.setState({
            receiver: true,
            sender: false
          })
        }
      }
      if (dataFromLocalStorage.trainnerId) {
        this.setState({
          opponentId: dataFromLocalStorage.trainnerId,
        })
      }
      else if (dataFromLocalStorage.tainnyId) {
        this.setState({
          opponentId: dataFromLocalStorage.tainnyId,
        })
      }
      this.setState({
        chatMessages: chatArrayTemp,
        userId: dataFromLocalStorage._id,


      })
      chatArrayTemp = [];
    });
    // socket.on('connect', ()=>{
    //   const nRoom = "nRoom";
    //   socket.emit('nRoom', nRoom)
    //   socket.on('one new user', data =>{
    //     console.log(data);
    //   })
    // })

  }
  sendMessage = async () => {
    const { textMessage, date, time } = this.state;
    let mgs = {}
    let data;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        data = JSON.parse(value);
        if (data.assignTrainner != undefined && data.trainnerId != undefined) {
          mgs.textMessage = textMessage;
          mgs.assignTrainner = data.assignTrainner;
          mgs.reciverId = data.trainnerId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = date;
          mgs.time = time;
          db.ref(`chatRoom/`).push(mgs);
        }
        else if (data.assignTrainny != undefined && data.tainnyId != undefined) {
          mgs.textMessage = textMessage;
          mgs.assignTrainny = data.assignTrainny;
          mgs.reciverId = data.tainnyId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = date;
          mgs.time = time;
          db.ref(`chatRoom/`).push(mgs);
        }
      }
    });
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


  toggelMic = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    let result;
    try {
      result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        { title: 'Microphone Permission', message: 'Enter the Gunbook needs access to your microphone so you can search with voice.' });
    } catch (error) {
      console.error('failed getting permission, result:', result);
    }
    console.log('permission result:', result);
    (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
    SoundRecorder.start(SoundRecorder.PATH_DOCUMENT + '/test.mp4')
      .then(function () {
        console.log('started recording');
      });
    setTimeout(() => {
      SoundRecorder.stop()
        .then(function (result) {
          console.log('stopped recording, audio file saved at: ' + result.path);
        });
    }, 6000);
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
    const { date, time } = this.state;
    let data;
    let imgBase644;
    let mgs = {}
    const options = {
      noData: true,
      mediaType: 'photo'
    }
    ImagePicker.showImagePicker(options, async (response) => {
      let res = await RNFS.readFile(response.uri, 'base64')
      imgBase644 = `data:image/jpg;base64,${res}`;

      AsyncStorage.getItem("currentUser").then(value => {
        if (value) {
          data = JSON.parse(value);
          if (data.assignTrainner != undefined && data.trainnerId != undefined) {
            mgs.image = imgBase644;
            mgs.assignTrainner = data.assignTrainner;
            mgs.reciverId = data.trainnerId;
            mgs.name = data.name;
            mgs.senderId = data._id;
            mgs.date = date;
            mgs.time = time;
            db.ref(`chatRoom/`).push(mgs);
          }
          else if (data.assignTrainny != undefined && data.tainnyId != undefined) {
            mgs.image = imgBase644;
            mgs.assignTrainny = data.assignTrainny;
            mgs.reciverId = data.tainnyId;
            mgs.name = data.name;
            mgs.senderId = data._id;
            mgs.date = date;
            mgs.time = time;
            db.ref(`chatRoom/`).push(mgs);
          }
        }
      });
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        this.setState({
          avatarSource: imgBase644,
          attachOrange: true,
          shareFiles: true
        });
      }

    })
  }

  expandImg = () => {
    const { expand } = this.state;
    console.log('function called')
    // if (expand) {
    this.setState({
      expand: true,
    })
    // }
    // else {
    //   this.setState({
    //     expand: false,
    //   })
    // }
  }
  shortPic = (e) => {
    console.log(e)
  }

  fileUpload = (e) => {
    console.log(e, 'file upload')
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {

        this.setState({
          file: response
        });
        this.funcForUpload()
      }
    });
  }

  async funcForUpload(values, key) {
    const { file } = this.state;
    Promise.all(file.map((val) => {
      return this.uploadFile(val).then((result) => {
        return result.body.url
      })
    })).then((results) => {
      console.log(results)
      // this.postData(values, results, key)
    })
  }

  uploadFile = (files) => {
    const image = files.originFileObj
    const cloudName = 'dxk0bmtei'
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    const timestamp = Date.now() / 1000
    const uploadPreset = 'toh6r3p2'
    const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
    const signature = sha1(paramsStr)
    const params = {
      'api_key': '878178936665133',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }
    return new Promise((res, rej) => {
      let uploadRequest = superagent.post(url)
      uploadRequest.attach('file', image)
      Object.keys(params).forEach((key) => {
        uploadRequest.field(key, params[key])
      })

      uploadRequest.end((err, resp) => {
        err ? rej(err) : res(resp);
      })
    })
  }
  render() {
    const { textMessage, sendIcon, micIcon, micOrange, sendBtnContainer, orangeMicContainer, recodringBody, messagContainer,
      attachGray, attachOrange, shareFiles, avatarSource, expand, userId, opponentId } = this.state;

    const chatMessages = this.state.chatMessages.map((message, key) => (
      <View>
        {message.senderId == userId &&

          message.textMessage ?
          <Text key={key} style={styles.msgsTextStyle}>
            {message.textMessage}
          </Text>
          :
          // expand ?
          //   <TouchableOpacity activeOpacity={0.5}
          //     style={styles.showPhotoContainer}
          //     onPress={this.expandImg}
          //   >
          //     <Image key={key} style={styles.canvas} source={{
          //       uri: `${message.image}`
          //     }} />
          //   </TouchableOpacity>
          //   :
          <TouchableOpacity activeOpacity={0.5}
            style={styles.showPhotoContainer}
            onPress={this.expandImg}
          >
            <Image key={key} style={styles.mgsImges} source={{
              uri: `${message.image}`
            }} />
          </TouchableOpacity>
        }
        {message.senderId == opponentId &&
          // message.textMessage ?
          <Text key={key} style={styles.replyMessagesStyle}>
            {message.textMessage}
          </Text>
          // :

          // <TouchableOpacity activeOpacity={0.5}
          //   style={styles.showPhotoContainer}
          //   onPress={this.expandImg.bind(this, )}
          // >
          //   <Image key={key} style={styles.mgsImges} source={{
          //     uri: `${message.image}`
          //   }} /> 
          //   </TouchableOpacity>
        }

      </View>
    ))
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
                  // {/* <Image source={{ uri: `data:image/gif;base64,${avatarSource}` }} /> */}

                  style={styles.photoContainer} />
              </TouchableOpacity>}

              {expand &&
                <Image source={{ uri: this.state.avatarSource }} style={styles.canvas} />
              }
              {/* {replyMessages} */}
              {shareFiles && <View style={styles.sendFielsTypeContainer}>
                <Text style={styles.shareTextStyle}>Share...</Text>
                <View style={styles.filesContainer}>
                  <TouchableOpacity onPress={this.choosePhotoFunc}>
                    <Image source={require('../icons/attach-photo.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.fileUpload}>
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

