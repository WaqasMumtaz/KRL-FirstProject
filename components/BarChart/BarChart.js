import React from 'react';
import { StyleSheet, Text, View,ScrollView,Button,Dimensions,Image,TouchableOpacity} from 'react-native';
import styles from '../Styling/BarchartStyle';
import BarChart from 'react-native-charts';
//import PropTypes from 'prop-types';

class chartScreen extends React.Component{
 constructor(props){
     super(props);

     this.state={

     }
 }
 render(){
     return(
         <View style={styles.mainContainer}>
             <BarChart 
             dataSets={[
                {
                    fillColor:'#FF6200',
                    data:[
                        {value:15},
                        {value:18},
                        {value:14},
                        {value:13}
            
                    ]
                }
            ]}
            
             
             />
         </View>
     )
 }

}

export default chartScreen;