import { Image, Pressable, Text, View } from "react-native";
import CustomText from "./customText";


function SundryItem({ children, onPress }) {
    return (
        <Pressable onPress={onPress} android_ripple={{ color: "#cccccc" }}>
            <View style={{ backgroundColor: "white", margin: 10, padding: 10 }}>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,paddingBottom:5,borderBottomColor:"#ddd"}}>
                    <View>
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 15,color:"gray" }}>2022-09-22</CustomText>
                    </View>
                <View style={{ alignItems: "flex-end", flexDirection: "row", justifyContent: "flex-end" }}>
                    <Image style={{ height: 30, width: 30, borderRadius: 15, marginTop: 5 }} resizeMode="cover" source={require("../assets/image/thumnail.gif")} />
                    <CustomText style={{ color: "black", textAlign: "center", fontSize: 20 }}>사용자이름</CustomText>
                </View>
                </View>
                <View>
                <CustomText style={{ color: "black", textAlign: "left", fontSize: 20,padding:10, marginTop:5 }}>{children}</CustomText>
                </View>
            </View>
        </Pressable>
    );
}

export default SundryItem;