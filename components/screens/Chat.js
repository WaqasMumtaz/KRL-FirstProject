import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  // NativeModules
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
import HttpUtils from '../Services/HttpUtils';
import Modal from "react-native-modal";
var CryptoJS = require('crypto-js');
// import FileOpener from 'react-native-file-opener';


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
      opponnetAvatarSource: '',
      name: '',
      isVisibleModal: false,
      modal: '',
      imagePath: ''
    }
  }

  componentDidMount() {
    const date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
      month = `0${month}`
    }
    this.setState({
      date: date + '-' + month + '-' + year,
      time: hours + ':' + min + ':' + sec
    })
  }

  componentWillMount() {
    AsyncStorage.getItem('opponentProfile').then((value) => {
      let userData = JSON.parse(value);
      if (value) {
        console.log(userData, 'userData')
        this.setState({
          opponnetAvatarSource: userData.image,
          name: userData.name
        })
      }
      else if (userData.name != undefined) {
        this.setState({
          opponnetAvatarSource: userData.image,
          name: userData.name
        })
      }
    })

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
        // console.log(firbaseData , 'firebase data')
        if (firbaseData.reciverId == dataFromLocalStorage._id && firbaseData.senderId == dataFromLocalStorage.trainnerId
          || firbaseData.senderId == dataFromLocalStorage.tainnyId) {
          chatArrayTemp.push(firbaseData)
          // console.log(chatArrayTemp, 'condition work ')
          // console.log(chatArrayTemp, 'chatArrayTemp')
        }
        if (firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == dataFromLocalStorage.trainnerId ||
          firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == dataFromLocalStorage.tainnyId) {
          chatArrayTemp.push(firbaseData)
          // console.log(chatArrayTemp, 'condition work 2')
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
      // console.log(chatArrayTemp , 'chatArrayTemp')
      this.setState({
        chatMessages: chatArrayTemp,
        userId: dataFromLocalStorage._id,
      })
      chatArrayTemp = [];
    });
  }

  uplaodDataOnFirebase = (userMessage, type, name) => {
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
          mgs.type = type;
          mgs.name = name;
          console.log(mgs, 'message')
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
          mgs.name = name;
          mgs.type = type;
          mgs.name = name;
          console.log(mgs, 'message')
          db.ref(`chatRoom/`).push(mgs);
        }
      }
    });
  }
  sendMessage = async () => {
    const { textMessage } = this.state;
    let type = 'text';
    //message send on firebase
    this.uplaodDataOnFirebase(textMessage, type)
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
        let timestamp = (Date.now() / 1000 | 0).toString();
        let api_key = '878178936665133'
        let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        let cloud = 'dxk0bmtei'
        let hash_string = 'timestamp=' + timestamp + api_secret
        let signature = CryptoJS.SHA1(hash_string).toString();
        let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
        let xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url);
        xhr.onload = () => {
          let uploadData = JSON.parse(xhr._response)
          this.uplaodDataOnFirebase(uploadData.secure_url, 'image', uploadData.original_filename)
        };
        let formdata = new FormData();
        formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
        formdata.append('timestamp', timestamp);
        formdata.append('api_key', api_key);
        formdata.append('signature', signature);
        xhr.send(formdata);
        // You can also display the image using data:
        this.setState({
          attachOrange: true,
          shareFiles: true
        });
      }
    })
  }

  fileUpload = async (e) => {
    const options = {
      noData: true,
      mediaType: 'file'
    }
    FilePickerManager.showFilePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        let timestamp = (Date.now() / 1000 | 0).toString();
        let api_key = '878178936665133'
        let api_secret = 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        let cloud = 'dxk0bmtei'
        let hash_string = 'timestamp=' + timestamp + api_secret
        let signature = CryptoJS.SHA1(hash_string).toString();
        let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/upload'
        let xhr = new XMLHttpRequest();
        xhr.open('POST', upload_url);
        xhr.onload = () => {
          var type = response.path.substring(response.path.lastIndexOf(".") + 1);
          let uploadData = JSON.parse(xhr._response)
          console.log(uploadData, 'uploadData')
          this.uplaodDataOnFirebase(uploadData.secure_url, type, uploadData.original_filename)
        };
        let formdata = new FormData();
        formdata.append('file', { uri: response.uri, type: response.type, name: response.fileName });
        formdata.append('timestamp', timestamp);
        formdata.append('api_key', api_key);
        formdata.append('signature', signature);
        xhr.send(formdata);
      }
    });
  }

  expandImg = (e) => {
    const { expand } = this.state;
    this.setState({
      expand: true,
      isVisibleModal: true,
      imagePath: e
    })
  }
  backToPage = () => {
    this.setState({
      expand: false,
      isVisibleModal: false
    })
  }


  fileOpner(e, type, g) {
    // console.log(e, 'e')
    // console.log(type, 'path')
    // console.log(g, 'path')
    const FilePath = e; // path of the file
    const FileMimeType = type; // mime type of the
    // FileOpener.open(
    //   FilePath,
    //   FileMimeType
    // ).then((msg) => {
    //   console.log(msg, 'success!!')
    // }, (err) => {
    //   console.log(err , 'error!!')
    // });

  }
  changeIcon = () => {
    this.setState({
      sendIcon: true,
      micIcon: false
    })
  }


  toggelMic = async () => {
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
  checkProfile = () => {
    const { navigate } = this.props.navigation;
    // console.log('checkProfile')
    navigate('Profile', {
      opponentProfile: true,
    });
  }

  render() {
    const { textMessage, sendIcon, micIcon, micOrange, sendBtnContainer, orangeMicContainer, recodringBody, messagContainer,
      attachGray, attachOrange, shareFiles, avatarSource, expand, userId, opponentId, opponnetAvatarSource, name, imagePath } = this.state;
    // console.log(userId , 'userId')
    // console.log(expand , 'opponentId')
    // let modal
    // // console.log(this.state.chatMessages, 'chatMessages')
    // if (expand) {
    //   modal = <Modal
    //     isVisible={this.state.isVisibleModal}
    //     animationIn='zoomIn'
    //     //animationOut='zoomOutDown'
    //     backdropOpacity={0.8}
    //     backdropColor='white'
    //     coverScreen={true}
    //     animationInTiming={800}
    //     animationOutTiming={500}
    //   >
    //     <View style={styles.cardContainer}>
    //       <View style={styles.dateWithCancelIcon}>
    //         <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
    //           <Image source={require('../icons/cancel.png')} />
    //         </TouchableOpacity>
    //       </View>
    //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
    //         <Image style={styles.mgsImges} source={{
    //           uri: `${imagePath}`
    //         }} />
    //       </View>
    //     </View>
    //   </Modal>
    // }
    const chatMessages = this.state.chatMessages.map((message, key) => (
      <View>
        {message.senderId == userId &&
          message.type == 'text' ?
          <Text key={key} style={styles.msgsTextStyle}>
            {message.message}
          </Text>
          :
          message.type == 'image' ?
            // <Image key={key} style={styles.mgsImges} source={{
            //   uri: `${message.message}`
            // }} />
            expand ?
              <Modal
                isVisible={this.state.isVisibleModal}
                animationIn='zoomIn'
                //animationOut='zoomOutDown'
                backdropOpacity={0.8}
                backdropColor='white'
                coverScreen={true}
                animationInTiming={800}
                animationOutTiming={500}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.dateWithCancelIcon}>
                    <TouchableOpacity onPress={this.backToPage} activeOpacity={0.6}>
                      <Image source={require('../icons/cancel.png')} />
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}> */}
                    <Image style={styles.expandImges} source={{
                      uri: `${imagePath}`
                    }} />
                  {/* </View> */}
                </View>
              </Modal>
              :
              <TouchableOpacity activeOpacity={0.5}
                style={styles.showPhotoContainer}
                onPress={this.expandImg.bind(this, message.message)}
              >
                <Image key={key} style={styles.mgsImges} source={{
                  // uri: `${message.image}`
                  uri: `${message.message}`
                }} />
              </TouchableOpacity>
            :
            message.type == 'txt' || message.type == 'docx' || message.type == 'doc' || message.type == 'pptx' || message.type == 'pdf'
              || message.type == 'mp4' || message.type == 'mp3' || message.type == 'wma' ?
              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.showPhotoContainer}
                  onPress={this.fileOpner.bind(this, message.message, message.type)}
                >
                  <Text style={styles.thumbnailTextStyle}>{message.type}</Text>
                  <Text style={styles.thumbnailNameTextStyle}>{message.name}</Text>

                </TouchableOpacity>
              </View>
              : null
        }
        {/* {expand ? <View> {modal}</View> : null} */}
        {/* {message.senderId == opponentId &&
          message.type == 'text' ?
          <Text key={key} style={styles.replyMessagesStyle}>
            {message.message}
          </Text>
          :
          message.type == 'image' ?
            <Image key={key} style={styles.mgsImges} source={{
              uri: `${message.message}`
            }} />
            :
            message.type == 'txt' || message.type == 'docx' || message.type == 'doc' || message.type == 'pptx' || message.type == 'pdf'
              || message.type == 'mp4' || message.type == 'mp3' || message.type == 'wma' ?
              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.showPhotoContainer}
                  onPress={this.fileOpner.bind(this, message.message)}
                >
                  <Text style={styles.thumbnailTextStyle}>{message.type}</Text>
                  <Text style={styles.thumbnailNameTextStyle}>{message.name}</Text>

                </TouchableOpacity>
              </View>
              : null
        } */}


        {/* {message.senderId == opponentId &&
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
        } */}

      </View>
    ))
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childMainContainer}>
          <View style={styles.chatProfileContainer}>
            <Text style={styles.profileNameStyle}>{name}</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={this.checkProfile}>
              <Image source={{ uri: `${opponnetAvatarSource}` }} style={styles.profilPicStyle} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            <View style={styles.container}>
              {recodringBody && <View style={styles.recordingContainer}>

              </View>}
              {chatMessages}
              {<TouchableOpacity activeOpacity={0.5}
                style={styles.showPhotoContainer}
                onPress={this.expandImg}
              >
                <Image source={{ uri: avatarSource }}
                  style={styles.photoContainer} />
              </TouchableOpacity>}
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

