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
import styles from '../Styling/ChatScreenStyle';
import ImagePicker from 'react-native-image-picker';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
import io from 'socket.io-client';
//import io from 'socket.io/socket.io.js'
const socket = io.connect("http://192.168.100.9:3000",
//const socket = io.connect("http://localhost:3000",
  {
    jsonp: false,
    transports: ['websocket']
  });

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
      //repMessages:[],
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
      avatarSource:null,
      expand:false
    }



  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Congrates!! user connected');
      console.log(socket.connected)
      socket.on('chat message', data => {
        this.setState({
          chatMessages: [...this.state.chatMessages, data],

        })
      })

    })
    // socket.on('repmsg', msg =>{
    //   this.setState({
    //     repMessages:[...this.state.repMessages, msg]
    //   })
    // })


  }

  sendMessage = () => {
    console.log(this.state.textMessage)
    socket.emit("chat message", this.state.textMessage);
    console.log(socket.connected);

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

  choosePhotoFunc= ()=>{
    const options ={
      noData:true,
      mediaType:'photo'
    }
    ImagePicker.showImagePicker(options, (response)=>{
    console.log('Response Image Picker --->>>' ,response)

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
        attachOrange:false,
        shareFiles:false
      });
    }

    })
  }

  expandImg=()=>{
    this.setState({
      expand:true,
    })

  }
  shortPic=(e)=>{
    console.log(e)
  }



  render() {
    const {
      textMessage,
      sendIcon,
      micIcon,
      micOrange,
      sendBtnContainer,
      orangeMicContainer,
      recodringBody,
      messagContainer,
      repMessages,
      attachGray,
      attachOrange,
      shareFiles,
      avatarSource,
      expand
    } = this.state;
    const chatMessages = this.state.chatMessages.map(message => (
      <Text key={message} style={styles.msgsTextStyle}>
        {message}
      </Text>
    ))
    //const replyMessages = repMessages.map(items => <Text key={items} style={styles.replyMessagesStyle}>{items}</Text>) 
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childMainContainer}>
        <View style={styles.chatProfileContainer}>
         <Text style={styles.profileNameStyle}>Waqas</Text>
         {/* <View style={styles.profilPicContainer}> */}
         <Image source={require('../icons/profil.jpg')} style={styles.profilPicStyle}/>
         {/* </View> */}
        </View>

        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
         ref={ref => this.scrollView = ref}
         onContentSizeChange={(contentWidth, contentHeight)=>{
          this.scrollView.scrollToEnd({animated: true});
        
         }}
        >
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
              <Image source={{uri:avatarSource}} 
                  style={styles.photoContainer}/>
            </TouchableOpacity>}

            {expand &&
             <Image source={{uri:this.state.avatarSource}} style={styles.canvas}/> 
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

