import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Card } from 'react-native-shadow-cards';
import { WebView } from 'react-native-webview';

//assets import
import { bgPattern } from '../assets/image';

//components import
import CustomHeader from '../component/CustomHeader';
import LoadingScreen from './LoadingScreen';


const ChatScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true)

    useFocusEffect(useCallback(() => {
        setTimeout(() => setLoading(false), 2500)
    }))

    return (
        <>
            {
                loading === false ? (
                    <SafeAreaView style={styles.container}>
                        <CustomHeader navigation={navigation} title="Chat" />
                        <WebView
                            source={{ uri: 'https://tawk.to/chat/62c3d586b0d10b6f3e7ad2ba/1g76fk66h' }}
                            allowFileAccess={true}
                            scalesPageToFit={true}
                            originWhitelist={['*']}
                        />
                    </SafeAreaView>
                ) : (
                    <LoadingScreen/>
                )
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ChatScreen