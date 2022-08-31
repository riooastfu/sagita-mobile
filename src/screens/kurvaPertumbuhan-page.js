import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Card } from 'react-native-shadow-cards';
import moment from 'moment';
import "moment/locale/id"
moment.locale()
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//assets import
import { bgPattern } from '../assets/image';

//components import
import CustomHeader from '../component/CustomHeader';
import { baseURL } from '../helpers/baseURL';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';


const KurvaPertumbuhanScreen = ({ navigation }) => {
    const [listPasien, setListPasien] = useState([])
    const [emailIbu, setEmailIbu] = useState("")

    const getData = async () => {

        try {
            const email = await AsyncStorage.getItem("email")
            setEmailIbu(email)
            const res = await axios.get(`${baseURL}/pasien/list?email_ibu=${email}`)
            console.log("data:", res.data.data)
            setListPasien(res.data.data)
        } catch (error) {
            console.log("error", error.response)
        }
    }


    // useEffect(() => {
    //     getData()
    // }, [])
    useFocusEffect(useCallback(() => {
        getData()
        return () => console.log("keluar menu")
    }, [])
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isHome={true} navigation={navigation} title="SaGiTa" />
            <View style={{ alignItems: 'center', marginTop: hp('3%') }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                    {
                        listPasien.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (item.validasi) {
                                        navigation.navigate('KurvaPertumbuhanDetail', { email: emailIbu, idAnak: item.id })
                                    }
                                }}>
                                    <Card style={{ paddingLeft: wp('5%'), paddingVertical: hp('2%'), marginBottom: hp('2%') }}>
                                        <View style={{ flexDirection: 'row' }}><Text style={styles.fontStyle}>Nama anak : </Text><Text style={styles.fontStyle}>{item.nama_anak}</Text></View>
                                        <View style={{ flexDirection: 'row' }}><Text style={styles.fontStyle}>Tanggal lahir : </Text><Text style={styles.fontStyle}>{moment(item.tgl_lahir).format("L")}</Text></View>
                                        <View style={{ flexDirection: 'row' }}><Text style={styles.fontStyle}>Jenis kelamin : </Text><Text style={styles.fontStyle}>{item.jenis_kelamin}</Text></View>
                                        <View style={{ flexDirection: 'row' }}><Text style={styles.fontStyle}>Status verifikasi : </Text><Text style={{ color: item.validasi ? 'green' : 'red', fontSize: hp('1.8%') }}>{item.validasi ? "Valid" : "Belum Valid"}</Text></View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>


            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    layoutHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fontStyle: {
        fontSize: hp('1.8%')
    }
})

export default KurvaPertumbuhanScreen