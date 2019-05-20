import React from 'react';
import { StyleSheet, Text, View,Button,Dimensions} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

class Chatscreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
       header: () => null
    } 
}
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Chat Page</Text>
          </View>
        );
      }
}

export default Chatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
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
