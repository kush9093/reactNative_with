import { Image, Pressable, Text, View } from "react-native";
import CustomText from "./customText";


function SundryItem({ onPress,item }) {
    return (
        <Pressable onPress={onPress} android_ripple={{ color: "#cccccc" }}>
            <View style={{ backgroundColor: "white", margin: 10, padding: 10,overflow:"hidden",maxHeight:160 }}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View>
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 15,color:"gray" }}>{item[1].createdAt}</CustomText>
                    </View>
                <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end" }}>
                    <Image style={{ height: 30, width: 30, borderRadius: 15, marginTop: 5 }} resizeMode="cover" source={require("../assets/image/thumnail.gif")} />
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 20 }}>{item[1].writer}</CustomText>
                </View>
                </View>
                <View style={{borderBottomWidth:1,paddingBottom:5,borderBottomColor:"#ddd"}}>
                <CustomText style={{ color: "black", textAlign: "left", fontSize: 30,padding:10, marginTop:5 }}>{item[1].title}</CustomText>
                </View>
                <View>
                <CustomText style={{ color: "black", textAlign: "left", fontSize: 20,padding:10, marginTop:5 }}>{item[1].contents}</CustomText>
                </View>
            </View>
        </Pressable>
    );
}

export default SundryItem;