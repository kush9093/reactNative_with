import { Text } from "react-native";

function CustomText({style,children}) {
    return ( 
        <Text style={[{color: "white",fontFamily:"Mabifont" },style]}>{children}</Text>
     );
}

export default CustomText;