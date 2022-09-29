import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import LoadingOverlay from "../component/loadingOverlay";
import { sendReplaceToken } from "../util/accounts";


export const AppContext = createContext({});


const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return null;
}

export function AppContextProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, null);
    const [done,setDone] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem("authentication").then((data) => {
            const token = JSON.parse(data)
            if(data){
                sendReplaceToken(token.refreshToken).then((newdata)=>{
                   const combiendData = {...token,...newdata};
                   dispatch({type:"login",payload:combiendData});
                   AsyncStorage.setItem("authentication",JSON.stringify(combiendData))
                   setDone(true);
                })
        } else {
            setDone(true);
        }
    })
    }, [])

        if(!done){
            return <LoadingOverlay />
        }

    return (<AppContext.Provider value={{ value: auth, dispatch }}>
        {children}
    </AppContext.Provider>);
}