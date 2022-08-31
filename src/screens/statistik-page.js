import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import axios from 'axios';
import { baseURL } from '../helpers/baseURL';
import { useFocusEffect } from '@react-navigation/native';

//assets import


//components import
import CustomHeader from '../component/CustomHeader';

const StatistikScreen = ({ navigation }) => {

    const [tangkap, setTangkap] = useState([])

    const getData = async () => {
        try {
            const res = await axios.get(`${baseURL}/gizi/result`)
            setTangkap(res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        getData()
        return () => console.log("keluar menu")
    }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isHome={true} navigation={navigation} title="SaGiTa" />
            <View style={styles.layoutHome}>
                <Text style={styles.labelText}>Data testing result dalam bentuk persentase.</Text>

                <View style={styles.contentBox}>
                    <View style={{ alignContent: 'center', margin: wp('2%') }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'black', fontSize: wp('3%') }}>
                            Hasil Data Testing
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {
                            tangkap.map((item) => {
                                return (
                                    <>
                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#c00000' }}>Gizi Buruk</Text>
                                            <Text style={{ color: '#c00000' }}>{item.buruk}%</Text>
                                        </View>

                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#ff0000' }}>Gizi Kurang</Text>
                                            <Text style={{ color: '#ff0000' }}>{item.kurang}%</Text>
                                        </View>

                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#74b52f' }}>Gizi Normal</Text>
                                            <Text style={{ color: '#74b52f' }}>{item.normal}%</Text>
                                        </View>

                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#f57c20' }}>Beresiko Gizi Lebih</Text>
                                            <Text style={{ color: '#f57c20' }}>{item.beresiko}%</Text>
                                        </View>

                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#ff0000' }}>Gizi Lebih</Text>
                                            <Text style={{ color: '#ff0000' }}>{item.lebih}%</Text>
                                        </View>

                                        <View style={{ marginLeft: wp('2%'), alignItems: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), textAlign: 'center', color: '#c00000' }}>Obesitas</Text>
                                            <Text style={{ color: '#c00000' }}>{item.obesitas}%</Text>
                                        </View>
                                    </>
                                )
                            })
                        }
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layoutHome: {
        flex: 1,
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.1,
    },
    labelText: {
        width: wp('90%'),
        paddingRight: wp('25%'),
        marginTop: hp('1%'),
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: 'black',
    },
    contentBox: {
        width: wp('90%'),
        height: hp('15%'),
        borderWidth: wp('0.1%'),
        borderRadius: wp('3%'),
        borderColor: '#c4c4c4',
        marginTop: hp('3%')
    }
})

export default StatistikScreen