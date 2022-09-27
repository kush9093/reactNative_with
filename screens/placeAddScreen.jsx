import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import ImagePicker from "../component/imagePicker";
import LocationPicker from "../component/locationPicker";


export default function PlaceAddScreen({route}) {

        // 데이터 등록할때 필요한 값들을 state로 설정
    const [placeInfo,setPlaceInfo] = useState("");  //장소 설명
    const [placeImage,setPlaceImage] =useState(null); // 장소이미지
    const [placeLocation,setPlaceLocation] = useState(null); // 장소 위치


    useEffect(()=>{
        console.log("placeInfo : ",placeInfo,"placeImage : ",placeImage,"placeLocation : ",placeLocation);
    },[placeInfo,placeImage,placeLocation])
    
    const isFocused = useIsFocused();
    useEffect(()=>{
        if(isFocused && route.params){
            setPlaceLocation({address:"",...route.params})
        }
    },[isFocused])

    console.log("PlaceAddScreen .. render");




    const imagePickedHandle = (uri) => {
        setPlaceImage(uri);
    }

    const locationPickedHandle = (location) => {
        setPlaceLocation(location);
    }

    return (
        <View style={[ { paddingBottom: 12, flex: 1 ,backgroundColor:"#000000"}]}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginBottom: 8 }}>
                    <TextInput style={{
                        padding: 6, borderBottomColor: "#ffffff",
                        borderBottomWidth: 1,
                        backgroundColor:"black",
                        font:"#ffffff",
                    }} placeholder={"여기는 어디인가요."} placeholderTextColor="#ffffff"
                    value={placeInfo} onChangeText={setPlaceInfo} />
                </View>
                <ImagePicker onPicked={imagePickedHandle} />
                <LocationPicker onPicked={locationPickedHandle} initCoords={placeLocation?.coordinate} />
            </ScrollView>
        </View>
    );
}

