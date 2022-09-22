import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import LoadingOverlay from "../component/loadingOverlay";


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
            if(data){
            dispatch({ type: "login", payload: JSON.parse(data) })
        }
        setDone(true);
        })
    }, [])

        if(!done){
            return <LoadingOverlay />
        }

    return (<AppContext.Provider value={{ value: auth, dispatch }}>
        {children}
    </AppContext.Provider>);
}