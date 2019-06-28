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
//const screenWidth = Dimensions.get('window').width;
// const { height } = Dimensions.get('window');


class Chatscreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    }
    
     
};
constructor(props){
  super(props);

  this.state={
    textMessage:'',
    sendIcon:false,
    micIcon:true,
    micOrange:false,
    sendBtnContainer:true,
    orangeMicContainer:false,
    recodringBody:false
  }


}

onFocus=()=>{
  this.setState({
    sendIcon:true,
    micIcon:false
  })
}
onBlur=()=>{
  this.setState({
    micIcon:true,
    sendIcon:false
  })
}
toggelMic=()=>{
//const {micIcon , micOrange}=this.state;
this.setState({
  micIcon:false,
  micOrange:true,
  sendBtnContainer:false,
  orangeMicContainer:true,
  recodringBody:true
})
}
toggelMicOrange=()=>{
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
        recodringBody
      }=this.state;
console.log(textMessage);
        return (
          <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }} >
              <View style={styles.container}>
              {recodringBody &&<View style={styles.recordingContainer}>
             
             </View>}
              <View style={styles.textInputContainer}>
                <TextInput
                 onChangeText={(textMessage)=>{this.setState({textMessage})}}
                autoCorrect={false}
                placeholder="Type message here..."
                onFocus={()=>{this.onFocus()}}
                onBlur={()=>{this.onBlur()}}
                style={styles.inputStyle}
                />

               {sendBtnContainer && <View style={styles.sentBtnContainer}>
                {sendIcon &&  <TouchableOpacity>
                    <Image source={require('../icons/send-btn.png')} style={styles.iconStyle}/>
                  </TouchableOpacity>}

                  {micIcon && <TouchableOpacity onPress={this.toggelMic}>
                    <Image source={require('../icons/mic.png')} style={styles.iconStyle}/>
                  </TouchableOpacity>}
                </View>}
               {orangeMicContainer &&<View style={styles.orangeMicContainer}>
                {micOrange && <TouchableOpacity onPress={this.toggelMicOrange}>
                    <Image source={require('../icons/mic-orange.png')} style={styles.iconStyle}/>
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

