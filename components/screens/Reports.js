import React from 'react';
import { StyleSheet, Text, View , Button,ScrollView,Dimensions } from 'react-native';

const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
class Reportscreen extends React.Component{
  static navigationOptions = {
    header: null
  }
    render() {
      const { navigate } = this.props.navigation;
      
        return (
          <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcome}>Reports Screen</Text>
            {/* <Button title='SignUp'/> */}
          </View>
          </ScrollView>
        );
      }
}

export default Reportscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width:screenWidth,
    height:screenHeight
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#FFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
