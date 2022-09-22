import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomText from "../component/customText";
import { AppContext } from "../context/app-context";


function InfoScreen({navigation,route}) {
    const recv = useContext(AppContext);
    if(true){
        AsyncStorage.getItem("authentication").then((data)=>{
            if(data){
                navigation.navigate("home");
            }
        })
    }
    const logoutHandle = () =>{
        Alert.alert("With","로그아웃 하시겠습니까?",[
            {
                text:"취소"
            },
            {
                text:"로그아웃",
                onPress: () => {
                    recv.dispatch({type:"logout"});
                    AsyncStorage.setItem("authentication",null)
                    navigation.navigate("home");
                }
            }
        ])

    }
    return ( 
        <View style={[{ flex: 1, justifyContent: "center", backgroundColor: "#000" }]}>
            <View style={{flex:1,alignItems:"center"}}>
            <Image style={{height:200,width:200, borderRadius:100,marginTop:100}} resizeMode="cover" source={require("../assets/image/thumnail.gif")} />
            </View>
            <View style={{flex:1,marginTop:100}}>
            <CustomText style={{textAlign:"center",fontSize:25,marginBottom:50}}>{recv.value.email}</CustomText>
            <CustomButton onPress={logoutHandle}>로그아웃</CustomButton>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({

})

export default InfoScreen;