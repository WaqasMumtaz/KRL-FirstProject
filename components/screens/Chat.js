import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
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
import firebase from '../../Config/Firebase';
import 'firebase/firestore';
const db = firebase.database();
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';

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
      userId: '',
      opponentId: '',
      file: '',
    }
  }

  componentDidMount() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    this.setState({
      date: date + '/' + month + '/' + year,
      time: hours + ':' + min + ':' + sec
    })
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
        if (firbaseData.reciverId == dataFromLocalStorage._id && firbaseData.senderId == dataFromLocalStorage.trainnerId
          || firbaseData.senderId == dataFromLocalStorage.tainnyId) {
          chatArrayTemp.push(firbaseData)
        }
        if (firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == dataFromLocalStorage.trainnerId ||
          firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == dataFromLocalStorage.tainnyId) {
          chatArrayTemp.push(firbaseData)
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
  }
  uplaodDataOnFirebase = (userMessage) => {
    const { date, time } = this.state;
    let mgs = {}
    let data;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        data = JSON.parse(value);
        if (data.assignTrainner != undefined && data.trainnerId != undefined) {
          mgs.message = userMessage;
          mgs.assignTrainner = data.assignTrainner;
          mgs.reciverId = data.trainnerId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = date;
          mgs.time = time;
          // `${mgs}.${dd}`
          db.ref(`chatRoom/`).push(mgs);
        }
        else if (data.assignTrainny != undefined && data.tainnyId != undefined) {
          mgs.message = userMessage;
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


  }
  sendMessage = async () => {
    const { textMessage } = this.state;

    //message send on firebase
    this.uplaodDataOnFirebase(textMessage)

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
    const options = {
      noData: true,
      mediaType: 'photo'
    }
    ImagePicker.showImagePicker(options, async (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let contentType = response.type
        let res = await RNFS.readFile(response.uri, 'base64')
        let imgBase644 = `data:${contentType};base64,${res}`;
        let apiUrl = 'https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload';
        let data = {
          "file": imgBase644,
          "upload_preset": "toh6r3p2",
        }

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          let data = await r.json()
          //send image on firebase
          this.uplaodDataOnFirebase(data.secure_url)
          // this.setState({
          //   avatarSource: data.secure_url,
          // })
          return data.secure_url
        }).catch(err => console.log(err))
        // You can also display the image using data:
        this.setState({
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
    FilePickerManager.showFilePicker(null, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        console.log(response, 'responnse')
        // const files = Array.from(response)
        // const formData = new FormData()
        // for(var name in response) {
        //   formData.append(name, response[name]);
        // }

        // files.forEach((response, i) => {
        //   formData.append(i, response)
        // })
        // const uri = response.uri;
        // const uriParts = uri.split('.');
        // const fileType = response.type;
        // const formData = new FormData();
        // formData.append('file', {
        //   uri,
        //   name: `file.${fileType}`,
        //   type: `image/${fileType}`,
        // });

        //   var formdata = new FormData();

        //   formdata.append('file', response);
        //   formdata.append('cloud_name', 'dxk0bmtei');
        //   formdata.append('upload_preset', 'toh6r3p2');

        //   var xhr = new XMLHttpRequest();
        //   xhr.open('POST', "https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload", true);

        //   xhr.onload = function () {
        //     // do something to response
        //     console.log(this.responseText);
        //   };
        //   xhr.send(formdata);
        // }

        // const dataForm = new FormData();
        // const unsignedUploadPreset = "toh6r3p2"
        // dataForm.append('file', { uri: 'file://' + response.uri, name: response.fileName, type: response.type , });
        // dataForm.append('upload_preset' ,unsignedUploadPreset )
        // data.append({name: 'file', filename: response.name, type: response.type, data: response.uri}),
        // data.append({name: 'upload_preset', data: 'toh6r3p2'})
        // let a = { uri: 'file://' + response.uri, name: response.fileName, type: response.type, }
        // console.log(a, 'form dat')

        // let url = response.uri
        // const cleanURL = url.replace("content://", "");

        // const formData = new FormData()
        // for(var name in response) {
        //   formData.append(name, response[name]);
        // }

        let apiUrl = 'https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload';

        // var fileName = response.uri.substring(response.uri.lastIndexOf("/") + 1);
        // var fsPath = response.uri;

        // const path = response.uri + response.filename;
        const path = response.uri;

        const contents = await RNFS.readFileSync(path,{ encoding: 'utf8' });
        console.log(contents, 'contents')
        let data = {
          'file': fsPath,
          "upload_preset": "toh6r3p2",
          'name': fileName,
          // 'type': response.type,
        }

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
            // 'content-type': response.type
            // 'Content-Type': 'multipart/form-data'
            // 'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
        }).then(async r => {
          let data = await r.json()
          console.log(data, 'data')
          return data.secure_url
        }).catch(err => console.log(err))

        // let timestamp = (Date.now() / 1000 | 0).toString();
        // let api_key = '878178936665133'
        // // let api_secret = 'your api secret'
        // let cloud = 'dxk0bmtei'
        // const uploadPreset = 'toh6r3p2'
        // // let hash_string = 'timestamp=' + timestamp + api_secret
        // // let signature = CryptoJS.SHA1(hash_string).toString();
        // let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', upload_url);
        // xhr.onload = () => {
        //   console.log(xhr);
        // };
        // let formdata = new FormData();
        // formdata.append('file', {uri: response.uri, type: response.type, name: response.fileName});
        // // formdata.append('timestamp', timestamp);
        // formdata.append('api_key', api_key);
        // formdata.append('uploadPreset' , uploadPreset)
        // // formdata.append('signature', signature);
        // console.log(formdata , 'formdata')
        // xhr.send(formdata);
      }

      // this.setState({
      //   file: response
    });
  }


  render() {
    const { textMessage, sendIcon, micIcon, micOrange, sendBtnContainer, orangeMicContainer, recodringBody, messagContainer,
      attachGray, attachOrange, shareFiles, avatarSource, expand, userId, opponentId } = this.state;

    const chatMessages = this.state.chatMessages.map((message, key) => (
      <View>
        {message.senderId == userId &&
          <Text key={key} style={styles.msgsTextStyle}>
            {message.textMessage}
          </Text>
          // : null
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
          // <TouchableOpacity activeOpacity={0.5}
          //   style={styles.showPhotoContainer}
          //   onPress={this.expandImg}
          // >
          //   <Image key={key} style={styles.mgsImges} source={{
          //     // uri: `${message.image}`
          //     uri: `${message.image}`
          //   }} />
          // </TouchableOpacity>
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
              {<TouchableOpacity activeOpacity={0.5}
                style={styles.showPhotoContainer}
                onPress={this.expandImg}
              >
                <Image source={{ uri: avatarSource }}
                  // {/* <Image source={{ uri: `data:image/gif;base64,${avatarSource}` }} /> 

                  style={styles.photoContainer} />
              </TouchableOpacity>}

              {/* {expand &&
                <Image source={{ uri: this.state.avatarSource }} style={styles.canvas} />
              } */}
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

