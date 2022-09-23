import { useState } from "react";
import { Alert, Image, TextInput, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomInput from "../component/customInput";
import CustomText from "../component/customText";
import { blahReWrite } from "../util/blahUtil";


function BlahReWriteScreen({navigation,route}) {
    const item = route.params.item
    const id = route.params.id
    const [tvalue,setTvalue] = useState(item.title)
    const [cvalue,setCvalue] = useState(item.contents)
    return (
        <View style={{ backgroundColor: "white", margin: 10, padding: 10,flex:1}}>
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
            <TextInput style={[{fontFamily:"Mabifont",fontSize:"40",padding:10, marginTop:5}]} onChangeText={setTvalue} value={tvalue} />
        </View>
        <View>
                <TextInput style={[{fontFamily:"Mabifont",fontSize:"20",padding:10, marginTop:5}]} onChangeText={setCvalue} value={cvalue}/>                
        </View>
        <View>
            <CustomButton onPress={()=>{
                 Alert.alert("With","수정 하시겠습니까?",[
            {
                text:"취소"
            },
            {
                text:"수정",
                onPress: () => {
                    blahReWrite(id,item.writer,tvalue,cvalue).then((data)=>{
                        if(data === false){
                            Alert.alert("서버통신에러","서버와통신이안됩니다.")
                        } else {
                            navigation.navigate("blahDetail",{item:[id]})
                        }
                    })
                }
            }
        ])
                
            }}>수정</CustomButton>
        </View>
   </View>
     );
}

export default BlahReWriteScreen;