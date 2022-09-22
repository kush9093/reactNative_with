import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomText from "../component/customText";
import { AppContext } from "../context/app-context";
import globalStyles from "./stylesheet";


function HomeScreen() {
   const ctx = useContext(AppContext)



    return ( 
        <View style={[{ flex: 1, justifyContent: "center", backgroundColor: "#000" }]}>
            <CustomText style={{fontSize:80,textAlign:"center"}}>공사중</CustomText>
        </View>
     );
}

const styles = StyleSheet.create({

})


export default HomeScreen;