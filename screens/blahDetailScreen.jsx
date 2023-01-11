import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomText from "../component/customText";
import SundryItem from "../component/sundtyItem";
import { blahDelete, blahOneRead } from "../util/blahUtil";

function BlahDetailScreen({navigation,route}) {
    const id = route.params.item[0];
    const [item,setItem] = useState({})
    const [emaild,setEmaild] = useState("")
    const isFocused = useIsFocused()
    console.log(item);
    console.log(emaild);
    AsyncStorage.getItem("authentication").then((data)=>{
        let dd = JSON.parse(data).email;
        setEmaild(dd)
    })
    useEffect(()=>{
        blahOneRead(id).then((data)=>{
            setItem({...data});
        })
    },[isFocused])
    return ( 
        <View style={{backgroundColor:"white", flex:1}}>
            <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
            <CustomButton onPress={()=>{
                if(item.writer === emaild){
                    navigation.navigate("blahReWriteScreen",{id,item})
                } else{
                    Alert.alert("오류","작성자가 아닙니다.")
                }
            }}>수정</CustomButton>
            <CustomButton onPress={()=>{
                 Alert.alert("With","삭제 하시겠습니까?",[
            {
                text:"취소"
            },
            {
                text:"삭제",
                onPress: () => {
                    blahDelete(id,item.writer).then((rst)=>{
                        if(rst===null){
                            navigation.navigate("blah")
                        } else {
                            Alert.alert("오류","작성자가 아닙니다.")
                        }
                    })
                }
            }
        ])
                
            }}>삭제</CustomButton>
            </View>
           <View style={{ backgroundColor: "white", margin: 10, padding: 10,overflow:"hidden",maxHeight:160 }}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View>
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 15,color:"gray" }}>{item.createdAt}</CustomText>
                    </View>
                <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end" }}>
                    <Image style={{ height: 30, width: 30, borderRadius: 15, marginTop: 5 }} resizeMode="cover" source={require("../assets/image/thumnail.gif")} />
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 20 }}>{item.writer}</CustomText>
                </View>
                </View>
                <View style={{borderBottomWidth:1,paddingBottom:5,borderBottomColor:"#ddd"}}>
                <CustomText style={{ color: "black", textAlign: "left", fontSize: 40,padding:10, marginTop:5 }}>{item.title}</CustomText>
                </View>
                <View>
                <CustomText style={{ color: "black", textAlign: "left", fontSize: 20,padding:10, marginTop:5 }}>{item.contents}</CustomText>
                </View>
           </View>
        </View>
     );
}

export default BlahDetailScreen;