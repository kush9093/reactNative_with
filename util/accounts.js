import axios from "axios"

const APP_KEY = "AIzaSyBEAP6Hi4e79OYtnVNZRcqnPQKx0dAbmJw"


export async function sendRegisterReq(email, password) {
    console.log("sendRegisterRequest .. "+email,password);
        const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + APP_KEY, {
            email, password, "returnSecureToken": true
        })

        return response.data;
}

export async function sendLoginReq(email,password){
    console.log("sendLoginReq .."+email+ password)
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+APP_KEY,{
        email,password,"returnSecureToken": true
    })
    return response.data
}

export async function sendReplaceToken(token){
    console.log("sendReplaceToken .."+token)
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/token?key="+APP_KEY,{
        grant_type : "refresh_token",
        refresh_token:token
    });
    return response.data;
}