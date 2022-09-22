import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CustomButton from "../component/customButton";
import Modals from "../component/modal";
import SundryItem from "../component/sundtyItem";

function SundryScreen() {
     const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.main}>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "white" }}>
                    <FlatList
                        data={["밥", "동물", "밥", "동물", "밥", "동물", "밥", "동물", "밥", "동물", "밥", "동물", "밥", "동물"]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomButton>{item}</CustomButton>
                            );
                        }}
                    />
                </View>
            </View>
            <View style={{flex:9}}>
            <FlatList data={["아","아","아","아아아아아아아아아아아아아아아아아아아아아아아아아아아"]}
            renderItem={({item,index})=>{
                return (<SundryItem>{item}</SundryItem>)
            }}
            />
            </View>
            <View style={{alignSelf: 'flex-end',position: 'absolute',bottom: 20}}>
        <CustomButton onPress={()=>{setModalVisible(true)} } style={{borderRadius:"50%",padding:20,backgroundColor:"#aaa",opacity:0.95}}>➕</CustomButton>
            </View>
            <Modals modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
    },
})

export default SundryScreen;