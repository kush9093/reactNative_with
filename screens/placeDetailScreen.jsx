import { useEffect } from "react";
import { Image, View } from "react-native";
import CustomText from "../component/customText";

function PlaceDetailScreen({ navigation, route }) {
    useEffect(()=>{
        navigation.setOptions({ title: route.params.item.title })
    },[])
    return (
        <View style={{ flex: 1,backgroundColor:"#000" }}>
            <Image style={{ flex: 1, maxHeight: "50%" }} source={{
                uri: route.params.item.imageURL,
            }} />
            <CustomText style={{marginTop:10}}>{route.params.item.location.address}</CustomText>
            <CustomText style={{marginTop:10}}>현 위치 와의 거리 : {(route.params.item.range).toFixed(1)}km</CustomText>
        </View>
    );
}

export default PlaceDetailScreen;