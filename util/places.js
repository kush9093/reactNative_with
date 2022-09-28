import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Buffer } from "buffer";




export async function sendAddPlaceRequest(placeData,fileData,fileURI){

    // 1. 파일업로드 (storage 에 전송)
    console.log(fileData?.length," : ",fileData?.substring(0,100))
    // console.log(fileURI);
    const fileName = fileURI.substring(fileURI.lastIndexOf("/")+1)
    // console.log(fileName);
    const endPoint = `https://firebasestorage.googleapis.com/v0/b/with-288b0.appspot.com/o/${fileName}`
    const uploadResult = await axios({
        url:endPoint,
        headers:{
            "Content-type": "image/jpeg",

        },
        data:Buffer.from(fileData,"base64"),
        method:"post",
    });
    
    // 2. 데이터 저장 (realtime database 에 저장)
    const placeItem = {...placeData,imageURL: endPoint+"?alt=media"};
    const data = await AsyncStorage.getItem("authentication")
    const cdata = JSON.parse(data);
    const response = await axios.post("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/places.json?auth="+cdata.idToken , {
        "title": placeItem.title,
        "createAt": placeItem.createAt,
        "writer": cdata.email,
        "location":placeItem.location,
        "imageURL": placeItem.imageURL,
    })
    return response.status

}

export async function sendReadPlaceRequest() {

    const response = await axios.get("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/places.json");
    const datas = [];

    Object.keys(response.data).forEach((key)=>{
        const temp = {key, ...response.data[key]};
        datas.push(temp);
    });
    return datas;


}