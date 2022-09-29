import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import IconButton from "../component/iconButton";
import ImagePicker from "../component/imagePicker";
import LocationPicker from "../component/locationPicker";
import { sendAddPlaceRequest } from "../util/places";


export default function PlaceAddScreen({route,navigation}) {

        // 데이터 등록할때 필요한 값들을 state로 설정
    const [placeInfo,setPlaceInfo] = useState("");  //장소 설명
    const [placeImage,setPlaceImage] =useState(null); // 장소이미지
    const [placeImageBase64,setPlaceImageBase64] = useState(null); 
    const [placeLocation,setPlaceLocation] = useState(null); // 장소 위치


    useEffect(()=>{
        console.log("placeInfo : ",placeInfo,"placeImage : ",placeImage,"placeLocation : ",placeLocation);
    },[placeInfo,placeImage,placeLocation])
    
    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>{
                return (
                    <View style={{justifyContent:"flex-end"}}>
                        <IconButton name={"cloud-upload-outline"} size={28} color="#fff" onPress={confirm} />
                    </View>
                )
            }
        })
    },[placeInfo,placeImage,placeLocation,placeImageBase64])


    const confirm = () => {
        const data = {
            title : placeInfo,
            location : placeLocation,
            createAt: new Date()
        }
        if(placeInfo==null || placeImage==null || placeLocation==null){
            console.log(placeInfo,placeImage,placeLocation)
            Alert.alert("오류","아직 입력 하지 않은 데이터가 존재합니다!!")
        }else {

        
        sendAddPlaceRequest(data,placeImageBase64,placeImage).then((statd)=>{
            if(statd===200){
                navigation.navigate("with");
            } else {
                Alert.alert("오류","서버와 연결 상태가 좋지 않거나 다시 로그인 해주시길 바랍니다.")
            }
        })
    }
    }


    const isFocused = useIsFocused();
    useEffect(()=>{
        if(isFocused && route.params){
            setPlaceLocation({address:"",...route.params})
        }
    },[isFocused])

    console.log("PlaceAddScreen .. render");




    const imagePickedHandle = (uri,base64,coordinate) => {
        setPlaceImage(uri);
        setPlaceImageBase64(base64);

        if(coordinate){
            setPlaceLocation({coordinate:coordinate});
        }
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
                        color:"#fff"
                    }} placeholder={"여기는 어디인가요."} placeholderTextColor="#ffffff"
                    value={placeInfo} onChangeText={setPlaceInfo} />
                </View>
                <ImagePicker onPicked={imagePickedHandle} />
                <LocationPicker onPicked={locationPickedHandle} initCoords={placeLocation?.coordinate} />
            </ScrollView>
        </View>
    );
}

