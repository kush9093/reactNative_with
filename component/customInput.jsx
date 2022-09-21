import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function CustomInput({type,onTrans}) {


    let ispassword = false;
    if(type.includes("password")){
        ispassword = true;
    }


    return ( 
        <View>
            <TextInput secureTextEntry={ispassword} style={styles.input} placeholder={type} onChangeText={(txt)=>{onTrans(txt)}}  maxLength={32}  />
        </View>
     );
}

const styles = StyleSheet.create({
    input : {
        borderWidth : 1,
        height:40,
        margin:12,
        padding:10,
        fontFamily:"Mabifont",
        backgroundColor:"white",
        borderRadius:10,
        textAlign:"center",
        fontSize:20,
    },
})


export default CustomInput;