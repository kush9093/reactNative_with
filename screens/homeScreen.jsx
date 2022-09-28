import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomText from "../component/customText";
import IconButton from "../component/iconButton";
import PlaceItem from "../component/placeitem";
import { AppContext } from "../context/app-context";
import { sendReadPlaceRequest } from "../util/places";


function HomeScreen({navigation,route}) {
   const ctx = useContext(AppContext)
   const [dataa,setDataa] = useState([]);
   const isFocused = useIsFocused();
   useEffect(()=>{
    navigation.setOptions({
        headerRight: ()=>{
            return (
                <View style={{justifyContent:"flex-end"}}>
                    <IconButton name={"add-outline"} size={28} color="#fff" onPress={()=>{navigation.navigate("placeAdd")}} />
                </View>
            )
        }
    })
},[])

    useEffect(()=>{
        sendReadPlaceRequest().then((data)=>{
            setDataa(data);
        })
    },[isFocused])

    if(dataa.length===0){
        return <></>
    }


    return ( 
        <View style={[{ flex: 1, justifyContent: "center", backgroundColor: "#000" }]}>
            <FlatList data={dataa} numColumns="3" renderItem={({item,index})=>{
                return <PlaceItem item={item} />
            }} />
        </View>
     );
}

const styles = StyleSheet.create({

})


export default HomeScreen;