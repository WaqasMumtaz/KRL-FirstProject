import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity } from 'react-native';
import styles from '../Styling/InvoicesScreenStyle';
const { height } = Dimensions.get('window');

class Invoices extends React.Component {
    static navigationOptions =(navigation)=> {   
        //const { params = {} } = navigation.state;
        const {navigate} = navigation.navigation.navigate
    return{
        // headerRight:
        //      <TouchableOpacity style={styles.headerIconContainer}>
        //          <Image source={require('../icons/edit-pencil.png')} style={styles.headerIcon}/>
        //      </TouchableOpacity>,
     
        headerStyle: {
            backgroundColor: 'white'
           
          },
         headerTintColor:'gray',
    }   
    
      }
    constructor(props) {
        super(props);

    }
    //  onChangeTab=(value)=>{
    //   console.log(value)
    // }
    render() {
        const { navigate } = this.props.navigation;

        // console.log(routes);
        return (

            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.textStyleOne}>Invoices</Text>

                </View>
                <View style={styles.arrowContainer}>
                    <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                    <Text>This year</Text>
                    <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1, backgrousndColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.bodyContainer}>
                        <View style={styles.leftContainer}>
                            <TouchableOpacity style={styles.cardLeft}>
                                <View style={styles.childContainer}>
                                    <View style={styles.cardNumberContainer}>
                                      <Text style={styles.cardNumberStyle}>#26532</Text>
                                      <Text style={styles.priceDetail}>
                                        Rs. 6500
                                      </Text>
                                      <Text style={styles.textStyle}>Coach fees</Text>
                                      <View style={styles.dateMonthContainer}>
                                      <Text style={styles.monthName}>
                                       May 
                                      </Text>
                                      <Text style={styles.dateNumber}>1</Text>
                                      <Text style={styles.superScriptTextStyle}>st</Text>
                                      <Text style={styles.yearStyle}>,2019</Text>
                                      </View>
                                      <Text style={styles.textStyle}>Issue date</Text>
                                      <View style={styles.paymentStatusContainer}>
                                      <Text style={styles.unpaidTextStyle}>Unpaid</Text>
                                      <Text style={styles.textStyle}>Payment status</Text>
                                      </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.cardLeft}>
                                <View style={styles.childContainer}>
                                    <View style={styles.cardNumberContainer}>
                                      <Text style={styles.cardNumberStyle}>#26532</Text>
                                      <Text style={styles.priceDetail}>
                                        Rs. 6500
                                      </Text>
                                      <Text style={styles.textStyle}>Coach fees</Text>
                                      <View style={styles.dateMonthContainer}>
                                      <Text style={styles.monthName}>
                                       May 
                                      </Text>
                                      <Text style={styles.dateNumber}>1</Text>
                                      <Text style={styles.superScriptTextStyle}>st</Text>
                                      <Text style={styles.yearStyle}>,2019</Text>
                                      </View>
                                      <Text style={styles.textStyle}>Issue date</Text>
                                      <View style={styles.paymentStatusContainer}>
                                      <Text style={styles.unpaidTextStyle}>Unpaid</Text>
                                      <Text style={styles.textStyle}>Payment status</Text>
                                      </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rightContainer}>
                            <TouchableOpacity style={styles.cardRight}>
                                <View style={styles.childContainer}>
                                <View style={styles.cardNumberContainer}>
                                      <Text style={styles.cardNumberStyle}>#26532</Text>
                                      <Text style={styles.priceDetail}>
                                        Rs. 6500
                                      </Text>
                                      <Text style={styles.textStyle}>Coach fees</Text>
                                      <View style={styles.dateMonthContainer}>
                                      <Text style={styles.monthName}>
                                       May 
                                      </Text>
                                      <Text style={styles.dateNumber}>1</Text>
                                      <Text style={styles.superScriptTextStyle}>st</Text>
                                      <Text style={styles.yearStyle}>,2019</Text>
                                      </View>
                                      <Text style={styles.textStyle}>Issue date</Text>
                                      <View style={styles.paymentStatusContainer}>
                                      <Text style={styles.unpaidTextStyle}>Unpaid</Text>
                                      <Text style={styles.textStyle}>Payment status</Text>
                                      </View>
                                    </View>
                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity style={styles.cardLeft}>
                                <View style={styles.childContainer}>
                                    <View style={styles.cardNumberContainer}>
                                      <Text style={styles.cardNumberStyle}>#26532</Text>
                                      <Text style={styles.priceDetail}>
                                        Rs. 6500
                                      </Text>
                                      <Text style={styles.textStyle}>Coach fees</Text>
                                      <View style={styles.dateMonthContainer}>
                                      <Text style={styles.monthName}>
                                       May 
                                      </Text>
                                      <Text style={styles.dateNumber}>1</Text>
                                      <Text style={styles.superScriptTextStyle}>st</Text>
                                      <Text style={styles.yearStyle}>,2019</Text>
                                      </View>
                                      <Text style={styles.textStyle}>Issue date</Text>
                                      <View style={styles.paymentStatusContainer}>
                                      <Text style={styles.unpaidTextStyle}>Unpaid</Text>
                                      <Text style={styles.textStyle}>Payment status</Text>
                                      </View>
                                    </View>

                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.blankView}>

                    </View>

                    
                </ScrollView>
                            </View>
        )
    }

}

export default Invoices;