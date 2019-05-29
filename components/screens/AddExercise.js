import React from 'react';
import { Text, View, ScrollView, Button, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Styling/AddExerciseStyle';
import BriskScreen from '../screens/BriskScreen';
import HighpacejoggingScreen from './HighPaceJogging';
import Pushups from './PushUps';
import Bicepcurls from './BicepCurls';
const { height } = Dimensions.get('window');

class AddExercise extends React.Component {
    static navigationOptions = {
        headerRight:(
             <TouchableOpacity style={styles.headerIconContainer}><Image source={require('../icons/tick.png')} style={styles.headerIcon}/></TouchableOpacity>
        ),
        headerStyle: {
           // backgroundColor: 'black'
           
          },
        headerTintColor:'gray',
          

    };
    constructor(props) {
        super(props);

        this.state = {
                show:true,
                showCard:false,
                jogging:false,
                pushups:false,
                bicep:false,
                iconShow:false,
        }
    }
    showFields=()=>{
        this.setState({show:false,showCard:true})
    }
    showHighPaceJogging=()=>{
        this.setState({show:false,jogging:true})
    }
    pushUps=()=>{
        this.setState({show:false,pushups:true})
    }
    bicepCurlsFun=()=>{
        this.setState({show:false,bicep:true})
    }
    backToHome=()=>{
        this.setState({show:true,showCard:false})
    }
    joggingToHome=()=>{
        this.setState({show:true,jogging:false})
    }
    pushUpsToHome=()=>{
        this.setState({show:true,pushups:false})
    }
    bicepToHome=()=>{
        this.setState({show:true,bicep:false})
    }

    render() {
           const {show,showCard,jogging,pushups,bicep}=this.state;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', height: height }} contentContainerStyle={{ flexGrow: 1 }}  >
                <View style={styles.childContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingStyle}>
                            Add Exercise
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <TouchableOpacity style={{ marginRight: 20 }}><Image source={require('../icons/left.png')} style={styles.forImgs} /></TouchableOpacity>
                        <Text>Today</Text>
                        <TouchableOpacity style={{ marginLeft: 20 }}><Image source={require('../icons/right.png')} style={styles.forImgs} /></TouchableOpacity>
                    </View>

                    <View style={styles.bodyContainer}>
                        <TextInput placeholder="Search exercise" placeholderTextColor="black" style={styles.inputFieldStyle} />
                        
                    </View>
                    {show && <View style={styles.listsContainer}>
                      <TouchableOpacity onPress={this.showFields}><Text style={styles.listsTextStyle}>Brisk Walk</Text></TouchableOpacity>
                      <TouchableOpacity onPress={this.showHighPaceJogging}><Text style={styles.listsTextStyle}>High paced jogging</Text></TouchableOpacity>
                      <TouchableOpacity onPress={this.pushUps}><Text style={styles.listsTextStyle}>Push ups</Text></TouchableOpacity>    
                      <TouchableOpacity onPress={this.bicepCurlsFun}><Text style={styles.listsTextStyle}>Bicep curls</Text></TouchableOpacity>   
                    </View>}
                   {showCard && <View style={styles.cardContainer}>
                     <BriskScreen title="Brisk Walk" label="Minutes" value="minutes" backFunc={this.backToHome}/>
                    </View>}
                    {jogging && <View style={styles.cardContainer} >
                        <HighpacejoggingScreen backFunc={this.joggingToHome}/>
                    </View>}
                    {pushups && <View style={styles.cardContainer} >
                        <Pushups backFunc={this.pushUpsToHome}/>
                    </View>}
                    {bicep && <View style={styles.cardContainer} >
                        <Bicepcurls backFunc={this.bicepToHome}/>
                    </View>}


                </View>
                <View style={{flex:1.2}}>

                </View>
            </ScrollView>

        )
    }

}

export default AddExercise;

