import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity} from 'react-native';
import Wheelspiner from '../Progress Wheel/Progress';
import styles from '../Styling/HomeStyle'
const { height } = Dimensions.get('window');

class Homescreen extends React.Component{
   constructor(props){
     super(props);

   }
  //  onChangeTab=(value)=>{
  //   console.log(value)
  // }
    render() {
      const {navigate}=this.props.navigation;
      
      // console.log(routes);
        return (
          
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={styles.textStyleOne}>GetFit</Text>
              <Text style={styles.textStyleTwo}>Athletic</Text>
              </View>
            <View style={styles.arrowContainer}>
              <TouchableOpacity style={{marginRight:20}}><Image source={require('../icons/left.png')} style={styles.forImgs}/></TouchableOpacity> 
              <Text>Today</Text>
              <TouchableOpacity style={{marginLeft:20}}><Image source={require('../icons/right.png')} style={styles.forImgs}/></TouchableOpacity> 
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
            <View style={styles.cardsContainer}>
              <View style={styles.childContainerOne}>
                <TouchableOpacity style={styles.cardOne} onPress={()=>{navigate('AddExercise')}}>
                    <Image source={require('../icons/log-exer.png')} style={styles.imgsStyle}/>           
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardThree}>
                <Image source={require('../icons/log-weight.png')} style={styles.imgsStyle}/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cardFive}>
                  <Image source={require('../icons/calc-macros.png')} style={styles.imgsStyle}/>
              </TouchableOpacity>
              </View>
              <View style={styles.childContainerTwo}>
                       <View style={styles.cardTwo}>
                          <Text style={styles.cardTwoTextStyle}>Today's {'\n'}step count</Text>
                          <View style={styles.whelSpinerContainer}>
                               <Wheelspiner/>
                          </View>
                          <View style={styles.resultContainer}>
                            <Text style={{color:'#FF6200',fontFamily:'MontserratLight'}}>6842</Text>
                            <Text style={{color:'#a6a6a6',fontFamily:'MontserratLight'}}>/10,000</Text>
                          </View>
                          <Text style={{color:'#a6a6a6',marginLeft:14,fontFamily:'MontserratLight'}}>steps</Text>
                          <View style={styles.detailReport}>
                            <Text style={{color:'#FFFFFF',fontFamily:'MontserratLight',fontSize:12,marginTop:33}}>View detailed report</Text>
                            <Image source={require('../icons/forward-arrow.png') } style={styles.arrowIcon}/>    
                          </View>
                       </View>
                      <View style={styles.cardFour}>
                               <Text style={styles.cardFourTextStyle}>Today's{'\n'}exercise</Text>
                               <Text style={{color:'#a6a6a6',fontFamily:'MontserratLight',marginTop:20,marginLeft:14}}>High paced jogging{'\n'}exercise</Text>
                               <View style={{borderBottomColor: '#a6a6a6',borderBottomWidth: 1,marginHorizontal:14,marginTop:20}}></View>
                               <Text style={{color:'#FF6200',fontFamily:'MontserratLight',marginLeft:14,marginTop:10}}>35</Text>
                               <Text style={{color:'#a6a6a6',marginLeft:14,fontFamily:'MontserratLight'}}>minuts</Text>
                               <Text style={{color:'#FFFFFF',fontFamily:'MontserratLight',fontSize:12,marginTop:20,marginLeft:14}}>View detailed report</Text>
                               <Image source={require('../icons/forward-arrow.png') } style={styles.lastArrow}/>
                       </View>

              </View>

            </View>
            </ScrollView>
              
              


            
            {/* <View style={styles.secondContainer}> */}
            
                               
              
              

           
            {/* </View> */}
            
      
          </View>
         
        );
      }
}

export default Homescreen;

