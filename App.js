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
import { AppContext, AppContextProvider } from './context/app-context';
import InfoScreen from './screens/infoScreen';
import { useContext } from 'react';
import SundryScreen from './screens/sundryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GuestStackNavigator(){
  return (
    <Stack.Navigator screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white"}}>
  <Stack.Screen name="login" component={LoginScreen} options={{title:"Account/Login"}} />
  <Stack.Screen name="register" component={RegisterScreen}  options={{title:"Account/Register"}} />
  </Stack.Navigator>
  )
}
function MemberStackNavigator(){
  return (
    <Stack.Navigator screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white"}}>
    <Stack.Screen name="info" component={InfoScreen} options={{title:"내 정보"}} />
    </Stack.Navigator>
  )
}


function AccountStackNavigator() {
 const ctx = useContext(AppContext)
 return( <>
  {ctx.value ? <MemberStackNavigator/>:<GuestStackNavigator/>}
  </>
  )
}

export default function App() {
  const [loaded] = useFonts({"Mabifont":require("./assets/fonts/Mabinogi_Classic_OTF.otf")})

  if(!loaded){
    return <></>
  }



  return (
    <>
    <StatusBar style="light" />
    <AppContextProvider>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='account' screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white",tabBarStyle:{backgroundColor:"#111"}}}>
        <Tab.Screen name="home" component={HomeScreen} options={{tabBarIcon : ({color})=>{return <Ionicons name="home-outline" color={color} size={24} />}}} />
        <Tab.Screen name="sundry" component={SundryScreen} options={{tabBarIcon : ({color})=>{return <Ionicons name="document-text-outline" color={color} size={24} />}}} />
        <Tab.Screen name="account" component={AccountStackNavigator} options={{headerShown:false,
          tabBarIcon : ({color})=>{return <Ionicons name="person-outline" color={color} size={24} />}}} />
      </Tab.Navigator>
    </NavigationContainer>
    </AppContextProvider>
    </>
  );
}

const styles = StyleSheet.create({

});
