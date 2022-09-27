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
import BlahDetailScreen from './screens/blahDetailScreen';
import BlahWriteScreen from './screens/blahWriteScreen';
import BlahReWriteScreen from './screens/blahReWriteScreen';
import PlaceAddScreen from './screens/placeAddScreen';
import ChooseLocationScreen from './screens/chooseLocationScreen';

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

function BlahStackNavigator() {
  return (
  <Stack.Navigator screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white",}}>
  <Stack.Screen name="blah" component={SundryScreen} options={{title:"Blah"}} />
  <Stack.Screen name="blahWrite" component={BlahWriteScreen} options={{title:"Blah/Write"}} />
  <Stack.Screen name="blahDetail" component={BlahDetailScreen}  options={{title:"Blah/Detail"}} />
  <Stack.Screen name="blahReWriteScreen" component={BlahReWriteScreen}  options={{title:"수정"}} />
  </Stack.Navigator>
  )
}


function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='placeAdd'
      screenOptions={
        {
          headerTitleStyle: {
            fontFamily: "Mabifont",
            fontSize: 32
          },
        }
      } >
      <Stack.Screen name="home" component={HomeScreen} options={{ title: "With°", }} />
      <Stack.Screen name="placeAdd" component={PlaceAddScreen}
        options={{ title: "공유하기",headerStyle:{backgroundColor:"#111"},headerTintColor:"white" }} />
      <Stack.Screen name="chooseLocation" component={ChooseLocationScreen}
        options={{ title: "위치설정하기", presentation: "modal" }} />
    </Stack.Navigator>
  )
}


function RootNavigator(){
  return (
    <Tab.Navigator initialRouteName='account' screenOptions={{headerTitleStyle:{fontFamily:"Mabifont"},headerStyle:{backgroundColor:"#111"},headerTintColor:"white",tabBarStyle:{backgroundColor:"#111"}}}>
    <Tab.Screen name="home" component={HomeStackNavigator} options={{tabBarIcon : ({color})=>{return <Ionicons name="home-outline" color={color} size={24} />}}} />
    {/* <Tab.Screen name="sundry" component={SundryScreen} options={{tabBarIcon : ({color})=>{return <Ionicons name="document-text-outline" color={color} size={24} />}}} /> */}
    <Tab.Screen name="blahStack" component={BlahStackNavigator} options={{headerShown:false,unmountOnBlur:true,tabBarIcon : ({color})=>{return <Ionicons name="document-attach" color={color} size={24} />}}} />
    <Tab.Screen name="account" component={AccountStackNavigator} options={{headerShown:false,
      tabBarIcon : ({color})=>{return <Ionicons name="person-outline" color={color} size={24} />}}} />
  </Tab.Navigator>
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
      <RootNavigator/>
    </NavigationContainer>
    </AppContextProvider>
    </>
  );
}

const styles = StyleSheet.create({

});
