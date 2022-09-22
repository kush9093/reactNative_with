import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomInput from "../component/customInput";
import LoadingOverlay from "../component/loadingOverlay";
import { AppContext } from "../context/app-context";
import { sendRegisterReq } from "../util/accounts";


function RegisterScreen() {
    
    const [loading,setLoading] = useState(false);

    const [inputValue,setInputValue] = useState({email:"",password:"",passwordtwo:""});

    const ctx = useContext(AppContext);

    const emailhandle = (elm) =>{
        setInputValue({...inputValue,email:elm});
    }
    const passwordhandle = (elm) =>{
        setInputValue({...inputValue,password:elm});
    }
    const tpasswordhandle = (elm) =>{
        setInputValue({...inputValue,passwordtwo:elm});
    }

    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    let disabled = "disabled";

    if(inputValue.email.match(regExp) && inputValue.password.length>=6 && inputValue.passwordtwo.length>=6){
        disabled="";
    }

    const registerHandle=  () => {
        setLoading(true)
    !async function() {
        try{
      const recv = await sendRegisterReq(inputValue.email,inputValue.password);
      ctx.dispatch({type:"login",payload:recv})
      AsyncStorage.setItem("authentication",JSON.stringify(recv))
      navigation.navigate("home");
    } catch(e){
        Alert.alert("실패","회원 가입이 처리되지 않았습니다. 다시 시도해주시길 바랍니다.")
        console.log(e)
    }
      setLoading(false);
    }();
}
    const cheked = () =>{
        if(inputValue.password===inputValue.passwordtwo){
            return registerHandle()
        }
        else {
           return Alert.alert("비밀번호 불일치","비밀번호가 일치하지 않습니다.")
        }
    }

if(loading){
return <LoadingOverlay/>  
}


    const navigation = useNavigation();
    useEffect(()=>{

        navigation.setOptions({title:"회원가입"})
    },[])
    return ( 
        
        <View style={styles.main}>
            <Text style={{color:"white",textAlign:"center",fontSize:100,marginBottom:20}}>𝖜𝖎𝖙𝖍</Text>
            <CustomInput type="e-mail" onTrans={emailhandle} />
            <CustomInput type="password" onTrans={passwordhandle} />
            <CustomInput type="password" onTrans={tpasswordhandle} />
            <View>
                <CustomButton disabled={disabled} onPress={cheked}>회원가입</CustomButton>
            </View>
        </View>
     );
}
const styles = StyleSheet.create({
    main : {
        flex:1,
        justifyContent:"center",
        backgroundColor:"black"
    },
})

export default RegisterScreen;