import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import {Ionicons} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AccountStackNavigator() {
 return( 
 <Stack.Navigator screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white"}}>
  <Stack.Screen name="login" component={LoginScreen} options={{title:"Account/Login"}} />
  <Stack.Screen name="register" component={RegisterScreen}  options={{title:"Account/Register"}} />
  </Stack.Navigator>
  )
}

export default function App() {
  const [loaded] = useFonts({"Mabifont":require("./assets/fonts/Mabinogi_Classic_OTF.otf")})

  if(!loaded){
    return <></>
  }



  return (
    <>
    <StatusBar style="auto" />
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white",tabBarStyle:{backgroundColor:"#111"}}}>
        <Tab.Screen name="home" component={HomeScreen} options={{tabBarIcon : ({color})=>{return <Ionicons name="home" color={color} size={24} />}}} />
        <Tab.Screen name="account" component={AccountStackNavigator} options={{headerShown:false,
          tabBarIcon : ({color})=>{return <Ionicons name="person" color={color} size={24} />}}} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
