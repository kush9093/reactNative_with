import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions, useMediaLibraryPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import globalStyles from "../screens/stylesheet";
import IconButton from "./iconButton";

export default function ImagePicker({onPicked}) {
    const [imageUri, setImageUri] = useState(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = useMediaLibraryPermissions();

    const takeFromAlbum = async () => {
        if (mediaPermission.status === PermissionStatus.UNDETERMINED ||
            mediaPermission.status === PermissionStatus.DENIED) {
            try {
                const resp = await requestMediaPermission();
                if (!resp.granted) {
                    Alert.alert("With°", "이기능은 갤러리 접근권한이 필요합니다.");
                    return;
                }
            } catch (e) {
                console.log(e);
                return;
            }
        }
        const result = await launchImageLibraryAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif: true,
            base64:true,
        });
        if (!result.cancelled) {
            const lat = result?.exif?.GPSLatitude;
            const lng = result?.exif?.GPSLongitude;
            if(lat&&lng){
                console.log(lat,lng);
            }
            setImageUri(result.uri);
            onPicked(result.uri,result.base64);
        }
    }

    const takeFromCamera = async () => {
        if (cameraPermission.status === PermissionStatus.UNDETERMINED ||
            cameraPermission.status === PermissionStatus.DENIED) {
            try {
                const resp = await requestCameraPermission();
                if (!resp.granted) {
                    Alert.alert("With°", "이기능은 카메라 접근권한이 필요합니다.");
                    return;
                }
            } catch (e) {
                console.log(e);
                return;
            }
        }
        const result = await launchCameraAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif: true,
            base64:true
        });
        if (!result.cancelled) {
            // console.log(result.base64);
            setImageUri(result.uri);
            console.log(result.exif);
            if(result.exif.GPSLatitude && result.exif.GPSLongitude){
                onPicked(result.uri,result.base64,{latitude:result.exif.GPSLatitude,longitude:result.exif.GPSLongitude});
            } else {
                onPicked(result.uri,result.base64);
            }
        }
        // launchCameraAsync({}).then(result => {setImageUri(result.uri)});
    }

    return (
        <View style={{ height: 300 }}>
            <View style={{
                flex: 1, backgroundColor: "#000", borderRadius: 12, overflow: "hidden",
                borderColor: "#fff", borderWidth: 1
            }}>
                {
                    imageUri ?
                        <Image source={{ uri: imageUri }} style={{ flex: 1 }} /> :
                        <Pressable style={{ flex: 1 }} onPress={takeFromCamera}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Text style={{ ...globalStyles.regularFont, color: "gray",fontFamily:"Mabifont" }}>여기는 어떤 풍경인가요</Text>
                            </View>
                        </Pressable>
                }
            </View>
            <View style={{
                flexDirection: "row", justifyContent: "space-around",
                padding: 8
            }}>
                <IconButton name={"albums-outline"} onPress={takeFromAlbum}
                    style={styles.button} color="#fff" />
                <IconButton name={"camera-outline"} onPress={takeFromCamera}
                    style={styles.button} color="#fff" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "gray",
        width: 80,
        color: "white",
        borderColor:"#fff",
        borderWidth:1
    }
});
