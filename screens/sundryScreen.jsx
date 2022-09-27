import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CustomButton from "../component/customButton";
import Modals from "../component/modal";
import SundryItem from "../component/sundtyItem";
import { AppContext } from "../context/app-context";
import { blahRead } from "../util/blahUtil";

function SundryScreen({navigation,route}) {
     const [modalVisible, setModalVisible] = useState(false);
     const ctx = useContext(AppContext);
    const [dataa,setDataa] = useState([])
    useEffect(()=>{
         blahRead().then((data)=>{
            setDataa(Object.entries(data));
        })
        
    },[dataa])
     
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
            <FlatList data={dataa}
            renderItem={({item,index})=>{
                return (<SundryItem item={item} onPress={()=>{navigation.navigate("blahDetail",{item})}}/>)
            }}
            />
            </View>
            <View style={{alignSelf: 'flex-end',position: 'absolute',bottom: 20}}>
            {ctx.value &&
        <CustomButton onPress={()=>{navigation.navigate("blahWrite")} } style={{borderRadius:200,padding:20,backgroundColor:"#aaa",opacity:0.95}}>➕</CustomButton>
    }
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