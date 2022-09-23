import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"


function dated(){
    let dd = new Date();
    let mtd = dd.getMonth()+1 < 10? "0"+(dd.getMonth()+1) : dd.getMonth()+1
    let gdt = dd.getDate()<10?"0"+dd.getDate():dd.getDate()
    return dd.getFullYear()+"-"+mtd+"-"+gdt
}



export async function blahWrite(head,contents) {
    const data = await AsyncStorage.getItem("authentication")
    const cdata = JSON.parse(data);
    const response = await axios.post("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/blahblah.json?auth="+cdata.idToken , {
        "title": head,
        "createdAt": dated(),
        "writer": cdata.email,
        "contents": contents,
    })
    return response.status
}

export async function blahRead(){

    const response = await axios.get("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/blahblah.json");
    return response.data

}

export async function blahOneRead(id){
    const response = await axios.get("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/blahblah/"+id+".json");
    return response.data

}


export async function blahDelete(id,email){
    const data = await AsyncStorage.getItem("authentication")
    const cdata = JSON.parse(data);
    if(email===cdata.email){
    const response = await axios.delete("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/blahblah/"+id+".json?auth="+cdata.idToken)
    return response.data;
} else {
    return false
}


}

export async function blahReWrite(id,email,title,contents){
    const data = await AsyncStorage.getItem("authentication")
    const cdata = JSON.parse(data);
    if(email===cdata.email){
    const response = await axios.patch("https://with-288b0-default-rtdb.asia-southeast1.firebasedatabase.app/blahblah/"+id+".json?auth="+cdata.idToken,
    {
        "title":title,
        "contents":contents
    })
    return response.data;
} else {
    return false
}
}