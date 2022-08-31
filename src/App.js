import { StyleSheet, Text, View, Alert, LogBox } from "react-native"
import React from 'react'
import SplashScreen from "react-native-splash-screen"
import { useEffect, useState } from "react"

// Import Screens
import StackPage from "./screens/login-page"

// Import Utility
import NotifService from "./utility/NotifService"
LogBox.ignoreAllLogs();


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)

  }, [])


  //----------------------------Push Notif--------------------------//
  //----------------------------------------------------------------//
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true)
  };

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message)
  };

  const notif = new NotifService(onRegister, onNotif);

  //-------------------------End ofPush Notif-----------------------//
  //----------------------------------------------------------------//

  return (
    <View style={styles.containerApps}>
      <StackPage />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  containerApps: {
    flex: 1
  }
})