import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomInput from "../component/customInput";
import { sendLoginReq } from "../util/accounts";


function LoginScreen() {
    const [inputState, setInputState] = useState({ email: "", password: "" });

    const emailhandle = (txt) => {
        setInputState({ ...inputState, email: txt })
    }
    const passwordhandle = (txt) => {
        setInputState({ ...inputState, password: txt })
    }

    const loginHandle = () => {
        !async function () {
            try {
                const recv = await sendLoginReq(inputState.email, inputState.password);
                if (recv.registered) {
                    navigation.navigate("home");
                }
            } catch (e) {
                Alert.alert("로그인 실패", "아이디 혹은 비밀번호를 다시 확인 바랍니다.")
            }
        }();
    }

    let disabled = "disabled";
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (inputState.email.match(regExp) && inputState.password.length >= 6) {
        disabled = "";
    } else {
        disabled = "disabled";
    }



const navigation = useNavigation();
navigation.setOptions({title:"로그인"})
return (

    <View style={styles.main}>
        <Text style={{color:"white",textAlign:"center",fontSize:100,marginBottom:20}}>𝖜𝖎𝖙𝖍</Text>
        <CustomInput type="e-mail" onTrans={emailhandle} />
        <CustomInput type="password" onTrans={passwordhandle} />
        <View>
            <CustomButton disabled={disabled} onPress={loginHandle}>로그인</CustomButton>
        </View>
        <View>
            <Pressable android_ripple={{ color: "#222" }} onPress={() => navigation.navigate("register")}>
                <Text style={{ textAlign: "center", color: "white",fontFamily:"Mabifont" }}>계정을 생성하시겠습니까?</Text>
            </Pressable>
        </View>
    </View>
);
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
    },
})

export default LoginScreen;