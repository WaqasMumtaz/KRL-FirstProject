import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Linking,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions

} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHight = Dimensions.get('window').height;
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
import FilePickerManager from 'react-native-file-picker';
import HttpUtils from '../Services/HttpUtils';
import VideoPlayer from 'react-native-video-player';
import Modal from "react-native-modal";
import ChartScreen from '../BarChart/BarChart';
import Spinner from 'react-native-loading-spinner-overlay';

const db = firebase.database();
const CryptoJS = require('crypto-js');


class Chatscreen extends React.Component {
  static navigationOptions = {
    title: 'Chat',
    headerTitleStyle: {
      fontFamily: "MontserratExtraBold",
      fontSize: 15,
      color: '#000000',
      textAlign: 'center',
      alignSelf: 'center',
    },
    headerTintColor: '#808080',
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
      opponnetAvatarSource: '',
      name: '',
      isVisibleModal: false,
      imagePath: '',
      monthName: ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"],
      weekExcercise: [],
      weekAgoDateDataWeights: [],
      currentDateDataWeights: [],
      loseWeight: '',
      lastWeek: '',
      cureentWeek: '',
      gainWeight: '',
      forTrainnerModal: false,
      senderData: '',
      isLoading: false,
      fileUpLoading: false,
      forVideoModal: false,
      smallVideo: true,
      largeSizeVideo: false
    }

  }

  handleFullScreenVideo = () => {
    console.log('video tag fullscreen')


  }
  // endVideo=()=>{
  //   console.log('End Video success')

  // }

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
  // componentWillUnmount() {
  //   // Remove the event listener
  //   this.focusListener.remove();
  // }




  componentWillMount() {
    const { senderData } = this.props.navigation.state.params;
    console.log(senderData, 'senderData')
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    AsyncStorage.getItem('currentUser').then((value) => {
      let userData = JSON.parse(value)
      if (userData.assignTrainner == undefined) {
        this.setState({
          forTrainnerModal: true
        })
      }
    })
    // });

    let chatArrayTemp = [];
    let dataFromLocalStorage;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        dataFromLocalStorage = JSON.parse(value);
        db.ref('chatRoom').on("value", snapshot => {
          let data = snapshot.val()
          for (let i in data) {
            let firbaseData = data[i]
            if (firbaseData.reciverId == dataFromLocalStorage._id && firbaseData.senderId == senderData.userId) {
              chatArrayTemp.push(firbaseData)
            }
            if (firbaseData.senderId == dataFromLocalStorage._id && firbaseData.reciverId == senderData.userId) {
              chatArrayTemp.push(firbaseData)
            }
          }
          this.setState({
            chatMessages: chatArrayTemp,
            userId: dataFromLocalStorage._id,
            opponentId: senderData.userId,
            opponnetAvatarSource: senderData.image,
            name: senderData.name
          })
          chatArrayTemp = [];
        });
      }
    });
    this.getWeekReportData()
  }

  uplaodDataOnFirebase = (userMessage, type) => {
    const { date, time } = this.state;
    let mgs = {}
    let data;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        data = JSON.parse(value);
        if (data.assignTrainner != undefined && data.trainnerId != undefined) {
          console.log('test')
          mgs.message = userMessage;
          mgs.assignTrainner = data.assignTrainner;
          mgs.reciverId = data.trainnerId;
          mgs.name = data.name;
          mgs.senderId = data._id;
          mgs.date = date;
          mgs.time = time;
          mgs.type = type;
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
          db.ref(`chatRoom/`).push(mgs);
        }
      }
    });
  }
  sendMessage = async () => {
    const { textMessage } = this.state;
    let type = 'text';
    //message send on firebase
    this.uplaodDataOnFirebase(textMessage, type, 'text')
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
          this.uplaodDataOnFirebase(uploadData, 'image')
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
        this.setState({
          isLoading: true,
          fileUpLoading: true
        })
        xhr.open('POST', upload_url);
        xhr.onload = () => {

          let type = response.path.substring(response.path.lastIndexOf(".") + 1);
          let uploadData = JSON.parse(xhr._response)
          if (uploadData) {
            this.setState({
              isLoading: false,
              fileUpLoading: false
            })
          }
          console.log(uploadData, 'uploadData')
          this.uplaodDataOnFirebase(uploadData, type)
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

  weeklyReport = () => {
    const { weekAgoDateDataWeights, currentDateDataWeights, loseWeight, lastWeek, cureentWeek, gainWeight } = this.state;
    let weight = {
      weekAgoDateDataWeights: weekAgoDateDataWeights,
      currentDateDataWeights: currentDateDataWeights,
      loseWeight: loseWeight,
      lastWeek: lastWeek,
      cureentWeek: cureentWeek,
      gainWeight: gainWeight
    }
    console.log(this.state.weekExcercise, 'test')
    let obj = {
      weekExcercise: this.state.weekExcercise,
      weight: weight
    }
    this.uplaodDataOnFirebase(obj, 'weeklyReport')
  }

  expandImg = (e) => {
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

  removeModal = () => {
    const { navigate } = this.props.navigation;
    this.setState({
      forTrainnerModal: false
    }, () => { navigate('Homescreen') })

  }


  fileOpner(e, type, g) {
    const FilePath = e; // path of the file
    const FileMimeType = type; // mime type of the
    Linking.openURL(
      FilePath
    ).then((msg) => {
      console.log(msg, 'success!!')
    }, (err) => {
      console.log(err, 'error!!')
    });

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
    const { senderData } = this.props.navigation.state.params;
    console.log('checkProfile')
    this.props.navigation.navigate('Profile', {
      opponentProfile: true,
      senderData: senderData
    })
    // navigate('Profile', {
    //   opponentProfile: true,
    // });
  }



  //get data from database
  getWeekReportData = async () => {
    const { monthName } = this.state;
    //create varibale for useage
    let dataExcersiceArr = [];
    let userId;
    let weekBefore;
    let cureentWeekData;
    let loseWeight;
    AsyncStorage.getItem("currentUser").then(value => {
      if (value) {
        let dataFromLocalStorage = JSON.parse(value);
        userId = dataFromLocalStorage._id;
      }
    });
    //getting api complete data excersice or weight mearsment
    let dataExcersice = await HttpUtils.get('getallexerciselog');
    let data = dataExcersice.content;
    let dataWeight = await HttpUtils.get('getweightlog');
    let weightData = dataWeight.content;
    //gettibg curent date
    const currentDayOfWeek = new Date().getDay() + 1;
    const currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3 || currentMonth == 4 || currentMonth == 5 ||
      currentMonth == 6 || currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
      currentMonth = `0${currentMonth}`
    }
    //getting weekly excersices 
    for (var i in data) {
      let dataApi = data[i];
      if (dataApi.userId == userId) {
        //get month name
        let getMonthNo = dataApi.month.slice(1) - 1;
        let getMontName = monthName[getMonthNo];
        dataApi.monthName = getMontName;
        //check week of the month
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currentMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        if (checkDate == 0 || checkDate == -1 || checkDate == -2 || checkDate == -3 || checkDate == -4 || checkDate == -5 ||
          checkDate == -6 || checkDate == -7 && checkMonth == 0 && checkYear == 0) {
          dataExcersiceArr = [...dataExcersiceArr, dataApi];
          this.setState({
            weekExcercise: dataExcersiceArr
          })
        }
      }
    }

    // //get week wise data and show bar chart line 
    for (var i in weightData) {
      let dataApi = weightData[i];
      if (dataApi.userId == userId) {
        //check week of the month
        let checkWeekDay = (Math.abs(currentDayOfWeek - dataApi.dayOfWeek));
        let checkDate = Number(dataApi.dayOfMonth) - currentDate;
        let checkMonth = Number(dataApi.month) - currentMonth;
        let checkYear = Number(dataApi.year) - currentYear;
        //condition check week ago data
        if (checkWeekDay == 0 && checkDate != 0 && checkMonth == 0 && checkYear == 0) {
          weekBefore = dataApi
          this.setState({
            weekAgoDateDataWeights: weekBefore
          })
        }
        //if data not has week ago then check a last week any day data
        if (checkWeekDay != 0 && checkMonth == 0 && checkYear == 0) {
          if (checkWeekDay == 1 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 2 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 3 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
          else if (checkWeekDay == 4 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 5 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 6 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          } else if (checkWeekDay == 7 && checkMonth == 0 && checkYear == 0) {
            weekBefore = dataApi
            this.setState({
              weekAgoDateDataWeights: weekBefore
            })
          }
        }
        //current date data
        if (checkDate == 0 && checkMonth == 0 && checkYear == 0) {
          cureentWeekData = dataApi
          this.setState({
            currentDateDataWeights: cureentWeekData
          })
        }
      }
    }
    // // availbe current date and week ago ago data then get lose or gain wieght
    if (cureentWeekData != undefined && weekBefore != undefined) {
      let weekAgoWieght = weekBefore.weight.substring(0, weekBefore.weight.length - 2);
      let currentWeekWieght = cureentWeekData.weight.substring(0, cureentWeekData.weight.length - 2);
      loseWeight = weekAgoWieght - currentWeekWieght;
    }
    //lose weight
    if (loseWeight > 0) {
      this.setState({
        loseWeight: loseWeight,
        lastWeek: 6,
        cureentWeek: 5
      })
    }
    //gain weight
    else if (loseWeight < 0) {
      let gainWeight = Math.abs(loseWeight);
      this.setState({
        lastWeek: 5,
        cureentWeek: 6,
        gainWeight: gainWeight
      })
    }
    //not gain or lose weight
    else if (loseWeight == 0) {
      this.setState({
        loseWeight: loseWeight,
        lastWeek: 6,
        cureentWeek: 6
      })
    }
    //not availeble today data
    else if (cureentWeekData == undefined) {
      this.setState({
        loseWeight: 0,
        lastWeek: 6,
        cureentWeek: 0
      })
    }
  }

  render() {
    const { textMessage, sendIcon, micIcon, micOrange, sendBtnContainer, orangeMicContainer, recodringBody, messagContainer,
      attachGray, attachOrange, shareFiles, avatarSource, expand, userId, opponentId, opponnetAvatarSource, name, imagePath } = this.state;
    console.log(opponnetAvatarSource, 'opponnetAvatarSource')
    const chatMessages = this.state.chatMessages.map((message, key) => (
      <View>
        {/* {this.state.forVideoModal ? 
             <Modal
             isVisible={this.state.forVideoModal}
             animationIn='zoomIn'
             backdropOpacity={0.8}
             backdropColor='white'
             coverScreen={true}
             animationInTiming={300}
             animationOutTiming={300}
           >

              <View style={styles.cardContainer}> 
              <Text>Hello To The World</Text>
             </View>
             
           </Modal>               
           : null

          } */}
        {message.senderId == userId && message.type == 'text' ?
          <Text key={key} style={styles.msgsTextStyle}>
            {message.message}
          </Text>
          :
          message.senderId == userId && message.type == 'image' ?
            <TouchableOpacity activeOpacity={0.5}
              style={styles.showPhotoContainer}
              onPress={this.expandImg.bind(this, message.message.secure_url)}
            >
              <Image key={key} style={styles.mgsImges} source={{
                uri: `${message.message.secure_url}`
              }} />
            </TouchableOpacity>
            :
            message.senderId == userId && message.type == 'pdf' ?
              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.mgsTouctable}
                  onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                >
                  <View style={styles.fileTagStyle}>
                    <View style={styles.extensionFile}>
                      <Image style={styles.thumbnailImageStyle} source={require('../icons/pdf.png')} />
                    </View>
                    <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              :
              message.senderId == userId && message.type == 'txt' ?
                <View>
                  <TouchableOpacity activeOpacity={0.5}
                    style={styles.mgsTouctable}
                    onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                  >
                    <View style={styles.fileTagStyle}>
                      <View style={styles.extensionFile}>
                        <Image style={styles.thumbnailImageStyle} source={require('../icons/txt.png')} />
                      </View>
                      <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                message.senderId == userId && message.type == 'docx' ?
                  <View>
                    <TouchableOpacity activeOpacity={0.5}
                      style={styles.mgsTouctable}
                      onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                    >
                      <View style={styles.fileTagStyle}>
                        <View style={styles.extensionFile}>
                          <Image style={styles.thumbnailImageStyle} source={require('../icons/docx.png')} />
                        </View>
                        <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  message.senderId == userId && message.type == 'doc' ?
                    <View>
                      <TouchableOpacity activeOpacity={0.5}
                        style={styles.mgsTouctable}
                        onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                      >
                        <View style={styles.fileTagStyle}>
                          <View style={styles.extensionFile}>
                            <Image style={styles.thumbnailImageStyle} source={require('../icons/doc.png')} />
                          </View>
                          <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    :
                    message.senderId == userId && message.type == 'pptx' ?
                      <View>
                        <TouchableOpacity activeOpacity={0.5}
                          style={styles.mgsTouctable}
                          onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                        >
                          <View style={styles.fileTagStyle}>
                            <View style={styles.extensionFile}>
                              <Image style={styles.thumbnailImageStyle} source={require('../icons/ppt.png')} />
                            </View>
                            <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      message.senderId == userId && message.type == 'mp3' ||
                        message.senderId == userId && message.type == 'wma' ?
                        <View>
                          <TouchableOpacity activeOpacity={0.5}
                            style={styles.mgsTouctable}
                            onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                          >
                            <View style={styles.fileTagStyle}>
                              <View style={styles.extensionFile}>
                                <Image style={styles.thumbnailImageStyle} source={require('../icons/audio.png')} />
                              </View>
                              <Text style={styles.thumbnailNameTextStyle}>{message.message.original_filename}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        :
                        message.senderId == userId &&
                          message.type == 'mp4'
                          ?
                          <View style={styles.videoTagMgs}>
                            <VideoPlayer
                              //videoWidth={300}
                              //videoHeight={this.state.video.height}
                              duration={message.message.duration}
                              video={{ uri: `${message.message.secure_url}` }}
                              ref={r => this.player = console.log(r)}
                              style={styles.backgroundVideo}
                              onLoad={this.handleFullScreenVideo}
                              fullScreen={true}

                            />

                          </View>

                          // :
                          // message.senderId == userId &&
                          // message.type == 'mp4' && this.state.largeSizeVideo == true ?
                          // <View style={styles.largeVideoSize}>
                          //   <VideoPlayer
                          //     //videoWidth={300}
                          //     //videoHeight={this.state.video.height}
                          //     duration={message.message.duration}
                          //     video={{ uri: `${message.message.secure_url}` }}
                          //     ref={r => this.player = console.log(r)}
                          //     style={styles.backgroundVideo}
                          //     onEnd={this.endVideo}



                          //   />

                          // </View>
                          :
                          message.senderId == userId && message.type == 'weeklyReport'
                            ?
                            <View style={styles.cardRight}>
                              <View style={styles.totalExerciseContainer}>
                                <Text style={styles.totalExercisHeading}>Total exercise{'\n'}done</Text>
                                {
                                  message.message.weekExcercise.map((elem, key) => {
                                    return (
                                      <View style={styles.exerciseResultCard}>
                                        <Text style={styles.resultHeading}>
                                          {elem.exerciseName}
                                        </Text>
                                        <View style={styles.dataResultParent}>
                                          <View style={styles.timeShowContainer}>
                                            <Text style={styles.timeShow}>
                                              {`${elem.exerciseAmount} ${elem.exerciseUnit}`}
                                            </Text>
                                          </View>
                                          <View style={styles.dateAndMonth}>
                                            <Text maxLength={3} style={styles.dateAndMonthShow}>
                                              {elem.monthName}
                                            </Text>
                                            <Text style={styles.dateNumber}>
                                              {elem.dayOfMonth}
                                            </Text>
                                            <Text style={styles.superScriptTextStyle}>
                                              {elem.dayOfMonth == 1 ? 'st' : elem.dayOfMonth == 2 ? '2nd' : elem.dayOfMonth == 3 ? 'rd' : 'th'}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                              <View style={styles.weightStatus}>
                                <Text style={styles.headingText}>Weight{'\n'}status</Text>
                                <View style={styles.statusGraphContainer}>
                                  <View style={styles.midBox}>
                                    <ChartScreen lastWeek={message.message.weight.lastWeek} cureentWeek={message.message.weight.cureentWeek} />
                                  </View>
                                  <View style={styles.borderLines1}>
                                    <Text style={styles.kgTextOne}>
                                      {message.message.weight.currentDateDataWeights.weight}
                                    </Text>
                                    <Text style={styles.kgTextTwo}>
                                      {message.message.weight.weekAgoDateDataWeights.weight}
                                    </Text>
                                  </View>
                                  <View style={styles.weeksTextContainer}>
                                    <Text style={styles.thisWeek}>This week</Text>
                                    <Text style={styles.lastWeek}>Last week</Text>
                                  </View>
                                  {message.message.weight.loseWeight || message.message.weight.loseWeight == 0
                                    || message.message.weight.loseWeight != undefined ?
                                    <View>
                                      <Text style={styles.lostKg}>{`${message.message.weight.loseWeight} KG`} </Text>
                                      <Text style={styles.lostText}>Lost</Text>
                                    </View>
                                    :
                                    <View>
                                      <Text style={styles.lostKg}>{`${message.message.weight.gainWeight} KG`} </Text>
                                      <Text style={styles.lostText}>Gain</Text>
                                    </View>
                                  }
                                </View>
                              </View>
                            </View>
                            : null
        }


        {message.senderId == opponentId && message.type == 'text' ?
          <Text key={key} style={styles.replyMessagesStyle}>
            {message.message}
          </Text>
          :
          message.senderId == opponentId && message.type == 'image' ?
            <TouchableOpacity activeOpacity={0.5}
              style={styles.replyshowPhotoContainer}
              onPress={this.expandImg.bind(this, message.message.secure_url)}
            >
              <Image key={key} style={styles.replymgsImges} source={{
                uri: `${message.message.secure_url}`
              }} />
            </TouchableOpacity>
            :
            message.senderId == opponentId && message.type == 'pdf' ?
              <View>
                <TouchableOpacity activeOpacity={0.5}
                  style={styles.replymgsTouctable}
                  onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                >
                  <View style={styles.replyfileTagStyle}>
                    <View style={styles.replyextensionFile}>
                      <Image style={styles.replythumbnailImageStyle} source={require('../icons/pdf.png')} />
                    </View>
                    <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              :
              message.senderId == opponentId && message.type == 'txt' ?
                <View>
                  <TouchableOpacity activeOpacity={0.5}
                    style={styles.replymgsTouctable}
                    onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                  >
                    <View style={styles.replyfileTagStyle}>
                      <View style={styles.replyextensionFile}>
                        <Image style={styles.replythumbnailImageStyle} source={require('../icons/txt.png')} />
                      </View>
                      <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                :
                message.senderId == opponentId && message.type == 'docx' ?
                  <View>
                    <TouchableOpacity activeOpacity={0.5}
                      style={styles.replymgsTouctable}
                      onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                    >
                      <View style={styles.replyfileTagStyle}>
                        <View style={styles.replyextensionFile}>
                          <Image style={styles.replythumbnailImageStyle} source={require('../icons/docx.png')} />
                        </View>
                        <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  message.senderId == opponentId && message.type == 'doc' ?
                    <View>
                      <TouchableOpacity activeOpacity={0.5}
                        style={styles.replymgsTouctable}
                        onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                      >
                        <View style={styles.replyfileTagStyle}>
                          <View style={styles.replyextensionFile}>
                            <Image style={styles.replythumbnailImageStyle} source={require('../icons/doc.png')} />
                          </View>
                          <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    :
                    message.senderId == opponentId && message.type == 'pptx' ?
                      <View>
                        <TouchableOpacity activeOpacity={0.5}
                          style={styles.replymgsTouctable}
                          onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                        >
                          <View style={styles.replyfileTagStyle}>
                            <View style={styles.replyextensionFile}>
                              <Image style={styles.replythumbnailImageStyle} source={require('../icons/ppt.png')} />
                            </View>
                            <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      message.senderId == opponentId && message.type == 'mp3' ||
                        message.senderId == opponentId && message.type == 'wma' ?
                        <View>
                          <TouchableOpacity activeOpacity={0.5}
                            style={styles.replymgsTouctable}
                            onPress={this.fileOpner.bind(this, message.message.secure_url, message.type)}
                          >
                            <View style={styles.replyfileTagStyle}>
                              <View style={styles.replyextensionFile}>
                                <Image style={styles.replythumbnailImageStyle} source={require('../icons/audio.png')} />
                              </View>
                              <Text style={styles.replythumbnailNameTextStyle}>{message.message.original_filename}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        :
                        message.senderId == opponentId &&
                          message.type == 'mp4'
                          ?
                          <View style={styles.replyvideoTagMgs}>
                            <VideoPlayer
                              // videoWidth={this.state.video.width}
                              // videoHeight={this.state.video.height}
                              duration={message.message.duration}
                              video={{ uri: `${message.message.secure_url}` }}
                              ref={r => this.player = console.log(r)}
                              style={styles.backgroundVideo}
                              fullScreen={true}
                            />
                          </View>
                          :
                          message.senderId == opponentId && message.type == 'weeklyReport'
                            ?
                            <View style={styles.replycardRight}>
                              <View style={styles.replytotalExerciseContainer}>
                                <Text style={styles.replytotalExercisHeading}>Total exercise{'\n'}done</Text>
                                {
                                  message.message.weekExcercise.map((elem, key) => {
                                    return (
                                      <View style={styles.replyexerciseResultCard}>
                                        <Text style={styles.replyresultHeading}>
                                          {elem.exerciseName}
                                        </Text>
                                        <View style={styles.replydataResultParent}>
                                          <View style={styles.replytimeShowContainer}>
                                            <Text style={styles.replytimeShow}>
                                              {`${elem.exerciseAmount} ${elem.exerciseUnit}`}
                                            </Text>
                                          </View>
                                          <View style={styles.replydateAndMonth}>
                                            <Text maxLength={3} style={styles.replydateAndMonthShow}>
                                              {elem.monthName}
                                            </Text>
                                            <Text style={styles.replydateNumber}>
                                              {elem.dayOfMonth}
                                            </Text>
                                            <Text style={styles.replysuperScriptTextStyle}>
                                              {elem.dayOfMonth == 1 ? 'st' : elem.dayOfMonth == 2 ? '2nd' : elem.dayOfMonth == 3 ? 'rd' : 'th'}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    )
                                  })
                                }
                              </View>
                              <View style={styles.replyweightStatus}>
                                <Text style={styles.replyheadingText}>Weight{'\n'}status</Text>
                                <View style={styles.replystatusGraphContainer}>
                                  <View style={styles.replymidBox}>
                                    <ChartScreen lastWeek={message.message.weight.lastWeek} cureentWeek={message.message.weight.cureentWeek} />
                                  </View>
                                  <View style={styles.replyborderLines1}>
                                    <Text style={styles.replykgTextOne}>
                                      {message.message.weight.currentDateDataWeights.weight}
                                    </Text>
                                    <Text style={styles.replykgTextTwo}>
                                      {message.message.weight.weekAgoDateDataWeights.weight}
                                    </Text>
                                  </View>
                                  <View style={styles.replyweeksTextContainer}>
                                    <Text style={styles.replythisWeek}>This week</Text>
                                    <Text style={styles.replylastWeek}>Last week</Text>
                                  </View>
                                  {message.message.weight.loseWeight || message.message.weight.loseWeight == 0
                                    || message.message.weight.loseWeight != undefined ?
                                    <View>
                                      <Text style={styles.replylostKg}>{`${message.message.weight.loseWeight} KG`} </Text>
                                      <Text style={styles.replylostText}>Lost</Text>
                                    </View>
                                    :
                                    <View>
                                      <Text style={styles.replylostKg}>{`${message.message.weight.gainWeight} KG`} </Text>
                                      <Text style={styles.replylostText}>Gain</Text>
                                    </View>
                                  }
                                </View>
                              </View>
                            </View >
                            : null
        }
      </View>
    ))
    return (
      <View style={styles.mainContainer}>
        <View style={styles.childMainContainer}>
          {opponnetAvatarSource != undefined ?
            <View style={styles.chatProfileContainer}>
              <Text style={styles.profileNameStyle}>{name}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.checkProfile}>
                <Image source={{ uri: `${opponnetAvatarSource}` }} style={styles.profilPicStyle} />
              </TouchableOpacity>
            </View>
            :
            <View style={styles.chatProfileContainer}>
              <Text style={styles.profileNameStyle}>{name}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this.checkProfile}>
                <Image source={require('../icons/profile.png')} style={styles.profilPicStyle} />
              </TouchableOpacity>
            </View>
          }
          <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            <View style={styles.container}>
              {recodringBody && <View style={styles.recordingContainer}>
              </View>}
              {chatMessages}
              {expand ?
                <Modal
                  isVisible={this.state.isVisibleModal}
                  animationIn='zoomIn'
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
                    <Image style={styles.expandImges} source={{
                      uri: `${imagePath}`
                    }} />
                  </View>
                </Modal>
                : null}
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
                  <TouchableOpacity onPress={this.weeklyReport}>
                    <Image source={require('../icons/attach-report.png')}
                      style={styles.attachFilesStyle}
                    />
                  </TouchableOpacity>
                </View>
              </View>}
            </View>
          </ScrollView>

          {this.state.isLoading == true ?
            <View style={styles.spinnerContainer}>
              <Spinner
                //visibility of Overlay Loading Spinner
                visible={this.state.fileUpLoading}
                //Text with the Spinner 
                textContent={'File Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
                color={'#FF6200'}

              />
            </View>
            : null
          }

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
            {/* When user does not assign trainer show this modal*/}
            {/* <Modal
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

            </Modal> */}



          </View>

        </View>
      </View>
    );
  }
}
export default Chatscreen;
