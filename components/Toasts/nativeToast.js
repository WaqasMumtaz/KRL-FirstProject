import React from 'react';
import { Text,TouchableOpacity,StyleSheet} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';

class ToastComponent extends React.Component{
constructor(props){
    super(props);

    this.state={
        position:'top',
        style:{}
    }
}

onClick = (text, position, duration,withStyle)=> {
    this.setState({
        position: position,
    })
    if(withStyle){
        this.refs.toastWithStyle.show(text, duration);
    }else {
        this.refs.toast.show(text, duration);
    }
}

getButton = (text, position, duration,withStyle) =>{
    return(
        <TouchableOpacity
            style={{padding: 10}}
            onPress={()=>this.onClick(text, position, duration,withStyle)}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

render(){
    return(
        <View style={styles.container}>
             {this.getButton('LENGTH_SHORT+top', 'top', DURATION.LENGTH_SHORT)}
                {this.getButton('LENGTH_SHORT+bottom', 'bottom', DURATION.LENGTH_SHORT)}
                {this.getButton('LENGTH_LONG+top', 'top', DURATION.LENGTH_LONG)}
                {this.getButton('LENGTH_LONG+bottom', 'bottom', DURATION.LENGTH_LONG)}
                {this.getButton('LENGTH_LONG+bottom+custom style', 'bottom', DURATION.LENGTH_LONG,true)}
                <Toast ref="toast" position={this.state.position}/>
                <Toast ref="toastWithStyle" style={{backgroundColor:'red'}} position={this.state.position}/>
        </View>
    )
}

}
export default ToastComponent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})