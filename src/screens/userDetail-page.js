import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import CustomHeader from '../component/CustomHeader';
import { auth } from '../utility/firebase-config';


import { iconLogOut, iconInformation, iconSettings } from '../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailPage = ({ navigation }) => {

    const signOut = async () => {
        try {
            Alert.alert(
                "Peringatan",
                "Apakah anda yakin ingin keluar?",
                [
                    {
                        text: "Ya",
                        onPress: async() => {
                            auth
                            .signOut()
                            await AsyncStorage.removeItem("email")
                            .then(() => {
                                navigation.replace("Login")
                            })
                            .catch(error => alert(error.message))
                        }
                    },
                    {
                        text: "Tidak",
                        style: "cancel"
                    }
                ])
        } catch (error) {
            alert(error.message)
        }

    };

    const forgotPassword = () => {
        auth
            .sendPasswordResetEmail(auth.currentUser?.email)
            .then(() => {
                alert('Periksa email untuk me-reset password dan lakukan login ulang.')
                auth.signOut()
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isHome={true} navigation={navigation} />
            <View style={styles.mainLayout}>
                <View style={styles.section}>
                    <Image style={styles.icon} source={iconSettings} resizeMode='contain' />
                    <TouchableOpacity style={{
                        flex: 1, marginRight: 10, marginBottom: -17.5, paddingBottom: 15,
                        borderBottomWidth: 1, borderBottomColor: '#ebebeb'
                    }} onPress={() => forgotPassword()}>
                        <Text style={styles.styleText}>Ubah Kata Sandi</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Image style={styles.icon} source={iconLogOut} resizeMode='contain' />
                    <TouchableOpacity style={{
                        flex: 1, marginRight: 10, marginBottom: -17.5, paddingBottom: 15,
                        borderBottomWidth: 1, borderBottomColor: '#ebebeb'
                    }} onPress={() => signOut()}>
                        <Text style={styles.styleText}>Keluar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default UserDetailPage

const styles = StyleSheet.create({
    mainLayout: {
        flex: 1,
    },
    section: {
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: wp('5.5%'),
        height: hp('5.5%'),
        marginHorizontal: 10,
        marginVertical: -25,
    },
    styleText: {
        fontSize: hp('2.5%')
    }
})