import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { iconBack, iconChat, iconProfil } from '../assets/icons';

const CustomHeader = ({ navigation, title, isHome }) => {
    return (
        <SafeAreaView>
            {
                isHome ?
                    <View style={styles.layoutHeader}>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.titleText}>
                            <Text style={styles.customTitle}>{title}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: wp('3%') }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                                <Image style={{ width: wp('6%') }} source={iconChat} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                    </View>

                    :
                    <View style={styles.layoutHeader}> 
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: wp('3%') }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.goBack()}>
                                <Image style={{ width: wp('6%') }} source={iconBack} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleText}>
                            <Text style={styles.customTitle}>{title}</Text>
                        </View>
                        <View style={{ flex: 1 }}>

                        </View>

                    </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    layoutHeader: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#00C2FF',
    },
    titleText: {
        flex: 2,
        justifyContent: 'center'
    },
    customTitle: {
        textAlign: 'center',
        fontSize: hp('3.5%'),//Property Values untuk ukuran fontsize
        fontWeight: 'bold',
        color: 'white'
    },
})

export default CustomHeader