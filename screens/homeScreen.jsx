import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomButton from "../component/customButton";
import CustomText from "../component/customText";
import IconButton from "../component/iconButton";
import PlaceItem from "../component/placeitem";
import { AppContext } from "../context/app-context";
import { sendReadPlaceRequest } from "../util/places";


function addRangeField(arr, lat = 35.1643235, lng = 126.9092156) {

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


    const cvt = arr.map((one) => {
        const targetLat = one.location.coordinate.latitude;
        const targetLng = one.location.coordinate.longitude;

        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(targetLat - lat);  // deg2rad below
        let dLon = deg2rad(targetLng - lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat)) * Math.cos(deg2rad(targetLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km

        return { ...one, range: d }
    })
    return cvt
}

function HomeScreen({ navigation, route }) {

    const [refresh, setRefresh] = useState(false);


    const ctx = useContext(AppContext)
    const [dataa, setDataa] = useState([]);
    const isFocused = useIsFocused();
    const [lately, setLately] = useState(false);



    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{ justifyContent: "flex-end" }}>
                        <IconButton name={"add-outline"} size={28} color="#fff" onPress={() => { navigation.navigate("placeAdd") }} />
                    </View>
                )
            }
        })
    }, [])

    useEffect(() => {
        if (isFocused) {
            sendReadPlaceRequest().then((data) => {
                const resultV2 = addRangeField(data)
                if (!lately) {
                    resultV2.sort((a, b) => a.range - b.range)
                    setDataa(resultV2);
                } else {
                    resultV2.sort((a, b) => { return new Date(b.createAt) - new Date(a.createAt) })
                    setDataa(resultV2);
                }
            })
        }

    }, [isFocused, lately])

    if (dataa.length === 0) {
        return <></>
    }


    return (
        <View style={[{ flex: 1, justifyContent: "center" }]}>
            <View style={{ backgroundColor: "white" }}>
                <FlatList
                    data={[{ id: "최신순", fn: () => { setLately(true) } }, { id: "거리순", fn: () => { setLately(false) } }]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <CustomButton onPress={item.fn}>{item.id}</CustomButton>
                        );
                    }}
                />
            </View>
            <View style={{flex:1,marginLeft:"0.5%"}}>
                <FlatList refreshing={refresh} onRefresh={() => {
                    setRefresh(true);
                    sendReadPlaceRequest().then((data) => {
                        const resultV2 = addRangeField(data)
                        if (!lately) {
                            resultV2.sort((a, b) => a.range - b.range)
                            setDataa(resultV2);
                        } else {
                            resultV2.sort((a, b) => { return new Date(b.createAt) - new Date(a.createAt) })
                            setDataa(resultV2);
                        }
                        setRefresh(false);
                    })
                }} data={dataa} numColumns="3" renderItem={({ item, index }) => {
                    return <PlaceItem item={item} />
                }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})


export default HomeScreen;