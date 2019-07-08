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
      messagContainer:false
    }
    
    

  }

   componentDidMount() {
    socket.on('connect', ()=>{
      console.log('Congrates!! user connected');
      console.log(socket.connected)
      socket.on('chat message',msg =>{
        this.setState({
          chatMessages:[...this.state.chatMessages, msg],

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
      messagContainer:true,
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
      repMessages
    } = this.state;
  const chatMessages = this.state.chatMessages.map(message => (
     <Text key={message} style={styles.msgsTextStyle}>
    {message}
       </Text>
    ))
  //const replyMessages = repMessages.map(items => <Text key={items} style={styles.replyMessagesStyle}>{items}</Text>) 
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }} >
          <View style={styles.container}>
            {recodringBody && <View style={styles.recordingContainer}>

            </View>}
            {/* {messagContainer && <View style={styles.chatMessagsContainer}>
                     {chatMessages}
            </View>} */}
             {chatMessages}
             {replyMessages}
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
               <TouchableOpacity style={styles.fileAttachContainer}>
                
               </TouchableOpacity>
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

