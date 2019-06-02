import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/LogWeightStyle';
import CaloriesSetupBtn from '../buttons/setUpBtn';
const { height } = Dimensions.get('window');

class Logweight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                    <View style={styles.childContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={styles.headingStyle}>
                                Exercise Log
                            </Text>
                        </View>
                        <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                        <Text>Today</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                        </View>
                     <View style={styles.bodyContainer}>
                         
                             <TextInput placeholder="Enter today's weight here" placeholderTextColor="black" style={styles.inputTextStyle}/>
                             
                    </View>
                    <CaloriesSetupBtn title="Save Today's Weight" caloriesBtnStyle={styles.caloriesBtnStyle}/>
                   <View style={styles.weightListsContainer}>
                       <View style={styles.weightListOne}>
                       <Text style={styles.weightNumberStyle}>68 KG</Text>
                       <Text style={styles.weightTextStyle}>Weight on Monday, May 20th</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text style={styles.weightNumberStyle}>68.1 KG</Text>
                       <Text style={styles.weightTextStyle}>Weight on Saturday, May 18th</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text style={styles.weightNumberStyle}>68.1 KG</Text>
                       <Text style={styles.weightTextStyle}>Weight on Saturday, May 18th</Text>
                       </View>
                       {/* <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View>
                       <View style={styles.weightListOne}>
                       <Text >jalkjdlkajld</Text>
                       </View> */}
                    
                   </View>
                         
                   </View>     
                 </ScrollView>   
             </View>       
)

}
}
export default Logweight;