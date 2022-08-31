//React Library
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { createStackNavigator } from '@react-navigation/stack';

//assets import
import { iconHome, iconHomeFocused, iconDaftarPasien, iconDaftarPasienFocused, 
    iconKurva, iconKurvaFocused, iconStatistik, iconStatistikFocused, iconProfil, 
    iconProfilFocused } from '../assets/icons';
import { bgHome, bgPattern } from '../assets/image';

//component import
import CustomHeader from '../component/CustomHeader';

//screens import
import KurvaPertumbuhanScreen from './kurvaPertumbuhan-page';
import StatistikScreen from './statistik-page';
import DaftarPasienScreen from './daftarPasien-page';
import UserDetailPage from './userDetail-page';
import ChatScreen from './chat-page';
import KurvaDetailScreen from './kurvaDetail-page';

//Firebase
import { auth } from '../utility/firebase-config';

//Misc
import axios from 'axios';
import { baseURL } from '../helpers/baseURL';


const HomeScreen = ({navigation}) => {

    // useEffect(()=>{
    //     getNama()
    // })

    // const getNama = async() => {
    //     try {
    //         const res = await axios.get(`${baseURL}/ibu/list?email=rio.alaska123@gmail.com`)
    //         console.log("nama : ", res.data.data)
    //     } catch (error) {
    //         console.log("error : ",error)
    //     }
    // }
    
    return(
        <SafeAreaView style={{ flex: 1}}>
            
            <ImageBackground style={styles.backgroundImage} source={bgHome}>
                <CustomHeader isHome={true} navigation={navigation} title="SaGiTa"/>
            </ImageBackground>
            <View style={styles.layoutHome}>
                <Text style={styles.customText}>Halo, {auth.currentUser?.email}</Text>
                <Text style={styles.customText}>Selamat datang di SaGiTa.</Text>
            </View>
        </SafeAreaView>
    )
}

const navOptionHandler = () => ({ headerShown: false })
  
const StackHome = createStackNavigator();
function HomeStack({navigation, route}){
  if (route.state && route.state.index > 0){
      navigation.setOptions({tabBarVisible: false})
  }
  else{
      navigation.setOptions({tabBarVisible: true})
  }
  return(
    <StackHome.Navigator initialRouteName='Home'>
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler}/>
      <StackHome.Screen name='Chat' component={ChatScreen} options={navOptionHandler}/>
    </StackHome.Navigator>
  )
}

const StackDaftarPasien = createStackNavigator();
function DaftarPasienStack(){
  return(
    <StackDaftarPasien.Navigator initialRouteName='DaftarPasien'>
      <StackDaftarPasien.Screen name="DaftarPasien" component={DaftarPasienScreen} options={navOptionHandler}/>
    </StackDaftarPasien.Navigator>
  )
}

const StackKurvaPertumbuhan = createStackNavigator();
function KurvaPertumbuhanStack({navigation, route}){
    if (route.state && route.state.index > 0){
        navigation.setOptions({tabBarVisible: false})
    }
    else{
        navigation.setOptions({tabBarVisible: true})
    }
  return(
    <StackKurvaPertumbuhan.Navigator initialRouteName='KurvaPertumbuhan'>
      <StackKurvaPertumbuhan.Screen name="KurvaPertumbuhan" component={KurvaPertumbuhanScreen} options={navOptionHandler}/>
      <StackKurvaPertumbuhan.Screen name="KurvaPertumbuhanDetail" component={KurvaDetailScreen} options={navOptionHandler}/>
    </StackKurvaPertumbuhan.Navigator>
  )
}

const StackStatistik = createStackNavigator();
function StatistikStack(){
    return(
        <StackStatistik.Navigator initialRouteName='Statistik'>
            <StackStatistik.Screen name='Statistik' component={StatistikScreen} options={navOptionHandler}/>
        </StackStatistik.Navigator>
    )
}

const StackProfil = createStackNavigator();
function ProfilStack(){
    return(
        <StackProfil.Navigator initialRouteName='Profil'>
            <StackProfil.Screen name='Profil' component={UserDetailPage} options={navOptionHandler}/>
        </StackProfil.Navigator>
    )
}


function HomePage(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
      
                if (route.name === 'Home') {
                    iconName = focused
                        ? iconHomeFocused
                        : iconHome
                } 
                else if (route.name === 'Kurva') {
                    iconName = focused 
                        ? iconKurvaFocused 
                        : iconKurva
                }
                else if (route.name === 'Statistik') {
                    iconName = focused 
                        ? iconStatistikFocused
                        : iconStatistik
                }      
                else if (route.name === 'Daftar Balita') {
                    iconName = focused 
                        ? iconDaftarPasienFocused
                        : iconDaftarPasien
                }  
                else if (route.name === 'Profil') {
                    iconName = focused 
                        ? iconProfilFocused
                        : iconProfil
                }       
                  // You can return any component that you like here!
                return <Image source={iconName} style={{width: wp('6%'),}} 
                resizeMode='contain'/>
            },
            })}
                tabBarOptions={{
                activeTintColor: '#00C2FF',
                inactiveTintColor: 'black',
            }}
        >
            
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Daftar Balita" component={DaftarPasienStack}/>
            <Tab.Screen name="Kurva" component={KurvaPertumbuhanStack}/>
            <Tab.Screen name="Statistik" component={StatistikStack}/>
            <Tab.Screen name="Profil" component={ProfilStack}/>
            
        </Tab.Navigator>
    )
}

export default HomePage

const styles = StyleSheet.create({
    layoutHeader:{
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#00C2FF'
    },
    layoutHome:{
      flex: 1,
      marginTop: hp('18%'),
      marginLeft: wp('8 %')
    },
    titleText:{
      flex: 2,  
      justifyContent: 'center'
    },
    customTitle:{
      textAlign: 'center',
      fontSize: hp('3%'),
      fontWeight: 'bold',
      color: 'white'
    },
    backgroundImage:{
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute'
    },
    customText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('4.5%'),
    }
  })