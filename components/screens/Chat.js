import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from '../Styling/ChatScreenStyle';
import io from 'socket.io-client';
//import io from 'socket.io/socket.io.js'
const socket = io.connect("http://192.168.100.24:3000",
 { 
  jsonp: false, 
  transports: ['websocket']
 });

//const socket = io.connect('http://localhost:3000');
// socket.on('EVENT_CONNECT', () => { console.log(socket.connected);  });
// socket.on("testing", function(d) {
//   console.log(d);
// });
//const client = io('ws://echo.websocket.org');
//const socket = io('http://localhost');
//const io = require('socket.io-client/dist/socket.io');
//import io from 'socket.io-client/dist/socket.io'
//const screenWidth = Dimensions.get('window').width;
// const { height } = Dimensions.get('window');
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'], // you need to explicitly tell it to use websockets
 };


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
      recodringBody: false
    }
    
    //this.socket = io("http://192.168.100.24:3000")
    //  this.socket = io("http://localhost:3000")
    // console.log(socket)
    // this.socket.on('connect', ()=>{
    //   console.log('user is connected')
    // })
     //console.log(this.socket = io("http://localhost:3000"))
//      this.socket.on('connect', () => {
//      console.log('Connected user',socket.connected)
// })

  }

   componentDidMount() {
    socket.on('connect', ()=>{
      console.log('Congrates!! user connected');
      console.log(socket.connected)
    })
    
   }

  sendMessage = () => {
    console.log(this.state.textMessage)
    socket.emit("chat message", this.state.textMessage);
    console.log(socket.connected);
    
    
    
    // this.socket.on('userData',data =>{
    //   console.log(data)
      
    // })
    
    this.setState({
      textMessage: ''
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

  // onFocus=()=>{
  //   this.setState({
  //     sendIcon:true,
  //     micIcon:false
  //   })
  // }
  // onBlur=()=>{
  //   this.setState({
  //     micIcon:true,
  //     sendIcon:false
  //   })
  // }
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



  render() {
    const {
      textMessage,
      sendIcon,
      micIcon,
      micOrange,
      sendBtnContainer,
      orangeMicContainer,
      recodringBody,
      chatMessages
    } = this.state;
    //console.log(chatMessages);
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.container}>
            {recodringBody && <View style={styles.recordingContainer}>

            </View>}
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={(textMessage) => { this.setState({ textMessage }) }}
                autoCorrect={false}
                placeholder="Type message here..."
                onKeyPress={() => { this.changeIcon() }}
                value={textMessage}
                //onFocus={()=>{this.onFocus()}}
                //onBlur={()=>{this.onBlur()}}
                style={styles.inputStyle}
              />

              {sendBtnContainer && <View style={styles.sentBtnContainer}>
                {sendIcon && <TouchableOpacity onPress={this.sendMessage}>
                  <Image source={require('../icons/send-btn.png')} style={styles.iconStyle} />
                </TouchableOpacity>}

                {micIcon && <TouchableOpacity onPress={this.toggelMic}>
                  <Image source={require('../icons/mic.png')} style={styles.iconStyle} />
                </TouchableOpacity>}
              </View>}
              {orangeMicContainer && <View style={styles.orangeMicContainer}>
                {micOrange && <TouchableOpacity onPress={this.toggelMicOrange}>
                  <Image source={require('../icons/mic-orange.png')} style={styles.iconStyle} />
                </TouchableOpacity>}
              </View>}
            </View>


          </View>
        </ScrollView>

      </View>

    );
  }
}

export default Chatscreen;

