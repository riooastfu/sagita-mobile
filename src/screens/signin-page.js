import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, } from "react-native"
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import axios from "axios"


//import Firebase
import { auth } from "../utility/firebase-config"

//import assets
import { iconUser, iconPadlock, iconEmail } from "../assets/icons"
import { bgPattern } from "../assets/image"

//import misc
import { baseURL } from "../helpers/baseURL"
import CustomInput from "../component/CustomInput"

function SignInScreen({ navigation }) {
    //--------------------------Login Section-------------------------------//
    //----------------------------------------------------------------------//
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nama, setNama] = useState('');

    const handleCreateAccount = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                user.sendEmailVerification();
                alert("Akun kamu telah terdaftar. Silahkan cek email untuk melakukan verifikasi.")
                auth.signOut()
                postData()
                navigation.navigate('Login')
                console.log("Registered with : ", user.email);
                setEmail('')
                setPassword('')
                setNama('')
            })
            .catch(error => {
                if (email === "" || password === "" || nama === "") {
                    alert('Input tidak boleh kosong!')
                }
                else if (error.code === 'auth/email-already-in-use') {
                    alert('Alamat email sudah terpakai!');
                    setEmail('')
                    setPassword('')
                    setNama('')
                }

                else if (error.code === 'auth/invalid-email') {
                    alert('Alamat email tidak valid!');
                    setEmail('')
                    setPassword('')
                    setNama('')
                }

                else if (error.code === 'auth/weak-password') {
                    alert('Kata sandi minimal terdapat 6 karakter!');
                    setPassword('')
                }
            })
    }

    //POST Data
    const postData = async () => {
        try {
            await axios.post(`${baseURL}/ibu/add`, {
                nama_ibu: nama,
                email: email,
                password: password
            })
        } catch (error) {
            console.log(error)
        }
    }

    //-----------------------End ofLogin Section----------------------------//
    //----------------------------------------------------------------------//

    const BtnDaftar = () => {
        handleCreateAccount()
    }

    return (
        <View style={styles.containerPages}>
            <ImageBackground style={styles.backgroundImage} source={bgPattern}>
                <View style={styles.loginSpaceReg}>
                    <View style={{ marginLeft: wp('12%') }}>
                        <Text style={styles.logoText}>Register.</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.SectionStyle}>
                            <Image style={styles.iconImage} source={iconEmail}></Image>
                            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                        </View>
                        <View style={styles.SectionStyle}>
                            <Image style={styles.iconImage} source={iconUser}></Image>
                            <CustomInput placeholder="Nama" value={nama} setValue={setNama} />
                        </View>
                        <View style={styles.SectionStyle}>
                            <Image style={styles.iconImage} source={iconPadlock}></Image>
                            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
                        </View>
                        <TouchableOpacity style={styles.buttonLogin} onPress={BtnDaftar}>
                            <Text style={styles.textButton}>Daftar</Text>
                        </TouchableOpacity>
                        <View style={styles.sectionDaftar}>
                            <Text style={{ color: 'white' }}>Sudah punya akun?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                                <Text style={styles.textDaftar}>Masuk</Text>
                            </TouchableOpacity>
                            <Text>.</Text>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>


    )
}

export default SignInScreen;

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