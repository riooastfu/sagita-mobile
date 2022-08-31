import React, { useState } from 'react';
import {
    Text, View, StyleSheet, SafeAreaView, TextInput, Platform, TouchableOpacity,
    Image, ToastAndroid, Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';

//assets import
import { iconCalendar } from '../assets/icons';

//components import
import CustomHeader from '../component/CustomHeader';
import { baseURL } from '../helpers/baseURL';
import { useEffect } from 'react';


const DaftarPasienScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Tanggal Lahir');
    const [Pic, setPic] = useState({})
    const [namaAnak, setNamaAnak] = useState('')
    const [idIbu, setIdIbu] = useState('')

    const getId = async () => {
        try {
            const email = await AsyncStorage.getItem("email")
            const res = await axios.get(`${baseURL}/ibu/getibudetail/${email}`)
            setIdIbu(res.data.data.id)
            console.log("email :", email)
            console.log("data ibuu: ", res.data.data.id)
        } catch (error) {
            console.log("error ibu", error)
        }
    };

    useEffect(() => {
        getId()
    }, [])

    //---------------------Show Toast Msg---------------------//
    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        },
    }

    const openGallery = async () => {
        try {
            launchImageLibrary(options, response => {
                if (response.didCancel) {
                    setToastMsg('Membatalkan pemilihan gambar')
                }
                else if (response.errorCode == 'permission') {
                    setToastMsg('Permission not satisfied')
                }
                else if (response.errorCode == 'others') {
                    setToastMsg(response.errorMessage);
                }
                else if (response.assets[0].fileSize > 2097152) {
                    Alert.alert(
                        'Ukuran gambar melibihi batas maksimal',
                        'Pilih gambar dengan ukuran dibawah 2 MB',
                        [{ text: 'OK' }],
                    )
                }
                else {
                    setPic({
                        uri: response.assets[0].uri,
                        type: response.assets[0].type,
                        name: response.assets[0].fileName
                    })
                }
            });

        } catch (error) {
            console.log("error :", error)
        }
    }

    const tambahData = async () => {
        try {
            let formdata = new FormData()
            formdata.append('akta_lahir', Pic)
            formdata.append('nama_anak', namaAnak)
            formdata.append('jenis_kelamin', pilihan)
            formdata.append('tgl_lahir', date.toISOString().replace(/T/, ' ').replace(/\..+/, ''))
            formdata.append('id_ibu', idIbu)

            await axios({

                method: `post`,

                url: `${baseURL}/pasien/add`,

                data: formdata,

                headers: { 'Content-Type': 'multipart/form-data' },

            });

            console.log("Berhasil menambah data");
        } catch (error) {
            console.log('Ini Error : ', error)
        }
    }

    //---------------------DTPicker---------------------------//
    //--------------------------------------------------------//
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate)

        // console.log("tangal=", fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    //---------------------End of DTPicker--------------------//
    //--------------------------------------------------------//

    //---------------------Combo Picker-----------------------//
    //--------------------------------------------------------//
    const [pilihan, setPilihan] = useState();
    const klikPilihan = (label) => {
        setPilihan(label);
    }
    //-------------------End of Combo Picker------------------//
    //--------------------------------------------------------//

    //--------------------------POST--------------------------//


    const btnSimpan = async () => {
        if (Object.keys(Pic).length == 0 || !namaAnak || !pilihan || text == "Tanggal Lahir") {
            alert("Input tidak boleh kosong!")
        }
        else {
            tambahData()
            alert("Berhasil mendaftar. Silahkan menunggu verifikasi.")
            setPic({})
            setNamaAnak('')
            setText('Tanggal Lahir')
            setPilihan()
        }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isHome={true} navigation={navigation} title="SaGiTa" />
            <View style={styles.layoutHome}>
                <Text style={{ width: wp('90%'), marginTop: hp('1%'), marginBottom: hp('2%'), fontSize: wp('6%'), fontWeight: 'bold', color: 'black', }}>
                    Daftar Balita
                </Text>

                <Text style={styles.labelText}>Nama Anak</Text>
                <TextInput style={styles.inputText} placeholder='Nama Anak' onChangeText={setNamaAnak} value={namaAnak} />

                <Text style={styles.labelText}>Tanggal Lahir</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        borderBottomColor: 'grey', borderBottomWidth: 1, width: wp('74%'), fontSize: wp('3.5%'),
                        marginTop: 15, paddingLeft: -5,
                    }}>{text}</Text>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#3495eb', borderRadius: wp('2%'), width: wp('10%'), height: hp('5.2%'), marginLeft: wp('6%') }} onPress={() => showMode('date')}>
                        <Image style={styles.iconSet} source={iconCalendar} />
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={onChange}
                            maximumDate={new Date()}
                            minimumDate={new Date(2000, 1, 1)}
                        />)}
                </View>

                <Text style={styles.labelText}>Jenis Kelamin</Text>

                <View style={{ marginTop: hp('-2%'), marginLeft: wp('-32%') }}>
                    <Picker style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 },], width: wp('90%') }}
                        selectedValue={pilihan}
                        onValueChange={(label, index) => klikPilihan(label)}
                    >
                        <Picker.Item label='--Pilih--' value='null' />
                        <Picker.Item label='Laki laki' value='lakilaki' />
                        <Picker.Item label='Perempuan' value='perempuan' />
                    </Picker>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: wp('59%'), marginTop: hp('1%'), fontSize: wp('4%'), fontWeight: 'bold', color: 'black', }}>
                        Unggah Akta Lahir
                    </Text>
                    <TouchableOpacity style={{ borderRadius: wp('2%'), backgroundColor: '#3495eb' }} onPress={openGallery}>
                        <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontSize: 12, margin: wp('1%'), marginHorizontal: wp('8%') }}>
                            Pilih File
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center', width: wp('95%'), height: hp('25%'), marginTop: hp('3%') }}>
                    <Image style={{ width: wp('95%'), height: hp('25%') }} source={Pic} />
                </View>

                <TouchableOpacity style={{ width: wp('90%'), backgroundColor: '#3495eb', borderRadius: wp('1%'), marginTop: hp('3%') }} onPress={btnSimpan}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, margin: wp('1%') }}>Simpan</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layoutHome: {
        flex: 1,
        alignItems: 'center',
    },
    inputText: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: wp('90%'),
        fontSize: wp('3.5%'),
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
    iconSet: {
        width: wp('4.7%'),
        height: hp('2.8%')
    }
})

export default DaftarPasienScreen