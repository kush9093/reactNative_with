import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, View } from "react-native";

function PlaceItem({item}) {
  const navigation = useNavigation()
    return ( 
    <Pressable style={{flex:1,maxWidth:"33%",height:150,borderWidth:1}}
    onPress={()=>{navigation.navigate("withDetail",{item})} }>
    <View style={{flex:1}}>
        <Image style={{flex:1}} source={{
          uri: item.imageURL,
        }} />

    </View>
    </Pressable> );
}

export default PlaceItem;