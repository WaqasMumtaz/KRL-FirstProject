import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import styles from '../Styling/InvoicesScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import HttpUtilsFile from '../Services/HttpUtils';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import MonthSelectorCalendar from 'react-native-month-selector';
// import moment from 'react-native';
// console.log('moment', moment)

const { height } = Dimensions.get('window');
const columsNum = 2;

class Invoices extends React.Component {
    static navigationOptions = (navigation) => {
        //const { params = {} } = navigation.state;
        const { navigate } = navigation.navigation.navigate
        return {
            // headerRight:
            //      <TouchableOpacity style={styles.headerIconContainer}>
            //          <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
            //      </TouchableOpacity>,

            headerStyle: {
                backgroundColor: 'white'

            },
            headerTintColor: 'gray',
        }

    }
    constructor(props) {
        super(props);

        this.state = {
            allDataUser: [],
            invoiceData: [],
            isVisibleModal: false,
            receipt_img: '',
            month: '',
            date: "",
            time: '',
            showPicker: false,
            monthArr: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            fullDate: '',
            allDataShow: true,
            monthRelatedData: false,
            renderMonthData: '',
            noFound: false,
            releaseMonth: '',
            noInvoices: '',
            showNullInvoices: false,
            notMatch: false,
            showalert: false,
            

        }

    }

    componentWillMount() {
        this.dataRetrieve()
        //console.log(moment)
        // let monthNo = new Date().getMonth();
        // const date = new Date().getDate();
        // const year = new Date().getFullYear();
        // const hours = new Date().getHours();
        // const min = new Date().getMinutes();
        // const sec = new Date().getSeconds();
        // if (monthNo == 1 || monthNo == 2 || monthNo == 3 || monthNo == 4 || monthNo == 5 || monthNo == 6 || monthNo == 7 || monthNo == 8 || monthNo == 9) {
        //     month = `0${monthNo + 1}`;
        // }
        // else {
        //     month = monthNo + 1;
        // }
        // this.setState({
        //     month:date + '-' + month + '-' + year,
        // })
    }



    dataRetrieve = async () => {
        const getData = await AsyncStorage.getItem("currentUser");
        const parsForm = JSON.parse(getData)
        console.log(parsForm)
        let userObj = {
            userId: parsForm._id
        }
        console.log('obj id >>>', userObj)
        try {
            const userData = await HttpUtilsFile.post('invoice', userObj)
            console.log('api response >>>', userData)
            const userContent = userData.content;
            //console.log(userContent.length)
            if (userData.code == 200) {
                console.log('api success')
                if (userContent.length == 0) {
                    console.log(userData.msg)
                    this.setState({
                        noInvoices: userData.msg,
                        showNullInvoices: true
                    })
                }
                else {
                    //    let arrayData = this.state.allDataUser;
                    //    arrayData = [...arrayData, userContent]
                    this.setState({
                        allDataUser: userContent,
                        invoiceData: userContent
                    }, () => {
                        for (let i in this.state.allDataUser) {
                            const dataUser = this.state.allDataUser[i];
                            //console.log('setstate data >>>',dataUser)
                            if (dataUser.receiptImg != undefined) {
                                this.setState({
                                    receipt_img: dataUser.receiptImg
                                })
                            }
                        }
                    })
                }
            }

        }
        catch (error) {
            console.log(error)
        }


    }

    openModal = () => {
        this.setState({
            isVisibleModal: true
        })
    }
    closeModal = () => {
        this.setState({
            isVisibleModal: false
        })
    }


    _keyExtractor = (item, index) => item.id;

    renderDataItems = ({ item }) => {
        // console.log('data items >>', item)
        // console.log('service name >>>', item.serviceName)
        return (
            <View style={styles.bodyContainer}>
                <View style={styles.cardLeft}>
                    <View style={styles.childContainer}>
                        <View style={styles.cardNumberContainer}>
                            <Text style={styles.cardNumberStyle}>{item.serviceName == undefined ?
                                'Online Payment'
                                : item.serviceName
                            }</Text>
                            {item.serviceName != undefined ?
                                <View style={styles.checkReceipt}>
                                    <Text style={styles.checkReceiptText}>Check Receipt</Text>
                                    <TouchableOpacity onPress={this.openModal}>
                                        <Image source={require('../icons/attach-orange.png')}
                                            style={styles.iconStyle}
                                            resizeMode='cover'
                                        />
                                    </TouchableOpacity>
                                </View>
                                : null
                            }
                            <Text style={styles.priceDetail}>
                                Rs. {item.amount}
                            </Text>
                            <Text style={styles.textStyle}>Coach fees</Text>
                            <View style={styles.dateMonthContainer}>
                                <Text style={styles.monthName}>
                                    {item.paymentMonth}
                                </Text>
                                {/* <Text style={styles.dateNumber}>1</Text>
              <Text style={styles.superScriptTextStyle}>st</Text>
              <Text style={styles.yearStyle}>,2019</Text> */}
                            </View>
                            <Text style={styles.textStyle}>Issue date</Text>
                            <View style={styles.paymentStatusContainer}>
                                <Text style={styles.unpaidTextStyle}>paid</Text>
                                <Text style={styles.textStyle}>Payment status</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        )
    }



    

