import React from 'react';
import { Alert, StyleSheet, Dimensions, Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: screenWidth,
        height: screenHight
    },
    childMainContainer: {
        flex: 1,
        marginHorizontal: 15
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        height: screenHight,
        marginHorizontal: 12
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textInputContainer: {
        flexDirection: 'row',

    },
    inputStyle: {
        flex: 1,
        height: 45,
        paddingLeft: 16,
        backgroundColor: '#e5e5e5',
        color: '#4f4f4f',
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3
    },
    sentBtnContainer: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: '#FF6200',
        justifyContent: 'center',
        alignItems: 'center'
    },
    micIconStyle: {
        flex: 1,
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    sendIconStyle: {
        flex: 1,
        width: 27,
        height: 23,
        resizeMode: 'contain'
    },
    orangeMicContainer: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordingContainer: {
        height: 120,
        borderRadius: 5,
        backgroundColor: '#e5e5e5',
        marginBottom: 30
    },
    msgsTextStyle: {
        padding: 10,
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginBottom: 10,
        marginLeft: '50%',
        backgroundColor: 'black',
        borderRadius: 10
    },
    replyMessagesStyle: {
        padding: 10,
        color: '#4f4f4f',
        fontFamily: 'MontserratLight',
        marginBottom: 10,
        marginRight: '45%',
        backgroundColor: '#e5e5e5',
        borderRadius: 10
    },
    mgsImges: {
        padding: 10,
        color: '#A6A6A6',
        marginBottom: 20,
        borderRadius: 5,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    replymgsImges: {
        padding: 10,
        color: '#4f4f4f',
        marginBottom: 20,
        marginRight: '50%',
        borderRadius: 5,
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    expandImges: {
        padding: 60,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    mgsTouctable: {
        marginBottom: 20,
        width: 200,
        marginLeft: '35%',
    },
    fileTagStyle: {
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
    },
    extensionFile: {
        color: '#ffffff',
        backgroundColor: '#807c7c',
        width: 80,
        height: 90,
        borderRadius: 10,
        marginVertical: 10

    },
    thumbnailImageStyle: {
        padding: 10,
        margin: 13,
        justifyContent: 'center',
        // marginVertical: 10
    },
    thumbnailNameTextStyle: {
        padding: 10,
        fontSize: 14,
        color: '#ff6200',
        fontFamily: 'MontserratMedium',
        marginRight: '35%',
        marginVertical: 15,
        justifyContent: 'center',
    },
    replymgsTouctable: {
        marginBottom: 20,
        width: 200,
        marginRight: '35%',
    },
    replyfileTagStyle: {
        padding: 10,
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        flexDirection: 'row',
    },
    replyextensionFile: {
        color: '#4f4f4f',
        backgroundColor: '#000000',
        width: 80,
        height: 90,
        borderRadius: 10,
        marginVertical: 10
    },
    replythumbnailImageStyle: {
        padding: 10,
        margin: 13,
        justifyContent: 'center',
    },
    replythumbnailNameTextStyle: {
        padding: 10,
        fontSize: 14,
        color: '#4f4f4f',
        fontFamily: 'MontserratMedium',
        marginRight: '35%',
        marginVertical: 15,
        justifyContent: 'center',
    },
    cardContainer: {
        width: 400,
        borderRadius: 5,
        padding: 15
    },
    dateWithCancelIcon: {
        flexDirection: 'row',
    },
    fileAttachContainer: {
        height: 44,
        marginRight: 10,
        backgroundColor: '#e5e5e5',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3
    },
    attachFileIcon: {
        flex: 1,
        width: 23,
        height: 23,
        resizeMode: 'contain',
        paddingRight: 5

    },
    orangeAttachFiel: {
        width: 40,
        height: 40,
        //borderWidth:3,
        //borderColor:'#FF6200',
        borderRadius: 40 / 2,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendFielsTypeContainer: {
        marginBottom: 15,
        height: 100,
        marginLeft: 100,
        marginRight: 55,
        borderRadius: 3,
        backgroundColor: 'black'
    },
    shareTextStyle: {
        color: '#A6A6A6',
        fontFamily: 'MontserratLight',
        marginTop: 10,
        marginLeft: 20
    },
    filesContainer: {
        //flex:1,
        marginTop: 15,
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    attachFilesStyle: {
        // flex: 1,
        width: 23,
        height: 30,
        resizeMode: 'contain',

    },
    chatProfileContainer: {
        height: 50,
        //backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileNameStyle: {
        marginVertical: 12,
        // fontSize: 20,
        fontFamily: "MontserratExtraBold",
        // fontSize: 23,
        color: '#000000'

    },
    profilPicStyle: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginVertical: 8

    },
    profilPicContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    photoContainer: {
        height: 100,
        width: 230,
        resizeMode: 'contain',

    },

    showPhotoContainer: {
        marginLeft: '45%',
        marginBottom: 20
    },
    replyshowPhotoContainer: {
        marginRight: '45%',
        marginBottom: 20
    },
    canvas: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        marginVertical: 25,
        // color: '#A6A6A6',
        marginBottom: 20,
        marginLeft: '50%',
        borderRadius: 10,
        width: 250,
        height: 350
    }
});

export default styles;
