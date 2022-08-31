import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import CustomHeader from '../component/CustomHeader';
import { auth } from '../utility/firebase-config';


const ForgotPassScreen = ({ navigation }) => {

    const [text, setText] = useState('')

    const forgotPassword = () => {
        auth
            .sendPasswordResetEmail(text)
            .then(() => {
                alert("Silahkan cek email untuk mengubah password.")
                setText('')
                navigation.navigate('Login')
            })
            .catch(error => {
                if (text === "") {
                    alert('Input tidak boleh kosong!')
                }
                else if (error.code === 'auth/invalid-email') {
                    alert('Email tidak valid!');
                }
                else if (error.code === 'auth/user-not-found') {
                    alert('Alamat email tidak ditemukan!');
                }
            })
    }

    const onPress = () => {
        forgotPassword();

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} />
            <View style={styles.layoutHome}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>LUPA KATA SANDI</Text>
                <Text style={{ fontSize: wp('3%'), textAlign: 'center' }}>Kami akan mengirimkan instruksi ke email Anda.</Text>
                <Text style={styles.labelText}>Email</Text>
                <TextInput style={styles.inputText} placeholder='Email' onChangeText={newText => setText(newText)} defaultValue={text} />
                <TouchableOpacity style={styles.btnKirim} onPress={onPress}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, margin: wp('1%') }}>Kirim</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassScreen

const styles = StyleSheet.create({
    layoutHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('15%')
    },
    inputText: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: wp('90%'),
        fontSize: wp('3%'),
        paddingVertical: -10,
        paddingLeft: -5,
    },
    labelText: {
        width: wp('90%'),
        marginTop: hp('1%'),
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: 'black',
    },
    btnKirim: {
        width: wp('90%'),
        backgroundColor: '#3495eb',
        borderRadius: wp('1%'),
        marginTop: hp('4%')
    }
})