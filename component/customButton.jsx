import { Pressable, StyleSheet, Text, View } from "react-native";


function CustomButton({children,onPress,disabled=""}) {
    return (<View style={styles.main}>
<Pressable disabled={disabled} style={disabled==="disabled"?styles.btndisabled:styles.btn} onPress={onPress} android_ripple={{color:"#ccc"}}>
    <Text style={styles.btntext}>{children}</Text>
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
        color:"white",
        textAlign:"center",
    },
    main:{
        alignItems:"center",
        margin:10
    }
})

export default CustomButton;