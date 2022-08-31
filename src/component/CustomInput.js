import React from "react";
import { StyleSheet, Text, TextInput, View,} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"


const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return(
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: wp('60%'),
        paddingHorizontal: wp('2%'),
    },
    input: {
        fontSize: hp('2%'),
    },
})
