import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ToastAndroid } from "react-native"
import React, { useState, useCallback } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import axios from "axios"


//import Firebase
import { auth } from "../utility/firebase-config"

//import assets
import { iconUser, iconPadlock, iconEmail } from "../assets/icons"
import { bgPattern, logo } from "../assets/image"

//import misc
import { baseURL } from "../helpers/baseURL"
import CustomInput from "../component/CustomInput"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import HomePage from "./home-page"
import ForgotPassScreen from "./forgotPass-page"
import SignInScreen from "./signin-page"

import { useFocusEffect } from "@react-navigation/native"

function LoginScreen({ navigation }) {
    //--------------------------Login Section-------------------------------//
    //----------------------------------------------------------------------//
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useFocusEffect(useCallback(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user.emailVerified === true) {
                navigation.navigate("Home")
            }
        })
        return unsubscribe
    }))

    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    const handleSignIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (user.emailVerified === false) {
                    alert("Mohon lakukan verifikasi email!")
                }
                else if (user.emailVerified === true) {
                    navigation.navigate("Home")
                    setToastMsg('Berhasil Melakukan Login.')
                    console.log("Logged in with : ", user);
                }
            })
            .catch(error => {
                if (email === "" || password === "") {
                    alert('Email atau Password tidak boleh kosong!')
                }
                else if (error.code === 'auth/user-not-found') {
                    alert('Email tidak ditemukan atau tidak pernah terdaftar!');
                }

                else if (error.code === 'auth/invalid-email') {
                    alert('Alamat email tidak valid!');
                }

                else if (error.code === 'auth/wrong-password') {
                    alert('Password salah!');
                }
            })
    }

    const getId = async () => {
        try {
            await AsyncStorage.setItem("email", email)
            await getItemList()
        } catch (error) {
            console.log(error)
        }
    };

    const [storageDataList, setStorageDataList] = useState('')
    const getItemList = async () => {
        try {
            const data = await AsyncStorage.getItem("itemList")
            setStorageDataList(data)
        } catch (error) {
            console.log(error)
        }
    }
    //-----------------------End ofLogin Section----------------------------//
    //----------------------------------------------------------------------//

    const BtnMasuk = () => {
        getId()
        handleSignIn()
    }

    return (
        <View style={styles.containerPages}>
            <ImageBackground style={styles.backgroundImage} source={bgPattern}>
                <View style={styles.loginSpace}>
                    {/* <Text style={styles.logoText}>SaGiTa</Text> */}
                    <Image source={logo} style={{width: 100, height: 100}}/>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.iconImage} source={iconUser}></Image>
                        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Image style={styles.iconImage} source={iconPadlock}></Image>
                        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
                    </View>
                    <TouchableOpacity title="Sign in" style={styles.buttonLogin} onPress={BtnMasuk}>
                        <Text style={styles.textButton}>Masuk</Text>
                    </TouchableOpacity>
                    {/* <Text>Data mu {storageDataList}</Text> */}
                    <View style={styles.sectionDaftar}>
                        <Text style={{ color: 'white' }}>Belum punya akun? Daftarkan </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text style={styles.textDaftar}>di sini</Text>
                        </TouchableOpacity>
                        <Text>.</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white' }}>Lupa Password?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('lupaPass')}>
                            <Text style={styles.textDaftar}>di sini</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>


    )
}

const Stack = createStackNavigator();
const stackApp = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                <Stack.Screen name="lupaPass" component={ForgotPassScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default stackApp;

const styles = StyleSheet.create({
    containerPages: {
        flex: 1,
        backgroundColor: '#00C2FF',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    loginSpace: {
        alignItems: "center",
        marginTop: hp('30%'),
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp('5%'),
        marginBottom: 15
    },
    loginSpaceReg: {

        marginTop: hp('30%'),
    },
    /*textInput:{
        height: hp('5%'),
        marginTop: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        paddingRight: 200,
        paddingLeft: 20,
    },*/
    textInput: {
        width: 200,
        paddingLeft: 20,
        fontSize: hp('2%'),
    },
    iconImage: {
        height: 25,
        width: 25,
        marginLeft: 20
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: hp('6%'),
        borderRadius: wp('5%'),
        paddingRight: wp('5%'),
        margin: wp('2%')
    },
    buttonLogin: {
        height: hp('6%'),
        width: wp('30%'),
        backgroundColor: '#148AFF',
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    textButton: {
        fontSize: hp('2.5%'),
        color: '#fff',
        fontWeight: 'bold'
    },
    sectionDaftar: {
        flexDirection: 'row'
    },
    textDaftar: {
        color: 'blue'
    },
})