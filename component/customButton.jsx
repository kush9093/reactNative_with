import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomText from "./customText";


function CustomButton({children,onPress,disabled="",style,textstyle}) {
    return (<View style={styles.main}>
<Pressable disabled={disabled} style={[disabled==="disabled"?styles.btndisabled:styles.btn,style]} onPress={onPress} android_ripple={{color:"#ccc"}}>
    <CustomText style={[styles.btntext,textstyle]}>{children}</CustomText>
</Pressable>
    </View>  );
}

const styles = StyleSheet.create({
    btn : {
        width:"100%",
        backgroundColor:"#666",
        borderRadius:10,
        padding: 10,
    },
    btndisabled :{
        width:"100%",
        backgroundColor:"#ccc",
        borderRadius:10,
        padding: 10,
    },
    btntext: {
        textAlign:"center",
    },
    main:{
        alignItems:"center",
        margin:10
    }
})

export default CustomButton;