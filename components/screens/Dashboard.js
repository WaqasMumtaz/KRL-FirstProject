import React from 'react';
import { StyleSheet, Text, View,Button,Dimensions} from 'react-native';
const screenWidth=Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;

class Dashboard extends React.Component{
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Dashboard Page</Text>
          </View>
        );
      }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7f50',
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