    showMonthPicker = () => {
        this.setState({
            showPicker: true
        })

    }
    monthSelect = (date) => {
        const { allDataUser } = this.state;
        let arr = []
        // console.log(e, 'month')
        const getMonth = Number(date._i.slice(3, 4));
        const getYear = date._i.slice(5, 9);
        const getMonthName = this.state.monthArr[getMonth];
        const concatMonthYear = `${getMonthName}, ${getYear}`;
        console.log(concatMonthYear, 'concatMonthYear')
        for (var i = 0; i < allDataUser.length; i++) {
            console.log(allDataUser[i], 'data')
            if (allDataUser[i].paymentMonth == concatMonthYear) {
                arr.push(allDataUser[i])
                this.setState({
                    invoiceData: arr,
                    showPicker: false,
                    showalert: false
                })
            }
            else if (allDataUser[i].paymentMonth != concatMonthYear) {
                console.log('Condition Worked Fine')
                this.setState({
                    invoiceData: arr,
                    showPicker: false,
                })
            }
            // else if (allDataUser.length < 0){
            //     alert('No Found Data')
            // }
        }
        // this.setState({
        //     allDataUser: arr,
        //     showPicker: false
        // })

    }

    render() {
        const { navigate } = this.props.navigation;
        const {
            allDataUser,
            date,
            month,
            showPicker,
            allDataShow,
            monthRelatedData,
            releaseMonth,
            noInvoices,
            showNullInvoices,
            showalert,
            invoiceData,
            
        } = this.state;

        // console.log('render all data user >>>', allDataUser);
        // console.log('Receipt image >>>', this.state.receipt_img);

        return (

            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.textStyleOne}>Invoices</Text>

                </View>
                <View style={styles.arrowContainer}>
                    {/* <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity> */}

                    {
                    invoiceData.length > 0 ?
                    <TouchableOpacity onPress={this.showMonthPicker}><Text>Filter By Month</Text></TouchableOpacity>
                    : 
                    null
                    }
                    {/* <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity> */}
                </View>
                <ScrollView style={{ flex: 1, backgrousndColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }} >

                    {
                        showPicker ?
                            <MonthSelectorCalendar
                                //selectedDate={}
                                onMonthTapped={(e) => this.monthSelect(e)}
                            // onMonthTapped={(date) => this.setState({ month: date }, () => {
                            //     //this.renderDataFun.bind(this, date._i)
                            //     if (date._i) {
                            //         this.setState({ showPicker: false, })
                            //         const getMonth = Number(date._i.slice(3, 4));
                            //         const getYear = date._i.slice(5, 9);
                            //         // console.log('get month >>', getMonth)
                            //         // console.log('get year >>', getYear)
                            //         const getMonthName = this.state.monthArr[getMonth];
                            //         const concatMonthYear = `${getMonthName}, ${getYear}`;
                            //         //console.log('concate month >>>', concatMonthYear)
                            //         this.setState({
                            //             renderMonthData: concatMonthYear,
                            //             allDataShow: false,
                            //             monthRelatedData: true,
                            //         })
                            //     }
                            // })}
                            />
                            : null
                    }


                    {
                        showNullInvoices ?
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center', alignSelf: 'center',
                                alignContent: 'center'
                            }}>
                                <Text style={{ color: '#FF6200', fontFamily: "MontserratMedium" }}>{noInvoices}</Text>
                            </View>
                            :
                            null
                    }

                    {/* {
                        this.state.notMatch ?
                        // <View><Text>Not Found Data</Text></View>
                        Alert.alert('Title','No Found Data',
                                [
                                    {
                                        text: 'OK', onPress: () =>
                                            this.setState({
                                                allDataShow: true,
                                                notMatch: false
                                            })
                                    },
                                ],
                            )
                        :
                        null
                    } */}

                    {invoiceData.length > 0 ?
                        <FlatList
                            data={invoiceData}
                            renderItem={this.renderDataItems}
                            keyExtractor={this._keyExtractor}
                            numColumns={columsNum}
                        />
                        
                        :
                        invoiceData.length <= 0 ?
                        <View
                        style={{justifyContent:'center',alignItems:'center'}}
                        >
                            <Text style={{color: '#FF6200', fontFamily: "MontserratMedium"}}>No Found Invoices</Text>
                       </View>
                       :
                       null
                    }
                    

                    <Modal
                        isVisible={this.state.isVisibleModal}
                        animationIn='bounce'
                        animationOut='bounce'
                        //animationOut='zoomOutDown'
                        backdropOpacity={0.8}
                        backdropColor='white'
                        coverScreen={true}
                        animationInTiming={300}
                        animationOutTiming={100}
                    >

                        <View style={{ justifyContent: 'center', alignSelf: 'center', padding: 10, height: 400, width: 380 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#FF6200' }}>Receipt Image</Text>
                                <TouchableOpacity onPress={this.closeModal}>
                                    <Image source={require('../icons/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Image source={{ uri: this.state.receipt_img }}
                                resizeMode='cover'
                                style={styles.receiptImgStyle}
                            />
                        </View>


                    </Modal>




                </ScrollView>
            </View>
        )
    }

}

export default Invoices;