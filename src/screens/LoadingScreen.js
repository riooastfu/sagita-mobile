import React from "react";
import { View, ActivityIndicator, StyleSheet} from "react-native"

import { DotIndicator, SkypeIndicator } from "react-native-indicators";

export default function LoadingScreen(){
    return (
        <View style={styles.container}>
            {/* <ActivityIndicator color="#00C2FF" size="large" /> */}
            <SkypeIndicator color="#00C2FF"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
})