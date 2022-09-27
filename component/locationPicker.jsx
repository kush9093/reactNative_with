import { useNavigation } from "@react-navigation/native";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { createStaticMapURI, getAddresses } from "../util/maps";
import IconButton from "./iconButton";

export default function LocationPicker({ onPicked, initCoords }) {

    const [mapURI, setMapURI] = useState(null);
    const [address, setAddress] = useState(null);
    const navigation = useNavigation();

    const [locationPermission, requsetLocationPermission] = useForegroundPermissions();
useEffect(()=>{
    if (initCoords) {
        !async function () {
            const temp = createStaticMapURI(initCoords.latitude, initCoords.longitude);
            const gotAddress = await getAddresses(initCoords.latitude, initCoords.longitude)
            setMapURI(temp);
            setAddress(gotAddress.formatted_address);
            //=================================================================================
            //gps 주소부분
            onPicked({ coordinate: { latitude: initCoords.latitude, longitude: initCoords.longitude }, address: gotAddress.formatted_address })
        }();
    };
},[initCoords?.latitude,initCoords?.longitude])
    


const takeFromLocation = async () => {
    console.log("takeFromLocation !!");
    if (locationPermission.status == PermissionStatus.UNDETERMINED ||
        locationPermission.status == PermissionStatus.DENIED) {
        const permission = await requsetLocationPermission();
        console.log("permission !! ", permission);
        if (!permission.granted) {
            return;
        }
    }
    const result = await getCurrentPositionAsync()
    const temp = createStaticMapURI(result.coords.latitude, result.coords.longitude);
    const gotAddress = await getAddresses(result.coords.latitude, result.coords.longitude)
    setMapURI(temp);
    setAddress(gotAddress.formatted_address);
    //=================================================================================
    //gps 주소부분
    onPicked({ coordinate: { latitude: result.coords.latitude, longitude: result.coords.longitude }, address: gotAddress.formatted_address })
}
const verifyPermission = async () => {
    console.log("1",locationPermission)
    console.log("2",PermissionStatus)
    if (locationPermission.status == PermissionStatus.UNDETERMINED ||
        locationPermission.status == PermissionStatus.DENIED) {
        const permission = await requsetLocationPermission();
        console.log("permission !! ", permission);
        if (!permission.granted) {
            return false;
        }
    }
    return true;
}
const moveToChooseLocation = async () => {
    const verified = await verifyPermission();
    if (!verified) {
        return;
    }
    const result = await getCurrentPositionAsync();
    navigation.navigate("chooseLocation",
        { lat: result.coords.latitude, lng: result.coords.longitude }
    );
}

return (
    <View style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}>
        <View style={{ flex: 1, backgroundColor: "#fff", minHeight: 200, borderWidth:1,borderColor:"#000" }}>
            {mapURI && <Image source={{ uri: mapURI }} style={{ flex: 1 }} />}
            <Text>{address}</Text>
        </View>
        <View style={{
            flexDirection: "row", justifyContent: "space-around",
            padding: 8,backgroundColor:"#fff"
        }}>
            <IconButton name={"location-outline"} onPress={takeFromLocation} />
            <IconButton name={"map-outline"} onPress={moveToChooseLocation} />
        </View>
    </View>
);
}

