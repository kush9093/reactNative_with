import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import CustomButton from "../component/customButton";
import { blahWrite } from "../util/blahUtil";

function BlahWriteScreen({navigation,route}) {

    const [head,setHead] = useState("")
    const [content,setContent] = useState("")
 

    return ( 
        <View style={{backgroundColor:"#fff",flex:1}}>
            <View style={{borderBottomWidth:1,flex:1}}>
                <TextInput onChangeText={setHead} value={head} placeholder="제목" style={{fontSize:30,fontFamily:"Mabifont",flex:1,margin:5}} />
            </View>
            <View style={{flex:9}}>
            <TextInput multiline={true} onChangeText={setContent} value={content} placeholder="내용"style={{fontSize:20,fontFamily:"Mabifont",margin:10}} />
            </View>
            <CustomButton onPress={()=>{
                if(head.length > 1 ){
                    blahWrite(head,content).then((data)=>{
                        if(data===200){
                            navigation.navigate("blah")
                        }
                    })
                } else{
                    Alert.alert("에러","제목을 2글자 이상 작성해주세요")
                }
            }}>작성</CustomButton>
        </View>

     );
}

export default BlahWriteScreen;