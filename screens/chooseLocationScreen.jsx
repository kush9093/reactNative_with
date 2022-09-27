import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ChooseLocationScreen({ route,navigation}) {
    const [coordinate,setCoordinate] = useState(null);

    useEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>{
                return (
                    <View style={{justifyContent:"flex-end"}}>
                        <Button title="확인" onPress={confirm}/>
                    </View>
                )
            }
        })
    },[coordinate])

    function confirm () {
        if(!coordinate) {

        } else {
            navigation.navigate("placeAdd",{coordinate});
        }
    }


    const init = {
        latitude: route.params?.lat,
        longitude: route.params?.lng,
        latitudeDelta: 0.01922,
        longitudeDelta: 0.01421
    }

    const pressHandle = ({nativeEvent}) =>{
        setCoordinate(nativeEvent.coordinate);
        console.log(nativeEvent);
    }

    return (<View style={{flex:1}}>
        <MapView style={{ flex: 1 }} initialRegion={init} onPress={pressHandle}>
            {
                coordinate && <Marker coordinate={coordinate} />
            }
            
        </MapView>
    </View>);
}

;