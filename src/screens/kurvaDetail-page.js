import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { VictoryArea, VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryLegend, VictoryLine, VictoryScatter } from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';


//assets import


//components import
import CustomHeader from '../component/CustomHeader';

//Screens import
import LoadingScreen from './LoadingScreen';

//Misc
import { baseURL } from '../helpers/baseURL';
import axios from 'axios';
import moment from 'moment';
import "moment/locale/id"
moment.locale()


const KurvaDetailScreen = ({ navigation, route }) => {
    const [listHistory, setListHistory] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            const res = await axios.get(`${baseURL}/pasien/riwayat?email_ibu=${route.params.email}&&id_anak=${route.params.idAnak}`)
            setListHistory(res.data.data)
            console.log("HASIL: ", res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        setTimeout(() => setLoading(false), 2000)
        getData()
        return () => console.log("keluar menu")
    }, [])
    )

    const data = listHistory.map((currentValue, index) => {
        return { x: currentValue.usia, y: currentValue.indeks_massa }
    })

    return (
        <>
            {
                loading === false ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <CustomHeader navigation={navigation} />
                        <View style={{ justifyContent: 'center' }}>
                            <VictoryChart theme={VictoryTheme.material} domainPadding={{ y: 21 }} containerComponent={<VictoryZoomContainer
                            />}>
                                <VictoryLegend x={50} y={10}
                                    orientation="horizontal"
                                    gutter={3}
                                    itemsPerRow={0}
                                    data={[
                                        { name: "-3SD", symbol: { fill: "#c00000" } },
                                        { name: "-2SD", symbol: { fill: "#ff0000" } },
                                        { name: "-1SD", symbol: { fill: "#ffff00" } },
                                        { name: "Median", symbol: { fill: "#92d050" } },
                                        { name: "+1SD", symbol: { fill: "#ffff00" } },
                                        { name: "+2SD", symbol: { fill: "#ff0000" } },
                                        { name: "+3SD", symbol: { fill: "#c00000" } },
                                    ]}
                                    style={{ labels: { fontSize: 10 } }}
                                />
                                {/* chart anak */}
                                <VictoryLine data={data} style={{
                                    data: { stroke: "red" },
                                }} />
                                <VictoryScatter size={2.5} data={data} style={{ data: { fill: "red" } }} />


                                {/* -3SD */}
                                <VictoryArea style={{ data: { fill: "#c00000", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 10.2, y0: 9.3 }, { x: 1, y: 11.3, y0: 10.4 }, { x: 2, y: 12.5, y0: 11.6 }, { x: 3, y: 13.1, y0: 12.1 }, { x: 4, y: 13.4, y0: 12.5 }, { x: 5, y: 13.5, y0: 12.5 },
                                        { x: 6, y: 13.6, y0: 12.7 }, { x: 7, y: 13.7, y0: 12.7 }, { x: 8, y: 13.6, y0: 12.6 }, { x: 9, y: 13.6, y0: 12.6 }, { x: 10, y: 13.5, y0: 12.5 }, { x: 11, y: 13.4, y0: 12.4 },
                                        { x: 12, y: 13.4, y0: 12.4 }, { x: 13, y: 13.3, y0: 12.3 }, { x: 14, y: 13.2, y0: 12.2 }, { x: 15, y: 13.1, y0: 12.1 }, { x: 16, y: 13.1, y0: 12.1 }, { x: 17, y: 13.0, y0: 12.0 },
                                        { x: 18, y: 12.9, y0: 11.9 }, { x: 19, y: 12.9, y0: 11.9 }, { x: 20, y: 12.8, y0: 11.8 }, { x: 21, y: 12.8, y0: 11.7 }, { x: 22, y: 12.7, y0: 11.7 }, { x: 23, y: 12.7, y0: 11.6 },
                                        { x: 24, y: 12.7, y0: 11.7 }, { x: 25, y: 12.8, y0: 11.8 }, { x: 26, y: 12.8, y0: 11.8 }, { x: 27, y: 12.7, y0: 11.7 }, { x: 28, y: 12.7, y0: 11.7 }, { x: 29, y: 12.7, y0: 11.7 },
                                        { x: 30, y: 12.6, y0: 11.6 }, { x: 31, y: 12.6, y0: 11.5 }, { x: 32, y: 12.5, y0: 11.5 }, { x: 33, y: 12.5, y0: 11.5 }, { x: 34, y: 12.5, y0: 11.5 }, { x: 35, y: 12.4, y0: 11.4 },
                                        { x: 36, y: 12.4, y0: 11.4 }, { x: 37, y: 12.4, y0: 11.4 }, { x: 38, y: 12.3, y0: 11.3 }, { x: 39, y: 12.3, y0: 11.3 }, { x: 40, y: 12.3, y0: 11.3 }, { x: 41, y: 12.2, y0: 11.2 },
                                        { x: 42, y: 12.2, y0: 11.2 }, { x: 43, y: 12.2, y0: 11.2 }, { x: 44, y: 12.2, y0: 11.2 }, { x: 45, y: 12.2, y0: 11.2 }, { x: 46, y: 12.1, y0: 11.1 }, { x: 47, y: 12.1, y0: 11.1 },
                                        { x: 48, y: 12.1, y0: 11.1 }, { x: 49, y: 12.1, y0: 11.1 }, { x: 50, y: 12.1, y0: 11.1 }, { x: 51, y: 12.1, y0: 11.1 }, { x: 52, y: 12.0, y0: 11.0 }, { x: 53, y: 12.0, y0: 11.0 },
                                        { x: 54, y: 12.0, y0: 11.0 }, { x: 55, y: 12.0, y0: 11.0 }, { x: 56, y: 12.0, y0: 11.0 }, { x: 57, y: 12.0, y0: 11.0 }, { x: 58, y: 12.0, y0: 11.0 }, { x: 59, y: 12.0, y0: 11.0 },
                                        { x: 60, y: 12.0, y0: 11.0 }

                                    ]}
                                />

                                {/* -2SD */}
                                <VictoryArea style={{ data: { fill: "#ff0000", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 11.1, y0: 10.2 }, { x: 1, y: 12.4, y0: 11.3 }, { x: 2, y: 13.7, y0: 12.5 }, { x: 3, y: 14.3, y0: 13.1 }, { x: 4, y: 14.5, y0: 13.4 },
                                        { x: 5, y: 14.7, y0: 13.5 }, { x: 6, y: 14.7, y0: 13.6 }, { x: 7, y: 14.8, y0: 13.7 }, { x: 8, y: 14.7, y0: 13.6 }, { x: 9, y: 14.7, y0: 13.6 },
                                        { x: 10, y: 14.6, y0: 13.5 }, { x: 11, y: 14.5, y0: 13.4 }, { x: 12, y: 14.4, y0: 13.4 }, { x: 13, y: 14.3, y0: 13.3 }, { x: 14, y: 14.2, y0: 13.2 },
                                        { x: 15, y: 14.1, y0: 13.1 }, { x: 16, y: 14.0, y0: 13.1 }, { x: 17, y: 13.9, y0: 13.0 }, { x: 18, y: 13.9, y0: 12.9 }, { x: 19, y: 13.8, y0: 12.9 },
                                        { x: 20, y: 13.7, y0: 12.8 }, { x: 21, y: 13.7, y0: 12.8 }, { x: 22, y: 13.6, y0: 12.7 }, { x: 23, y: 13.6, y0: 12.7 }, { x: 24, y: 13.6, y0: 12.7 },
                                        { x: 25, y: 13.8, y0: 12.8 }, { x: 26, y: 13.7, y0: 12.8 }, { x: 27, y: 13.7, y0: 12.7 }, { x: 28, y: 13.6, y0: 12.7 }, { x: 29, y: 13.6, y0: 12.7 },
                                        { x: 30, y: 13.6, y0: 12.6 }, { x: 31, y: 13.5, y0: 12.6 }, { x: 32, y: 13.5, y0: 12.5 }, { x: 33, y: 13.5, y0: 12.5 }, { x: 34, y: 13.4, y0: 12.5 },
                                        { x: 35, y: 13.4, y0: 12.4 }, { x: 36, y: 13.4, y0: 12.4 }, { x: 37, y: 13.3, y0: 12.4 }, { x: 38, y: 13.3, y0: 12.3 }, { x: 39, y: 13.3, y0: 12.3 },
                                        { x: 40, y: 13.2, y0: 12.3 }, { x: 41, y: 13.2, y0: 12.2 }, { x: 42, y: 13.2, y0: 12.2 }, { x: 43, y: 13.2, y0: 12.2 }, { x: 44, y: 13.1, y0: 12.2 },
                                        { x: 45, y: 13.1, y0: 12.2 }, { x: 46, y: 13.1, y0: 12.1 }, { x: 47, y: 13.1, y0: 12.1 }, { x: 48, y: 13.1, y0: 12.1 }, { x: 49, y: 13.0, y0: 12.1 },
                                        { x: 50, y: 13.0, y0: 12.1 }, { x: 51, y: 13.0, y0: 12.1 }, { x: 52, y: 13.0, y0: 12.0 }, { x: 53, y: 13.0, y0: 12.0 }, { x: 54, y: 13.0, y0: 12.0 },
                                        { x: 55, y: 13.0, y0: 12.0 }, { x: 56, y: 12.9, y0: 12.0 }, { x: 57, y: 12.9, y0: 12.0 }, { x: 58, y: 12.9, y0: 12.0 }, { x: 59, y: 12.9, y0: 12.0 },
                                        { x: 60, y: 12.9, y0: 12.0 }
                                    ]} />

                                {/* -1SD */}
                                <VictoryArea style={{ data: { fill: "#ffff00", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 12.2, y0: 11.1 }, { x: 1, y: 13.6, y0: 12.4 }, { x: 2, y: 15.0, y0: 13.7 }, { x: 3, y: 15.5, y0: 14.3 }, { x: 4, y: 15.8, y0: 14.5 },
                                        { x: 5, y: 15.9, y0: 14.7 }, { x: 6, y: 16.0, y0: 14.7 }, { x: 7, y: 16.0, y0: 14.8 }, { x: 8, y: 15.9, y0: 14.7 }, { x: 9, y: 15.8, y0: 14.7 },
                                        { x: 10, y: 15.7, y0: 14.6 }, { x: 11, y: 15.6, y0: 14.5 }, { x: 12, y: 15.5, y0: 14.4 }, { x: 13, y: 15.4, y0: 14.3 }, { x: 14, y: 15.3, y0: 14.2 },
                                        { x: 15, y: 15.2, y0: 14.1 }, { x: 16, y: 15.1, y0: 14.0 }, { x: 17, y: 15.0, y0: 13.9 }, { x: 18, y: 14.9, y0: 13.9 }, { x: 19, y: 14.9, y0: 13.8 },
                                        { x: 20, y: 14.8, y0: 13.7 }, { x: 21, y: 14.7, y0: 13.7 }, { x: 22, y: 14.7, y0: 13.6 }, { x: 23, y: 14.6, y0: 13.6 }, { x: 24, y: 14.6, y0: 13.6 },
                                        { x: 25, y: 14.8, y0: 13.8 }, { x: 26, y: 14.8, y0: 13.7 }, { x: 27, y: 14.7, y0: 13.7 }, { x: 28, y: 14.7, y0: 13.6 }, { x: 29, y: 14.7, y0: 13.6 },
                                        { x: 30, y: 14.6, y0: 13.6 }, { x: 31, y: 14.6, y0: 13.5 }, { x: 32, y: 14.6, y0: 13.5 }, { x: 33, y: 14.5, y0: 13.5 }, { x: 34, y: 14.5, y0: 13.4 },
                                        { x: 35, y: 14.5, y0: 13.4 }, { x: 36, y: 14.4, y0: 13.4 }, { x: 37, y: 14.4, y0: 13.3 }, { x: 38, y: 14.4, y0: 13.3 }, { x: 39, y: 14.3, y0: 13.3 },
                                        { x: 40, y: 14.3, y0: 13.2 }, { x: 41, y: 14.3, y0: 13.2 }, { x: 42, y: 14.3, y0: 13.2 }, { x: 43, y: 14.2, y0: 13.2 }, { x: 44, y: 14.2, y0: 13.1 },
                                        { x: 45, y: 14.2, y0: 13.1 }, { x: 46, y: 14.2, y0: 13.1 }, { x: 47, y: 14.2, y0: 13.1 }, { x: 48, y: 14.1, y0: 13.1 }, { x: 49, y: 14.1, y0: 13.0 },
                                        { x: 50, y: 14.1, y0: 13.0 }, { x: 51, y: 14.1, y0: 13.0 }, { x: 52, y: 14.1, y0: 13.0 }, { x: 53, y: 14.1, y0: 13.0 }, { x: 54, y: 14.0, y0: 13.0 },
                                        { x: 55, y: 14.0, y0: 13.0 }, { x: 56, y: 14.0, y0: 12.9 }, { x: 57, y: 14.0, y0: 12.9 }, { x: 58, y: 14.0, y0: 12.9 }, { x: 59, y: 14.0, y0: 12.9 },
                                        { x: 60, y: 14.0, y0: 12.9 }
                                    ]} />

                                {/* Median */}
                                <VictoryArea style={{ data: { fill: "#92d050", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 13.4, y0: 12.2 }, { x: 1, y: 14.9, y0: 13.6 }, { x: 2, y: 16.3, y0: 15.0 }, { x: 3, y: 16.9, y0: 15.5 }, { x: 4, y: 17.2, y0: 15.8 },
                                        { x: 5, y: 17.3, y0: 15.9 }, { x: 6, y: 17.3, y0: 16.0 }, { x: 7, y: 17.3, y0: 16.0 }, { x: 8, y: 17.3, y0: 15.9 }, { x: 9, y: 17.2, y0: 15.8 },
                                        { x: 10, y: 17.0, y0: 15.7 }, { x: 11, y: 16.9, y0: 15.6 }, { x: 12, y: 16.8, y0: 15.5 }, { x: 13, y: 16.7, y0: 15.4 }, { x: 14, y: 16.6, y0: 15.3 },
                                        { x: 15, y: 16.4, y0: 15.2 }, { x: 16, y: 16.3, y0: 15.1 }, { x: 17, y: 16.2, y0: 15.0 }, { x: 18, y: 16.1, y0: 14.9 }, { x: 19, y: 16.1, y0: 14.9 },
                                        { x: 20, y: 16.0, y0: 14.8 }, { x: 21, y: 15.9, y0: 14.7 }, { x: 22, y: 15.8, y0: 14.7 }, { x: 23, y: 15.8, y0: 14.6 }, { x: 24, y: 15.7, y0: 14.6 },
                                        { x: 25, y: 16.0, y0: 14.8 }, { x: 26, y: 15.9, y0: 14.8 }, { x: 27, y: 15.9, y0: 14.7 }, { x: 28, y: 15.9, y0: 14.7 }, { x: 29, y: 15.8, y0: 14.7 },
                                        { x: 30, y: 15.8, y0: 14.6 }, { x: 31, y: 15.8, y0: 14.6 }, { x: 32, y: 15.7, y0: 14.6 }, { x: 33, y: 15.7, y0: 14.5 }, { x: 34, y: 15.7, y0: 14.5 },
                                        { x: 35, y: 15.6, y0: 14.5 }, { x: 36, y: 15.6, y0: 14.4 }, { x: 37, y: 15.6, y0: 14.4 }, { x: 38, y: 15.5, y0: 14.4 }, { x: 39, y: 15.5, y0: 14.3 },
                                        { x: 40, y: 15.5, y0: 14.3 }, { x: 41, y: 15.5, y0: 14.3 }, { x: 42, y: 15.4, y0: 14.3 }, { x: 43, y: 15.4, y0: 14.2 }, { x: 44, y: 15.4, y0: 14.2 },
                                        { x: 45, y: 15.4, y0: 14.2 }, { x: 46, y: 15.4, y0: 14.2 }, { x: 47, y: 15.3, y0: 14.2 }, { x: 48, y: 15.3, y0: 14.1 }, { x: 49, y: 15.3, y0: 14.1 },
                                        { x: 50, y: 15.3, y0: 14.1 }, { x: 51, y: 15.3, y0: 14.1 }, { x: 52, y: 15.3, y0: 14.1 }, { x: 53, y: 15.3, y0: 14.1 }, { x: 54, y: 15.3, y0: 14.0 },
                                        { x: 55, y: 15.2, y0: 14.0 }, { x: 56, y: 15.2, y0: 14.0 }, { x: 57, y: 15.2, y0: 14.0 }, { x: 58, y: 15.2, y0: 14.0 }, { x: 59, y: 15.2, y0: 14.0 },
                                        { x: 60, y: 15.2, y0: 14.0 }
                                    ]} />

                                {/* +1SD */}
                                <VictoryArea style={{ data: { fill: "#ffff00", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 14.8, y0: 13.4 }, { x: 1, y: 16.3, y0: 14.9 }, { x: 2, y: 17.8, y0: 16.3 }, { x: 3, y: 18.4, y0: 16.9 }, { x: 4, y: 18.7, y0: 17.2 },
                                        { x: 5, y: 18.8, y0: 17.3 }, { x: 6, y: 18.8, y0: 17.3 }, { x: 7, y: 18.8, y0: 17.3 }, { x: 8, y: 18.7, y0: 17.3 }, { x: 9, y: 18.6, y0: 17.2 },
                                        { x: 10, y: 18.5, y0: 17.0 }, { x: 11, y: 18.4, y0: 16.9 }, { x: 12, y: 18.2, y0: 16.8 }, { x: 13, y: 18.1, y0: 16.7 }, { x: 14, y: 18.0, y0: 16.6 },
                                        { x: 15, y: 17.8, y0: 16.4 }, { x: 16, y: 17.7, y0: 16.3 }, { x: 17, y: 17.6, y0: 16.2 }, { x: 18, y: 17.5, y0: 16.1 }, { x: 19, y: 17.4, y0: 16.1 },
                                        { x: 20, y: 17.3, y0: 16.0 }, { x: 21, y: 17.2, y0: 15.9 }, { x: 22, y: 17.2, y0: 15.8 }, { x: 23, y: 17.1, y0: 15.8 }, { x: 24, y: 17.0, y0: 15.7 },
                                        { x: 25, y: 17.3, y0: 16.0 }, { x: 26, y: 17.3, y0: 15.9 }, { x: 27, y: 17.2, y0: 15.9 }, { x: 28, y: 17.2, y0: 15.9 }, { x: 29, y: 17.1, y0: 15.8 },
                                        { x: 30, y: 17.1, y0: 15.8 }, { x: 31, y: 17.1, y0: 15.8 }, { x: 32, y: 17.0, y0: 15.7 }, { x: 33, y: 17.0, y0: 15.7 }, { x: 34, y: 17.0, y0: 15.7 },
                                        { x: 35, y: 16.9, y0: 15.6 }, { x: 36, y: 16.9, y0: 15.6 }, { x: 37, y: 16.9, y0: 15.6 }, { x: 38, y: 16.8, y0: 15.5 }, { x: 39, y: 16.8, y0: 15.5 },
                                        { x: 40, y: 16.8, y0: 15.5 }, { x: 41, y: 16.8, y0: 15.5 }, { x: 42, y: 16.8, y0: 15.4 }, { x: 43, y: 16.7, y0: 15.4 }, { x: 44, y: 16.7, y0: 15.4 },
                                        { x: 45, y: 16.7, y0: 15.4 }, { x: 46, y: 16.7, y0: 15.4 }, { x: 47, y: 16.7, y0: 15.3 }, { x: 48, y: 16.7, y0: 15.3 }, { x: 49, y: 16.7, y0: 15.3 },
                                        { x: 50, y: 16.6, y0: 15.3 }, { x: 51, y: 16.6, y0: 15.3 }, { x: 52, y: 16.6, y0: 15.3 }, { x: 53, y: 16.6, y0: 15.3 }, { x: 54, y: 16.6, y0: 15.3 },
                                        { x: 55, y: 16.6, y0: 15.2 }, { x: 56, y: 16.6, y0: 15.2 }, { x: 57, y: 16.6, y0: 15.2 }, { x: 58, y: 16.6, y0: 15.2 }, { x: 59, y: 16.6, y0: 15.2 },
                                        { x: 60, y: 16.6, y0: 15.2 }
                                    ]} />

                                {/* +2SD */}
                                <VictoryArea style={{ data: { fill: "#ff0000", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 16.3, y0: 14.8 }, { x: 1, y: 17.8, y0: 16.3 }, { x: 2, y: 19.4, y0: 17.8 }, { x: 3, y: 20.0, y0: 18.4 }, { x: 4, y: 20.3, y0: 18.7 },
                                        { x: 5, y: 20.5, y0: 18.8 }, { x: 6, y: 20.5, y0: 18.8 }, { x: 7, y: 20.5, y0: 18.8 }, { x: 8, y: 20.4, y0: 18.7 }, { x: 9, y: 20.3, y0: 18.6 },
                                        { x: 10, y: 20.1, y0: 18.5 }, { x: 11, y: 20.0, y0: 18.4 }, { x: 12, y: 19.8, y0: 18.2 }, { x: 13, y: 19.7, y0: 18.1 }, { x: 14, y: 19.5, y0: 18.0 },
                                        { x: 15, y: 19.4, y0: 17.8 }, { x: 16, y: 19.3, y0: 17.7 }, { x: 17, y: 19.1, y0: 17.6 }, { x: 18, y: 19.0, y0: 17.5 }, { x: 19, y: 18.9, y0: 17.4 },
                                        { x: 20, y: 18.8, y0: 17.3 }, { x: 21, y: 18.7, y0: 17.2 }, { x: 22, y: 18.7, y0: 17.2 }, { x: 23, y: 18.6, y0: 17.1 }, { x: 24, y: 18.5, y0: 17.0 },
                                        { x: 25, y: 18.8, y0: 17.3 }, { x: 26, y: 18.8, y0: 17.3 }, { x: 27, y: 18.7, y0: 17.2 }, { x: 28, y: 18.7, y0: 17.2 }, { x: 29, y: 18.6, y0: 17.1 },
                                        { x: 30, y: 18.6, y0: 17.1 }, { x: 31, y: 18.5, y0: 17.1 }, { x: 32, y: 18.5, y0: 17.0 }, { x: 33, y: 18.5, y0: 17.0 }, { x: 34, y: 18.4, y0: 17.0 },
                                        { x: 35, y: 18.4, y0: 16.9 }, { x: 36, y: 18.4, y0: 16.9 }, { x: 37, y: 18.3, y0: 16.9 }, { x: 38, y: 18.3, y0: 16.8 }, { x: 39, y: 18.3, y0: 16.8 },
                                        { x: 40, y: 18.2, y0: 16.8 }, { x: 41, y: 18.2, y0: 16.8 }, { x: 42, y: 18.2, y0: 16.8 }, { x: 43, y: 18.2, y0: 16.7 }, { x: 44, y: 18.2, y0: 16.7 },
                                        { x: 45, y: 18.2, y0: 16.7 }, { x: 46, y: 18.2, y0: 16.7 }, { x: 47, y: 18.2, y0: 16.7 }, { x: 48, y: 18.2, y0: 16.7 }, { x: 49, y: 18.2, y0: 16.7 },
                                        { x: 50, y: 18.2, y0: 16.6 }, { x: 51, y: 18.2, y0: 16.6 }, { x: 52, y: 18.2, y0: 16.6 }, { x: 53, y: 18.2, y0: 16.6 }, { x: 54, y: 18.2, y0: 16.6 },
                                        { x: 55, y: 18.2, y0: 16.6 }, { x: 56, y: 18.2, y0: 16.6 }, { x: 57, y: 18.2, y0: 16.6 }, { x: 58, y: 18.3, y0: 16.6 }, { x: 59, y: 18.3, y0: 16.6 },
                                        { x: 60, y: 18.3, y0: 16.6 }
                                    ]} />

                                {/* +3SD */}
                                <VictoryArea style={{ data: { fill: "#c00000", fillOpacity: 0.2, strokeWidth: 0 } }}
                                    data={[
                                        { x: 0, y: 18.1, y0: 16.3 }, { x: 1, y: 19.4, y0: 17.8 }, { x: 2, y: 21.1, y0: 19.4 }, { x: 3, y: 21.8, y0: 20.0 }, { x: 4, y: 22.1, y0: 20.3 },
                                        { x: 5, y: 22.3, y0: 20.5 }, { x: 6, y: 22.3, y0: 20.5 }, { x: 7, y: 22.3, y0: 20.5 }, { x: 8, y: 22.2, y0: 20.4 }, { x: 9, y: 22.1, y0: 20.3 },
                                        { x: 10, y: 22.0, y0: 20.1 }, { x: 11, y: 21.8, y0: 20.0 }, { x: 12, y: 21.6, y0: 19.8 }, { x: 13, y: 21.5, y0: 19.7 }, { x: 14, y: 21.3, y0: 19.5 },
                                        { x: 15, y: 21.2, y0: 19.4 }, { x: 16, y: 21.0, y0: 19.3 }, { x: 17, y: 20.9, y0: 19.1 }, { x: 18, y: 20.8, y0: 19.0 }, { x: 19, y: 20.7, y0: 18.9 },
                                        { x: 20, y: 20.6, y0: 18.8 }, { x: 21, y: 20.5, y0: 18.7 }, { x: 22, y: 20.4, y0: 18.7 }, { x: 23, y: 20.3, y0: 18.6 }, { x: 24, y: 20.3, y0: 18.5 },
                                        { x: 25, y: 20.5, y0: 18.8 }, { x: 26, y: 20.5, y0: 18.8 }, { x: 27, y: 20.4, y0: 18.7 }, { x: 28, y: 20.4, y0: 18.7 }, { x: 29, y: 20.3, y0: 18.6 },
                                        { x: 30, y: 20.2, y0: 18.6 }, { x: 31, y: 20.2, y0: 18.5 }, { x: 32, y: 20.1, y0: 18.5 }, { x: 33, y: 20.1, y0: 18.5 }, { x: 34, y: 20.0, y0: 18.4 },
                                        { x: 35, y: 20.0, y0: 18.4 }, { x: 36, y: 20.0, y0: 18.4 }, { x: 37, y: 19.9, y0: 18.3 }, { x: 38, y: 19.9, y0: 18.3 }, { x: 39, y: 19.9, y0: 18.3 },
                                        { x: 40, y: 19.9, y0: 18.2 }, { x: 41, y: 19.9, y0: 18.2 }, { x: 42, y: 19.8, y0: 18.2 }, { x: 43, y: 19.8, y0: 18.2 }, { x: 44, y: 19.8, y0: 18.2 },
                                        { x: 45, y: 19.8, y0: 18.2 }, { x: 46, y: 19.8, y0: 18.2 }, { x: 47, y: 19.9, y0: 18.2 }, { x: 48, y: 19.9, y0: 18.2 }, { x: 49, y: 19.9, y0: 18.2 },
                                        { x: 50, y: 19.9, y0: 18.2 }, { x: 51, y: 19.9, y0: 18.2 }, { x: 52, y: 19.9, y0: 18.2 }, { x: 53, y: 20.0, y0: 18.2 }, { x: 54, y: 20.0, y0: 18.2 },
                                        { x: 55, y: 20.0, y0: 18.2 }, { x: 56, y: 20.1, y0: 18.2 }, { x: 57, y: 20.1, y0: 18.2 }, { x: 58, y: 20.2, y0: 18.3 }, { x: 59, y: 20.2, y0: 18.3 },
                                        { x: 60, y: 20.3, y0: 18.3 }
                                    ]} />
                            </VictoryChart>


                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                            {
                                listHistory.map((item) => {
                                    return (
                                        <View style={{ backgroundColor: '#fff', marginHorizontal: hp("3%"), padding: hp('2%'), marginBottom: hp('3%'), flexDirection: 'row', borderRadius: 8, elevation: 2 }}>
                                            <View style={styles.right}>
                                                <Text style={styles.fontStyle}>nama anak   </Text>
                                                <Text style={styles.fontStyle}>Tgl Pengecekan    </Text>
                                                <Text style={styles.fontStyle}>Usia Saat Cek    </Text>
                                                <Text style={styles.fontStyle}>Berat Badan    </Text>
                                                <Text style={styles.fontStyle}>Tinggi Badan    </Text>
                                                <Text style={styles.fontStyle}>IMT    </Text>
                                                <Text style={styles.fontStyle}>Status    </Text>
                                            </View>
                                            <View style={styles.left} >
                                                <Text style={styles.fontStyle}>:  {item.nama_anak}</Text>
                                                <Text style={styles.fontStyle}>:  {moment(item.tanggal_check).format("L")}</Text>
                                                <Text style={styles.fontStyle}>:  {item.usia} Bulan</Text>
                                                <Text style={styles.fontStyle}>:  {item.berat_badan} Kg</Text>
                                                <Text style={styles.fontStyle}>:  {item.tinggi_badan} cm</Text>
                                                <Text style={styles.fontStyle}>:  {item.indeks_massa}</Text>
                                                <Text style={styles.fontStyle}>:  {item.status_gizi}</Text>
                                            </View>
                                        </View>
                                    )
                                })

                            }
                        </ScrollView>
                    </SafeAreaView>
                ) : (
                    <LoadingScreen/>
                )
            }
        </>
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

export default KurvaDetailScreen
