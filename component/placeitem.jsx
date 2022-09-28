import { Image, View } from "react-native";

function PlaceItem({item}) {
    return ( <View style={{flex:1,maxWidth:"33%",height:150}}>
        <Image style={{flex:1}} source={{
          uri: item.imageURL,
        }} />

    </View> );
}

export default PlaceItem;